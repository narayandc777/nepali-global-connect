import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../../theme/colors';

interface AuthScreenProps {
  children: ReactNode;
  contentContainerStyle?: object;
}

export function AuthScreen({ children, contentContainerStyle }: AuthScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>{children}</View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start', // ensures top alignment
    padding: 16,
  },
  inner: {
    flex: 1, // makes content take full height
  },
});
