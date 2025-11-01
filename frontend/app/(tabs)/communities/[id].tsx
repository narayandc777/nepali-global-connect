import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Avatar, Chip, Button, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '../../../src/theme/colors';

export default function CommunityDetailScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('about');

  const community = {
    id,
    name: 'Tech Enthusiasts NYC',
    description: 'A community for technology lovers in New York City. We meet monthly to discuss the latest tech trends.',
    members: 1234,
    category: 'Technology',
    location: 'New York, NY',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <Avatar.Icon size={80} icon="account-group" style={styles.headerAvatar} />
          <Text variant="headlineSmall" style={styles.communityName}>
            {community.name}
          </Text>
          <Text variant="bodyMedium" style={styles.communityMembers}>
            {community.members.toLocaleString()} members
          </Text>
          <View style={styles.tags}>
            <Chip mode="flat" compact style={styles.tag}>
              {community.category}
            </Chip>
          </View>
          <Button mode="contained" icon="account-plus" style={styles.joinButton}>
            Join Community
          </Button>
        </Card.Content>
      </Card>

      <SegmentedButtons
        value={activeTab}
        onValueChange={setActiveTab}
        buttons={[
          { value: 'about', label: 'About' },
          { value: 'events', label: 'Events' },
          { value: 'members', label: 'Members' },
        ]}
        style={styles.tabs}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'about' && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.sectionTitle}>About</Text>
              <Text variant="bodyMedium" style={styles.sectionText}>{community.description}</Text>

              <Text variant="titleLarge" style={styles.sectionTitle}>Location</Text>
              <Chip icon="map-marker" style={styles.locationChip}>{community.location}</Chip>
            </Card.Content>
          </Card>
        )}

        {activeTab === 'events' && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">Upcoming Events</Text>
              <Text variant="bodyMedium" style={styles.emptyText}>No upcoming events</Text>
            </Card.Content>
          </Card>
        )}

        {activeTab === 'members' && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">Members</Text>
              <Text variant="bodyMedium" style={styles.emptyText}>{community.members} members</Text>
            </Card.Content>
          </Card>
        )}

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
  headerCard: {
    margin: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerAvatar: {
    backgroundColor: colors.primary,
    marginBottom: 16,
  },
  communityName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  communityMembers: {
    color: colors.textSecondary,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#E3F2FD',
  },
  joinButton: {
    paddingHorizontal: 24,
  },
  tabs: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  content: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
  },
  sectionText: {
    lineHeight: 24,
  },
  locationChip: {
    alignSelf: 'flex-start',
  },
  emptyText: {
    color: colors.textSecondary,
    marginTop: 8,
  },
  bottomPadding: {
    height: 32,
  },
});
