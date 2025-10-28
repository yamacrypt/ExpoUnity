import { PropsWithChildren } from 'react';
import { Pressable, PressableProps } from 'react-native';

export function PressableOpacity({ children, ...rest }: PropsWithChildren<PressableProps>) {
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        typeof rest.style === 'function' ? rest.style({ pressed }) : rest.style,
        pressed && { opacity: 0.6 },
      ]}
    >
      {children}
    </Pressable>
  );
}
