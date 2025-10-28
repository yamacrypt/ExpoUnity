import { NativeModules, Platform } from 'react-native';

type UnityBridgeModule = {
  show(): void;
  postMessage(target: string, method: string, payload: string): void;
};

const noopBridge: UnityBridgeModule = {
  show: () => {
    console.info('[UnityBridge] show() noop fallback');
  },
  postMessage: (target, method, payload) => {
    console.info('[UnityBridge] postMessage noop', { target, method, payload });
  },
};

const nativeBridge: UnityBridgeModule | undefined =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? (NativeModules.UnityBridge as UnityBridgeModule | undefined)
    : undefined;

export const UnityBridge: UnityBridgeModule = nativeBridge ?? noopBridge;
