import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Avatar, Chip } from 'react-native-paper';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { colors, theme } from '../../../src/theme/colors';
import UIScreen from '../../../src/components/container/UIScreen';

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
  {
    id: '3',
    name: 'Tech Enthusiasts NYC',
    description: 'A community for technology lovers in New York City',
    members: 1234,
    isPrivate: false,
    category: 'Technology',
  },
  {
    id: '4',
    name: 'Brooklyn Runners Club',
    description: 'Running group for all fitness levels in Brooklyn',
    members: 567,
    isPrivate: false,
    category: 'Sports',
  },
];

export default function CommunitiesScreen() {
  const router = useRouter();

  const { q } = useGlobalSearchParams<{ q?: string }>();
  const searchQuery = q?.toLowerCase() || '';
  console.log('search params', searchQuery);
  return (
    <UIScreen
      showFab
      fabLabel="Create"
      fabIcon="plus"
      onFabPress={() => router.push('/groups/create')}
    >
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.headerTitle}>
          Communities
        </Text>
      </View>

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          My Communities
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {MOCK_COMMUNITIES.slice(0, 2).map((community) => (
            <Card
              key={community.id}
              style={styles.myCommunityCard}
              onPress={() => router.push(`/groups/${community.id}`)}
            >
              <Card.Content style={styles.myCommunityContent}>
                <Avatar.Icon size={48} icon="account-group" style={styles.avatar} />
                <Text variant="titleSmall" numberOfLines={1} style={styles.myCommunityName}>
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

      {MOCK_COMMUNITIES.map((community) => (
        <Card
          key={community.id}
          style={styles.communityCard}
          onPress={() => router.push(`/groups/${community.id}`)}
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

                <Text variant="bodyMedium" numberOfLines={2} style={styles.communityDescription}>
                  {community.description}
                </Text>

                <View style={styles.communityFooter}>
                  <Chip compact mode="flat" style={styles.categoryChip}>
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
    </UIScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: theme.colors.surface,
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

  communityCard: {
    marginTop: 12,
    marginHorizontal: 16,
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
});
