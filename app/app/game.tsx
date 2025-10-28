import { useCallback, useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatUnityMessage } from '@expounity/shared';
import { PressableOpacity } from '@/components/PressableOpacity';
import { useUnityBridge } from '@/hooks/useUnityBridge';
import { UnityBridge } from '@/modules/UnityBridge';

export default function GameScreen() {
  const { status, isNative, show, postMessage, lastPayload } = useUnityBridge();
  const [target, setTarget] = useState('GameController');
  const [method, setMethod] = useState('HandleMessage');
  const [payload, setPayload] = useState('{ "hello": "unity" }');

  const handleShow = useCallback(() => {
    show();
  }, [show]);

  const handleSend = useCallback(() => {
    postMessage(target, method, payload);
  }, [postMessage, target, method, payload]);

  const lastMessage = useMemo(() => {
    if (!lastPayload) return '---';
    return formatUnityMessage(target, method, lastPayload);
  }, [lastPayload, target, method]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Unity Bridge</Text>
      <Text style={styles.body}>
        現在の状態: <Text style={styles.status}>{status}</Text>
      </Text>
      <Text style={styles.body}>ネイティブ環境: {isNative ? 'Yes' : 'No'}</Text>
      <Text style={styles.caption}>最終メッセージ: {lastMessage}</Text>

      <PressableOpacity style={styles.button} onPress={handleShow}>
        <Text style={styles.buttonLabel}>Unity を起動する</Text>
      </PressableOpacity>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={target}
          placeholder="Target GameObject"
          onChangeText={setTarget}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={method}
          placeholder="Method"
          onChangeText={setMethod}
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, styles.payload]}
          value={payload}
          placeholder="JSON Payload"
          multiline
          onChangeText={setPayload}
        />
      </View>

      <PressableOpacity style={styles.buttonSecondary} onPress={handleSend}>
        <Text style={styles.buttonLabel}>Unity にメッセージ送信</Text>
      </PressableOpacity>

      {Platform.OS === 'web' ? (
        <Text style={styles.notice}>
          Web 版は専用の Vite アプリ (web/) にて Unity WebGL を遅延ロードします。
        </Text>
      ) : (
        <Text style={styles.notice}>
          NativeModules.UnityBridge: {UnityBridge ? 'available' : 'not available'}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
    color: '#4b5563',
  },
  status: {
    fontWeight: 'bold',
  },
  form: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d4d4d8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  payload: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  notice: {
    marginTop: 16,
    color: '#52525b',
  },
});
