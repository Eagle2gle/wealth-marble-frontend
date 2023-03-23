import { useCallback } from 'react';

import {
  Client,
  type IPublishParams,
  type StompConfig,
  type frameCallbackType,
  type messageCallbackType,
  type StompHeaders,
  type StompSubscription,
} from '@stomp/stompjs';

interface UseStomp {
  config: StompConfig;
  onConnect?: frameCallbackType;
  onStompError?: frameCallbackType;
}

let stompClient: Client | undefined;
const subscriptionMap: { [key: string]: StompSubscription } = {};

export const useStomp = ({ config, onConnect, onStompError }: UseStomp) => {
  const connect = useCallback(() => {
    if (!stompClient) stompClient = new Client(config);
    if (onConnect) stompClient.onConnect = onConnect;
    if (onStompError) stompClient.onStompError = onStompError;
    stompClient.activate();
  }, [config, onConnect, onStompError]);

  const publish = useCallback((params: IPublishParams) => {
    if (!stompClient || !stompClient.connected) return;
    stompClient.publish(params);
  }, []);
  const subscribe = useCallback(
    (destination: string, callback: messageCallbackType, headers?: StompHeaders | undefined) => {
      if (!stompClient || !stompClient.connected || subscriptionMap[destination]) return;
      subscriptionMap[destination] = stompClient.subscribe(destination, callback, headers);
    },
    []
  );
  const unsubscribe = useCallback((destination: string) => {
    if (!subscriptionMap[destination]) return;
    subscriptionMap[destination].unsubscribe();
    delete subscriptionMap[destination];
  }, []);
  const disconnect = useCallback(() => {
    if (!stompClient || !stompClient.connected) return;
    stompClient.deactivate();
  }, []);

  return {
    connect,
    isConnected: !!stompClient?.connected,
    publish,
    subscribe,
    unsubscribe,
    disconnect,
  };
};
