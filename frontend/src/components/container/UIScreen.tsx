import { ReactNode } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { FAB } from 'react-native-paper';
import { colors } from '../../theme/colors';

interface UIScreenProps {
  children: ReactNode;
  contentStyle?: object;
  avoidKeyboard?: boolean;
  showFab?: boolean;
  fabLabel?: string;
  fabIcon?: string;
  onFabPress?: () => void;
}

const UIScreen = ({
  children,
  contentStyle,
  avoidKeyboard = true,
  showFab = false,
  fabLabel,
  fabIcon = 'plus',
  onFabPress,
}: UIScreenProps) => {
  const body = (
    <ScrollView
      contentContainerStyle={[
        styles.scroll,
        contentStyle,
        showFab && { paddingBottom: 96 }, // add padding ONLY when FAB exists
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.content, contentStyle]}>{children}</View>
    </ScrollView>
  );

  return (
    <View style={styles.root}>
      {avoidKeyboard ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
        >
          {body}
        </KeyboardAvoidingView>
      ) : (
        body
      )}

      {showFab && <FAB icon={fabIcon} label={fabLabel} onPress={onFabPress} style={styles.fab} />}
    </View>
  );
};

export default UIScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
