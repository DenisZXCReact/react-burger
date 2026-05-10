import { feedSocketUrl } from '@utils/constants.ts';

import {
  connect,
  onClose,
  onError,
  onOpen,
  onMessage,
  disconnect,
} from '../feed-socket/feed-socket-slice.ts';

import type { Middleware } from '@reduxjs/toolkit';

let ws: WebSocket | null = null;
let isConnected = false;
const reconnectPeriod = 3000;
let timer: ReturnType<typeof setTimeout> | null = null;
export const feedMiddleware: Middleware = (store) => (next) => (action) => {
  if (connect.match(action)) {
    if (ws) ws.close();
    ws = new WebSocket(feedSocketUrl);
    isConnected = true;
    ws.onopen = (): void => {
      store.dispatch(onOpen());
    };
    ws.onmessage = (e: MessageEvent): void => {
      store.dispatch(onMessage(JSON.parse(e.data)));
    };
    ws.onclose = (): void => {
      store.dispatch(onClose());
      if (isConnected) {
        timer = setTimeout(() => {
          store.dispatch(connect());
        }, reconnectPeriod);
      }
    };
    ws.onerror = (e): void => {
      store.dispatch(onError(String(e)));
    };
  }
  if (disconnect.match(action)) {
    isConnected = false;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (ws) {
      ws.close();
      ws = null;
    }
  }
  return next(action);
};
