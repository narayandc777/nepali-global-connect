import React, { useState } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Avatar, TextInput, IconButton, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../../src/theme/colors';

// Mock user data – replace with your real data fetch logic
const users = {
  1: {
    id: '1',
    name: 'Sita Gurung',
    city: 'Kathmandu',
    country: 'Nepal',
    avatar: 'https://i.pravatar.cc/150?u=1',
  },
  2: {
    id: '2',
    name: 'Ram Thapa',
    city: 'Pokhara',
    country: 'Nepal',
    avatar: 'https://i.pravatar.cc/150?u=2',
  },
};

export default function ChatScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const user = userId ? users[1] : null;

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      text: `Hi, this is a welcome message to ${user?.name || 'user'}.`,
      sender: 'other',
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages((prev) => [
      ...prev,
      { id: `m${prev.length + 1}`, text: input.trim(), sender: 'me' },
    ]);
    setInput('');
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text>User not found</Text>
          <Button mode="contained" onPress={() => router.back()} style={styles.goBackButton}>
            Go Back
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        {/* Header */}
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            size={28}
            onPress={() => router.back()}
            style={styles.backButton}
          />
          <Avatar.Image size={64} source={{ uri: user.avatar }} />
          <View style={styles.userInfo}>
            <Text variant="titleLarge" style={styles.userName}>
              {user.name}
            </Text>
            <Text variant="bodyMedium" style={styles.userLocation}>
              {user.city}, {user.country}
            </Text>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === 'me' ? styles.myMessage : styles.otherMessage,
              ]}
            >
              <Text style={item.sender === 'me' ? styles.myMessageText : styles.otherMessageText}>
                {item.text}
              </Text>
            </View>
          )}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a message"
            value={input}
            onChangeText={setInput}
            style={styles.input}
            mode="outlined"
            right={<TextInput.Icon icon="send" onPress={sendMessage} />}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: 8,
  },
  userInfo: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  userName: {
    fontWeight: 'bold',
  },
  userLocation: {
    color: colors.textSecondary,
  },
  messagesList: {
    flex: 1,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#E1FFC7',
    alignSelf: 'flex-start',
  },
  myMessageText: {
    color: '#000',
  },
  otherMessageText: {
    color: '#000',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    backgroundColor: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackButton: {
    marginTop: 12,
  },
});
