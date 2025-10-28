export function formatUnityMessage(target: string, method: string, payload: string) {
  return `${target}.${method} ← ${payload}`;
}
