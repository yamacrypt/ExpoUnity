import { useCallback, useEffect, useMemo, useState } from 'react';
import { Unity, UnityContext } from 'react-unity-webgl';

const UNITY_BUILD_PATH = '/unity/Build';

type UnityStatus = 'idle' | 'loading' | 'ready' | 'error';

export function UnityLoader() {
  const [unityContext, setUnityContext] = useState<UnityContext | null>(null);
  const [status, setStatus] = useState<UnityStatus>('idle');
  const [progression, setProgression] = useState(0);
  const [lastMessage, setLastMessage] = useState<string>('---');

  const startLoading = useCallback(async () => {
    if (unityContext) {
      setStatus('ready');
      return;
    }
    setStatus('loading');
    try {
      const context = new UnityContext({
        loaderUrl: `${UNITY_BUILD_PATH}/Unity.loader.js`,
        dataUrl: `${UNITY_BUILD_PATH}/Unity.data`,
        frameworkUrl: `${UNITY_BUILD_PATH}/Unity.framework.js`,
        codeUrl: `${UNITY_BUILD_PATH}/Unity.wasm`,
      });
      context.on('progress', (value) => setProgression(value));
      context.on('UnityBridgeMessage', (payload) => setLastMessage(String(payload)));
      setUnityContext(context);
      setStatus('ready');
    } catch (error) {
      console.error('Unity load failed', error);
      setStatus('error');
    }
  }, [unityContext]);

  useEffect(() => {
    return () => {
      unityContext?.removeAllEventListeners();
      unityContext?.quitUnityInstance();
    };
  }, [unityContext]);

  const progressLabel = useMemo(() => `${Math.round(progression * 100)}%`, [progression]);

  return (
    <div className="unity-wrapper">
      <div className="unity-status">
        <p>Unity Status: {status}</p>
        <p>Progress: {progressLabel}</p>
        <p>Last Message: {lastMessage}</p>
      </div>
      <button className="unity-button" onClick={startLoading} disabled={status === 'loading'}>
        {status === 'idle' && 'Load Unity WebGL'}
        {status === 'loading' && 'Loading...'}
        {status === 'ready' && 'Unity Ready'}
        {status === 'error' && 'Retry Load'}
      </button>
      {unityContext ? (
        <Unity unityProvider={unityContext.unityProvider} style={{ width: '100%', height: 480 }} />
      ) : (
        <div className="unity-placeholder">
          <p>Unity WebGL ビルドを /public/unity/ に配置してください。</p>
        </div>
      )}
    </div>
  );
}
