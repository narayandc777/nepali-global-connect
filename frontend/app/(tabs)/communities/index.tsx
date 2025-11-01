import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Searchbar, FAB, Card, Avatar, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../../../src/theme/colors';

const MOCK_COMMUNITIES = [
  {
    id: '1',
    name: 'Tech Enthusiasts NYC',
    description: 'A community for technology lovers in New York City',
    members: 1234,
    isPrivate: false,
    category: 'Technology',
  },
  {
    id: '2',
    name: 'Brooklyn Runners Club',
    description: 'Running group for all fitness levels in Brooklyn',
    members: 567,
    isPrivate: false,
    category: 'Sports',
  },
];

export default function CommunitiesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.headerTitle}>
          Communities
        </Text>
      </View>

      <Searchbar
        placeholder="Search communities..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          My Communities
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {MOCK_COMMUNITIES.slice(0, 2).map((community) => (
            <Card
              key={community.id}
              style={styles.myCommunityCard}
              onPress={() => router.push(`/communities/${community.id}`)}
            >
              <Card.Content style={styles.myCommunityContent}>
                <Avatar.Icon size={48} icon="account-group" style={styles.avatar} />
                <Text variant="titleSmall" style={styles.myCommunityName} numberOfLines={1}>
                  {community.name}
                </Text>
                <Text variant="bodySmall" style={styles.myCommunityMembers}>
                  {community.members} members
                </Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Discover
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {MOCK_COMMUNITIES.map((community) => (
          <Card
            key={community.id}
            style={styles.communityCard}
            onPress={() => router.push(`/communities/${community.id}`)}
          >
            <Card.Content>
              <View style={styles.communityHeader}>
                <Avatar.Icon size={56} icon="account-group" style={styles.communityAvatar} />
                <View style={styles.communityInfo}>
                  <View style={styles.communityTitleRow}>
                    <Text variant="titleMedium" style={styles.communityName}>
                      {community.name}
                    </Text>
                    {community.isPrivate && <Avatar.Icon size={20} icon="lock" />}
                  </View>
                  <Text variant="bodyMedium" style={styles.communityDescription} numberOfLines={2}>
                    {community.description}
                  </Text>
                  <View style={styles.communityFooter}>
                    <Chip mode="flat" compact style={styles.categoryChip}>
                      {community.category}
                    </Chip>
                    <Text variant="bodySmall" style={styles.communityMembers}>
                      {community.members.toLocaleString()} members
                    </Text>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/communities/create')}
        label="Create"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  searchBar: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  myCommunityCard: {
    width: 140,
    marginRight: 12,
  },
  myCommunityContent: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.primary,
    marginBottom: 8,
  },
  myCommunityName: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  myCommunityMembers: {
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  communityCard: {
    marginTop: 12,
  },
  communityHeader: {
    flexDirection: 'row',
  },
  communityAvatar: {
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  communityInfo: {
    flex: 1,
  },
  communityTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  communityName: {
    fontWeight: '600',
    flex: 1,
  },
  communityDescription: {
    color: colors.textSecondary,
    marginBottom: 8,
  },
  communityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryChip: {
    backgroundColor: '#E3F2FD',
  },
  communityMembers: {
    color: colors.textSecondary,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  bottomPadding: {
    height: 80,
  },
});
