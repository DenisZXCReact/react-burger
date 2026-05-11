import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';

type TSocketActions<T> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<T>;
  onError: ActionCreatorWithPayload<string>;
};

const reconnectPeriod = 3000;

export function createSocketMiddleware<T>(actions: TSocketActions<T>): Middleware {
  // каждая инстанция имеет своё изолированное состояние
  let ws: WebSocket | null = null;
  let isConnected = false;
  let lastUrl = '';
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (store) => (next) => (action) => {
    if (actions.connect.match(action)) {
      if (ws) ws.close();
      lastUrl = action.payload;
      ws = new WebSocket(lastUrl);

      ws.onopen = (): void => {
        isConnected = true;
        store.dispatch(actions.onOpen());
      };

      ws.onmessage = (e: MessageEvent): void => {
        store.dispatch(actions.onMessage(JSON.parse(e.data)));
      };

      ws.onclose = (): void => {
        store.dispatch(actions.onClose());
        if (isConnected) {
          timer = setTimeout(() => {
            store.dispatch(actions.connect(lastUrl));
          }, reconnectPeriod);
        }
      };

      ws.onerror = (e): void => {
        store.dispatch(actions.onError(String(e)));
      };
    }

    if (actions.disconnect.match(action)) {
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
}
