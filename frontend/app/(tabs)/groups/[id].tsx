import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  Text,
  Card,
  Avatar,
  Chip,
  Button,
  SegmentedButtons,
  FAB,
  Searchbar,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '../../../src/theme/colors';

export default function CommunityDetailScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('about');
  const [searchQuery, setSearchQuery] = useState('');

  const allMembers = [
    {
      id: '1',
      name: 'Alex Johnson',
      position: 'Software Engineer',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    {
      id: '2',
      name: 'Priya Patel',
      position: 'Product Manager',
      avatar: 'https://i.pravatar.cc/100?img=2',
    },
    { id: '3', name: 'Jordan Kim', position: null, avatar: 'https://i.pravatar.cc/100?img=3' },
    {
      id: '4',
      name: 'Sanjay Lama',
      position: 'UI/UX Designer',
      avatar: 'https://i.pravatar.cc/100?img=4',
    },
  ];

  const filteredMembers = allMembers.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const community = {
    id,
    name: 'Tech Enthusiasts NYC',
    description:
      'A community for technology lovers in New York City. We meet monthly to discuss the latest tech trends.',
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
              <Text variant="titleLarge" style={styles.sectionTitle}>
                About
              </Text>
              <Text variant="bodyMedium" style={styles.sectionText}>
                {community.description}
              </Text>

              <Text variant="titleLarge" style={styles.sectionTitle}>
                Location
              </Text>
              <Chip icon="map-marker" style={styles.locationChip}>
                {community.location}
              </Chip>
            </Card.Content>
          </Card>
        )}

        {activeTab === 'events' && (
          <>
            <Searchbar
              placeholder="Search events..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
            />
            <Card style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Upcoming Events
                </Text>

                {[
                  {
                    id: 1,
                    title: 'AI & Machine Learning Meetup',
                    date: 'Nov 20, 2025 | 6:00 PM',
                    location: 'WeWork, Midtown NYC',
                    description: 'Join fellow AI enthusiasts for lightning talks and networking.',
                  },
                  {
                    id: 2,
                    title: 'Tech Career Fair 2025',
                    date: 'Dec 5, 2025 | 10:00 AM',
                    location: 'Javits Center, NYC',
                    description: 'Meet top tech companies hiring software engineers and designers.',
                  },
                  {
                    id: 3,
                    title: 'Startup Pitch Night',
                    date: 'Dec 15, 2025 | 7:00 PM',
                    location: 'NYU Tandon, Brooklyn',
                    description:
                      'Watch startups pitch to investors and vote for your favorite idea.',
                  },
                ].map((event) => (
                  <TouchableOpacity
                    key={event.id}
                    activeOpacity={0.8}
                    onPress={() =>
                      router.push({
                        pathname: '/groups/event-register',
                        params: {
                          id: event.id,
                          title: event.title,
                          date: event.date,
                          location: event.location,
                          description: event.description,
                        },
                      })
                    }
                  >
                    <View key={event.id} style={styles.eventCard}>
                      <View style={styles.eventInfo}>
                        <Text variant="titleMedium" style={styles.eventTitle}>
                          {event.title}
                        </Text>
                        <Text variant="bodySmall" style={styles.eventDetail}>
                          📅 {event.date}
                        </Text>
                        <Text variant="bodySmall" style={styles.eventDetail}>
                          📍 {event.location}
                        </Text>
                        <Text variant="bodySmall" style={styles.eventDescription}>
                          {event.description}
                        </Text>
                      </View>
                      <View style={styles.eventActions}>
                        <Button
                          icon="pencil"
                          compact
                          mode="text"
                          onPress={() => router.push('/groups/create-events')}
                          children={undefined}
                        />
                        <Button
                          icon="delete"
                          compact
                          mode="text"
                          // textColor={colors.error}
                          onPress={() => console.log('Delete', event.id)}
                          children={undefined}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </Card.Content>
            </Card>
          </>
        )}

        {activeTab === 'members' && (
          <>
            <Searchbar
              placeholder="Search members..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
            />

            <Card style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Members
                </Text>

                {/* Member List */}
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <View key={member.id} style={styles.memberCard}>
                      <View style={styles.memberInfo}>
                        <Avatar.Image size={48} source={{ uri: member.avatar }} />
                        <View style={styles.memberDetails}>
                          <Text variant="bodyLarge" style={styles.memberName}>
                            {member.name}
                          </Text>
                          {member.position && (
                            <Text variant="bodySmall" style={styles.memberPosition}>
                              {member.position}
                            </Text>
                          )}
                        </View>
                      </View>

                      <Button
                        mode="contained-tonal"
                        icon="message-text-outline"
                        // onPress={() =>
                        //   router.push({
                        //     pathname: '/messages/chat',
                        //     params: { userId: member.id },
                        //   })
                        // }
                        compact
                        style={styles.messageButton}
                        textColor={colors.textPrimary}
                      >
                        Message
                      </Button>
                    </View>
                  ))
                ) : (
                  <Text variant="bodyMedium" style={styles.noResultsText}>
                    No members found.
                  </Text>
                )}
              </Card.Content>
            </Card>
          </>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {activeTab === 'events' && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => router.push('/groups/create-events')}
          label="Create Event"
        />
      )}
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
  searchBar: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
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
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  eventCard: {
    backgroundColor: '#F8F7FF',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  eventInfo: {
    flex: 1,
    marginRight: 8,
  },

  eventTitle: {
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },

  eventDetail: {
    color: colors.textSecondary,
    marginBottom: 2,
  },

  eventDescription: {
    marginTop: 6,
    color: colors.primary,
    fontSize: 13,
  },

  eventActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F7FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  memberDetails: {
    marginLeft: 12,
    flexShrink: 1,
  },
  memberName: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  memberPosition: {
    color: colors.textSecondary,
  },
  messageButton: {
    marginLeft: 12,
    borderRadius: 8,
  },
  noResultsText: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 16,
  },
});
