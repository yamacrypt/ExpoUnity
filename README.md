# ExpoUnity Monorepo

単一リポジトリで Expo Bare (iOS/Android)、Unity as a Library、Vite (WebGL) を共存させるための初期セットアップです。

```
/ (repo root)
├─ app/            # Expo Bare プロジェクト (iOS/Android)
│  ├─ android/     # Unity as a Library を取り込むための雛形コード込み
│  ├─ ios/         # UnityFramework を読み込むための Xcode プロジェクト雛形
│  └─ src/         # Expo Router 画面 + Unity Bridge Hooks
├─ web/            # Vite + React + react-unity-webgl を用いた Web フロント
├─ packages/       # 共有 TypeScript パッケージ (例: @expounity/shared)
├─ scripts/        # ビルド整合性チェック用スクリプト
└─ .github/workflows/ # CI (後述)
```

## セットアップ

```bash
# ルートで依存関係をインストール (npm or corepack)
npm install
npm install --workspace app
npm install --workspace web
npm install --workspace packages/shared
```

> **Note:** ネットワーク制限がある場合は lockfile を生成してから CI/CD にキャッシュしてください。

### Expo Dev Client

```bash
cd app
npx expo install expo-dev-client
npm run ios   # iOS Simulator / Dev Client
npm run android # Android Emulator / Dev Client
```

## 画面構成 (Expo Router)

- `/` Home: ガイドと遷移リンク
- `/game` Game: `NativeModules.UnityBridge` を介したネイティブ Unity 呼び出し
- `/settings` Settings: Dev Client / タイムゾーン設定等

`Game` 画面では `show()` で Unity プレースホルダーを起動し、`postMessage()` でメッセージキューに積むダミー実装です。

## Unity as a Library (モバイル)

### Android

1. Unity 側で **Android Library** をエクスポートし、`unity/build/android/` 配下に `unityLibrary/` が生成されるようにする。
2. `app/android/settings.gradle` が自動で `unityLibrary` を検出し、`:app` から依存を張ります。
3. JS から `UnityBridge.show()` を呼ぶと `UnityLauncherActivity` が起動し、Unity ビルドがまだ無い場合はプレースホルダーを表示します。
4. `UnityBridge.postMessage(target, method, payload)` は `UnityMessageBus` へ積み、Unity 組み込み後は `UnityPlayer` へ転送する箇所を差し替えてください。

### iOS

1. Unity 側で **iOS Framework** (UnityFramework) を生成し、`app/ios/UnityFramework/` などに配置します。
2. Xcode プロジェクト (`app/ios/ExpoUnity.xcodeproj`) に UnityFramework を追加し、`UnityViewController` を Unity 側のビューに差し替えてください。
3. JS からの呼び出しは `UnityBridgeModule` (Expo Modules) で受け、プレースホルダー画面 (`UnityViewController`) をモーダル表示します。
4. `UnityBridge.postMessage` は内部キューに記録するだけのダミーなので、Unity 接続後に `UnitySendMessage` へ置き換えてください。

## Web (Vite + react-unity-webgl)

1. Unity WebGL を `web/public/unity/Build/` 以下に配置 (例: `Unity.loader.js`, `Unity.data`, `Unity.framework.js`, `Unity.wasm`).
2. `npm run dev --workspace web` でローカルサーバー起動。
3. `UnityLoader` コンポーネントの「Load Unity WebGL」ボタンを押すと `react-unity-webgl` の `UnityContext` を初期化し、遅延ロードを開始します。

## 共通ロジック

- `packages/shared` に TypeScript の共通ユーティリティ (`formatUnityMessage`) を定義し、モバイル・Web 双方で利用。
- 追加の共有ロジックは同パッケージ配下に配置し、`workspace:*` で依存させてください。

## ビルド整合性のチェック

- `scripts/ensure-android-gradle.mjs` … `gradle-wrapper.properties` を `8.10.2` に揃えます。
- GitHub Actions で `expo doctor` や `npx react-native doctor` を実行するスペースはコメントアウト済 (将来拡張用)。
- `Podfile` では `use_frameworks! :static` とし Flipper を無効化済み。

## GitHub Actions

`.github/workflows/ci.yml` (後述) で以下を実行:

- Node.js 20 + npm キャッシュ
- `npm install` (ルート + 各ワークスペース)
- Lint (`npm run lint`)
- Type check (`npm run typecheck`)
- Web build (`npm run build:web`)
- Android タスク一覧 (`./gradlew :app:tasks`)
- CocoaPods インストール検証 (`pod install`)

全ジョブで `TZ=Asia/Tokyo` を設定し、ログのタイムスタンプを統一しています。

## 検証手順

### モバイル

```bash
npm install
npm run android   # Expo Dev Client (Android)
npm run ios       # Expo Dev Client (iOS)
```

- `Home` → `Game` → 「Unity を起動する」ボタンでプレースホルダー画面を確認。
- 「Unity にメッセージ送信」でダミーメッセージがキューへ追加されることを確認。

### Web

```bash
npm install --workspace web
npm run dev --workspace web
```

- ブラウザで http://localhost:5173/ を開き、「Load Unity WebGL」ボタンで遅延ロードが開始されることを確認。
- `web/public/unity/Build/` に WebGL 出力が無い場合はプレースホルダー表示。

## Unity 出力物の配置

| 出力 | 配置先 | 備考 |
| ---- | ------ | ---- |
| Android Library | `unity/build/android/unityLibrary/` | `settings.gradle` が自動検出します |
| iOS Framework | `app/ios/UnityFramework/` (任意の場所) | Xcode プロジェクトに追加してリンク |
| WebGL | `web/public/unity/Build/` | `Unity.loader.js` 等を配置 |

## よくあるエラーと対処

- **Android Gradle Sync 失敗**: `node scripts/ensure-android-gradle.mjs` を実行し、Gradle Wrapper を 8.10.2 に更新。
- **`pod install` で use_frameworks! エラー**: 依存 Pod が Dynamic Framework 未対応の場合があります。`Podfile` のコメントを参照し、`use_frameworks! :linkage => :static` を維持してください。
- **Unity ライブラリ未配置**: `UnityLauncherActivity` / `UnityViewController` がプレースホルダーのままです。Unity ビルドを配置し、該当箇所を Unity API 呼び出しに差し替えてください。
- **react-unity-webgl 404**: `web/public/unity/Build` 以下のファイル名と Unity 側の出力名が一致しているか確認してください。
- **Gradle Wrapper Main が見つからない**: 端末に既存の Gradle がある場合は `cd app/android && gradle wrapper` を実行し `gradle/wrapper/gradle-wrapper.jar` を生成してください (CI では事前にキャッシュ推奨)。

## 今後の拡張

- `packages/` 以下に Expo Modules や共通ロジックを追加
- EAS Build / Upload 連携
- Unity とのメッセージブリッジ実装 (`UnitySendMessage` との結合)

