"use client";

import chakraCustomSystem from "@/theme/chakraCustomSystem";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { EmotionProvider } from "./emotion-provider";

interface ProviderProps extends ColorModeProviderProps {
  nonce?: string;
}

export function Provider({ nonce, ...props }: ProviderProps) {
  const inner = (
    <ChakraProvider value={chakraCustomSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );

  if (nonce) {
    return <EmotionProvider nonce={nonce}>{inner}</EmotionProvider>;
  }

  return inner;
}
