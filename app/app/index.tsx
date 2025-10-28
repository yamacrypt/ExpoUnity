import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Expo + Unity Integration</Text>
        <Text style={styles.body}>
          このサンプルは Expo Bare プロジェクトに Unity as a Library を統合し、
          Web では Unity WebGL を遅延ロードする土台を提供します。
        </Text>
      </View>
      <View style={styles.links}>
        <Link href="/game" style={styles.link}>
          🎮 ゲーム画面へ
        </Link>
        <Link href="/settings" style={styles.link}>
          ⚙️ 設定画面へ
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f4f4f5',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  links: {
    gap: 16,
  },
  link: {
    fontSize: 18,
    color: '#2563eb',
  },
});
