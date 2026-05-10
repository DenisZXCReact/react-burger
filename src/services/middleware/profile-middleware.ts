import { profileOrdersSocketUrl } from '@utils/constants.ts';
import { refreshToken } from '@utils/tokens.ts';

import {
  connect,
  onMessage,
  onClose,
  onOpen,
  disconnect,
  onError,
} from '../profile-socket/profile-socket-slice.ts';

import type { Middleware } from '@reduxjs/toolkit';

let ws: WebSocket | null = null;
let isConnected = false;
let timer: ReturnType<typeof setTimeout> | null = null;
const reconnectPeriod = 3000;
let currentToken = '';
function openConnection(store: Parameters<Middleware>[0], token: string): void {
  if (ws) ws.close();
  const cleanToken = token.replace('Bearer ', '');
  currentToken = cleanToken;
  ws = new WebSocket(`${profileOrdersSocketUrl}?token=${cleanToken}`);

  ws.onopen = (): void => {
    isConnected = true;

    store.dispatch(onOpen());
  };

  ws.onmessage = (e: MessageEvent): void => {
    const data = JSON.parse(e.data);
    if (!data.success && data.message === 'Invalid or missing token') {
      refreshToken()
        .then((response) => {
          store.dispatch(connect(response.accessToken));
        })
        .catch(() => {
          store.dispatch(onError('Token refresh failed'));
        });
      return;
    }
    store.dispatch(onMessage(data));
  };

  ws.onclose = (): void => {
    store.dispatch(onClose());
    if (isConnected) {
      timer = setTimeout(() => {
        store.dispatch(connect(currentToken));
      }, reconnectPeriod);
    }
  };

  ws.onerror = (e): void => {
    store.dispatch(onError(String(e)));
  };
}

export const profileMiddleware: Middleware = (store) => (next) => (action) => {
  if (connect.match(action)) {
    openConnection(store, action.payload);
  }
  if (disconnect.match(action)) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (ws) {
      ws.close();
      isConnected = false;
      ws = null;
    }
  }
  return next(action);
};
