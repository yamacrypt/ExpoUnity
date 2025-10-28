import { useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const [devClientEnabled, setDevClientEnabled] = useState(true);
  const [timezone] = useState('Asia/Tokyo');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>設定</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Custom Dev Client</Text>
        <Switch value={devClientEnabled} onValueChange={setDevClientEnabled} />
      </View>
      <View style={styles.group}>
        <Text style={styles.label}>タイムゾーン</Text>
        <TextInput value={timezone} style={styles.input} editable={false} />
      </View>
      <Text style={styles.description}>
        ネイティブの変更を反映させるため、Custom Dev Client を常にビルドしておきましょう。
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
  },
  group: {
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d4d4d8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
