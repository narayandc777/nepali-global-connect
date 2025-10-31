import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Avatar, Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';
import { GlobeIcon } from '../src/components/GlobeIcon';
import { colors } from '../src/theme/colors';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Background decorative elements */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <GlobeIcon size={60} color={colors.primary} />
          <Text style={styles.headerTitle}>Nepali Global Connect</Text>
        </View>

        {/* User Profile Card */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Text
              size={80}
              label={user?.username?.substring(0, 2).toUpperCase() || 'U'}
              style={styles.avatar}
            />
            <Text style={styles.username}>{user?.username}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <Text style={styles.joinDate}>
              Member since {new Date(user?.created_at || '').toLocaleDateString()}
            </Text>
          </Card.Content>
          <Divider style={styles.divider} />
          <Card.Actions style={styles.actions}>
            <Button
              mode="outlined"
              onPress={handleLogout}
              style={styles.logoutButton}
              textColor={colors.primary}
              icon="logout"
            >
              Logout
            </Button>
          </Card.Actions>
        </Card>

        {/* Coming Soon Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Coming Soon</Text>
          
          <Card style={styles.featureCard}>
            <Card.Content style={styles.featureContent}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>📅</Text>
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Events</Text>
                <Text style={styles.featureDescription}>
                  Create and manage community events
                </Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.featureCard}>
            <Card.Content style={styles.featureContent}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>📝</Text>
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Posts & Feeds</Text>
                <Text style={styles.featureDescription}>
                  Share updates with the community
                </Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.featureCard}>
            <Card.Content style={styles.featureContent}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>👥</Text>
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Community</Text>
                <Text style={styles.featureDescription}>
                  Connect with other Nepalese members
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundCircle1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.primaryVeryLight,
    top: -80,
    right: -80,
    opacity: 0.5,
  },
  backgroundCircle2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.accentLight,
    bottom: -40,
    left: -40,
    opacity: 0.4,
  },
  container: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 12,
  },
  profileCard: {
    marginBottom: 24,
    backgroundColor: colors.background,
    elevation: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: colors.primary,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  joinDate: {
    fontSize: 12,
    color: colors.textGray,
  },
  divider: {
    backgroundColor: colors.border,
  },
  actions: {
    justifyContent: 'center',
    padding: 16,
  },
  logoutButton: {
    flex: 1,
    borderColor: colors.primary,
  },
  featuresContainer: {
    marginTop: 8,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  featureCard: {
    marginBottom: 12,
    backgroundColor: colors.backgroundLight,
    elevation: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryVeryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
