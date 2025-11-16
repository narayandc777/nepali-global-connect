import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Control, Controller } from 'react-hook-form';
import { colors } from '../../theme/colors';

interface MBTextInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  left?: any;
  right?: any;
}

export const MBTextInput: React.FC<MBTextInputProps> = ({
  control,
  name,
  label,
  placeholder,
  secureTextEntry = false,
  error,
  left,
  right,
}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={label}
            placeholder={placeholder}
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            error={!!error}
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            theme={{ colors: { background: colors.background } }}
            left={left}
            right={right}
          />
        )}
      />
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
  },
});
