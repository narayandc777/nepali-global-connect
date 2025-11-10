import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Avatar, Button, List, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../src/theme/colors';
import { useAuth } from '@/src/contexts/AuthContext';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, NY',
  };

  const stats = [
    { label: 'Job Posts', value: '3', icon: 'briefcase' },
    { label: 'Room Posts', value: '1', icon: 'home' },
    { label: 'Communities', value: '5', icon: 'account-group' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Icon size={100} icon="account" style={styles.avatar} />
            <Text variant="headlineSmall" style={styles.name}>
              {user.name}
            </Text>
            <Text variant="bodyMedium" style={styles.email}>
              {user.email}
            </Text>
            <Text variant="bodyMedium" style={styles.location}>
              📍 {user.location}
            </Text>
            <Button mode="outlined" style={styles.editButton}>
              Edit Profile
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <Avatar.Icon size={48} icon={stat.icon} style={styles.statIcon} />
                <Text variant="headlineMedium" style={styles.statValue}>
                  {stat.value}
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  {stat.label}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Card style={styles.menuCard}>
          <List.Item
            title="My Posts"
            left={(props) => <List.Icon {...props} icon="file-document" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Saved Items"
            left={(props) => <List.Icon {...props} icon="bookmark" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Notifications"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Settings"
            left={(props) => <List.Icon {...props} icon="cog" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card>

        <Button
          mode="contained"
          icon="logout"
          buttonColor={colors.error}
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          Logout
        </Button>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    margin: 16,
  },
  profileContent: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.primary,
    marginBottom: 16,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: colors.textSecondary,
    marginBottom: 4,
  },
  location: {
    color: colors.textSecondary,
    marginBottom: 16,
  },
  editButton: {
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    alignItems: 'center',
  },
  statIcon: {
    backgroundColor: colors.primary,
    marginBottom: 8,
  },
  statValue: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  menuCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  bottomPadding: {
    height: 32,
  },
});
