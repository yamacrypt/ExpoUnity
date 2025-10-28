import { useState } from 'react';
import { formatUnityMessage } from '@expounity/shared';
import { UnityLoader } from './components/UnityLoader';
import './app.css';

export default function App() {
  const [message] = useState(() =>
    formatUnityMessage('GameController', 'HandleMessage', '{ "source": "web" }')
  );

  return (
    <div className="app">
      <header>
        <h1>Expo Unity Web</h1>
        <p>WebGL ビルドを遅延ロードする React + Vite アプリです。</p>
      </header>
      <section className="content">
        <p>サンプルメッセージ: {message}</p>
        <UnityLoader />
      </section>
    </div>
  );
}
