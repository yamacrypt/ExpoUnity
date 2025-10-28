import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { UnityBridge } from '@/modules/UnityBridge';

type UnityStatus = 'idle' | 'loading' | 'ready' | 'error';

export function useUnityBridge() {
  const [status, setStatus] = useState<UnityStatus>('idle');
  const [lastPayload, setLastPayload] = useState<string | null>(null);

  const show = useCallback(() => {
    setStatus('loading');
    try {
      UnityBridge.show();
      setStatus('ready');
    } catch (error) {
      console.error('UnityBridge.show failed', error);
      setStatus('error');
    }
  }, []);

  const postMessage = useCallback((target: string, method: string, payload: string) => {
    setLastPayload(payload);
    try {
      UnityBridge.postMessage(target, method, payload);
    } catch (error) {
      console.error('UnityBridge.postMessage failed', error);
    }
  }, []);

  const isNative = Platform.OS === 'ios' || Platform.OS === 'android';

  return {
    status,
    isNative,
    show,
    postMessage,
    lastPayload,
  };
}
