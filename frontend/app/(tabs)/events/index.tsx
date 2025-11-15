import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Text,
  Searchbar,
  Card,
  Chip,
  IconButton,
  Modal,
  Portal,
  Button,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../../../src/theme/colors';

const MOCK_NEWS = [
  {
    id: '1',
    title: 'New Community Center Opens in Downtown',
    category: 'Local News',
    location: 'New York, Manhattan',
    excerpt: 'The city has opened a new community center offering various programs...',
    postedDate: '1 hour ago',
    author: 'City News',
  },
  {
    id: '2',
    title: 'Annual Tech Conference Announced',
    category: 'Events',
    location: 'San Francisco, CA',
    excerpt: 'Tech leaders will gather for the annual conference...',
    postedDate: '3 hours ago',
    author: 'Tech Daily',
  },
];

const CATEGORIES = ['All', 'Local News', 'National News', 'Events', 'Business', 'Education', 'Health', 'Sports'];

export default function NewsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const locations = ['All', 'New York', 'Los Angeles', 'Chicago', 'San Francisco'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.headerTitle}>
          News
        </Text>
      </View>

      <Searchbar
        placeholder="Search news..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        icon="magnify"
        right={() => <IconButton icon="filter-variant" onPress={() => setShowFilters(true)} />}
      />

      <ScrollView horizontal style={styles.categoryContainer} showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((category) => (
          <Chip
            key={category}
            selected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
            style={styles.categoryChip}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {MOCK_NEWS.map((news) => (
          <Card key={news.id} style={styles.newsCard} onPress={() => router.push(`/news/${news.id}`)}>
            <Card.Cover source={{ uri: 'https://via.placeholder.com/400x200' }} />
            <Card.Content style={styles.cardContent}>
              <View style={styles.newsHeader}>
                <Chip mode="flat" compact style={styles.categoryBadge}>
                  {news.category}
                </Chip>
                <Text variant="bodySmall" style={styles.newsTime}>
                  {news.postedDate}
                </Text>
              </View>
              <Text variant="titleMedium" style={styles.newsTitle}>
                {news.title}
              </Text>
              <Text variant="bodyMedium" style={styles.newsExcerpt} numberOfLines={2}>
                {news.excerpt}
              </Text>
              <View style={styles.newsFooter}>
                <Chip icon="map-marker" compact textStyle={styles.newsLocation}>
                  {news.location}
                </Chip>
                <Text variant="bodySmall" style={styles.newsAuthor}>
                  by {news.author}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <Portal>
        <Modal visible={showFilters} onDismiss={() => setShowFilters(false)} contentContainerStyle={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text variant="headlineSmall">Filters</Text>
            <IconButton icon="close" onPress={() => setShowFilters(false)} />
          </View>

          <Text variant="titleMedium" style={styles.filterLabel}>Location</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {locations.map((location) => (
              <Chip
                key={location}
                selected={selectedLocation === location}
                onPress={() => setSelectedLocation(location)}
                style={styles.filterChip}
              >
                {location}
              </Chip>
            ))}
          </ScrollView>

          <Button mode="contained" onPress={() => setShowFilters(false)} style={styles.applyButton}>
            Apply Filters
          </Button>
        </Modal>
      </Portal>
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
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryChip: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  newsCard: {
    marginTop: 12,
  },
  cardContent: {
    paddingTop: 12,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#E3F2FD',
  },
  newsTime: {
    color: colors.textSecondary,
  },
  newsTitle: {
    fontWeight: '600',
    marginBottom: 6,
  },
  newsExcerpt: {
    color: colors.textSecondary,
    marginBottom: 8,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsLocation: {
    fontSize: 12,
  },
  newsAuthor: {
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  modalContent: {
    backgroundColor: colors.surface,
    padding: 24,
    margin: 20,
    borderRadius: 16,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  filterLabel: {
    marginTop: 16,
    marginBottom: 12,
  },
  filterChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  applyButton: {
    marginTop: 24,
  },
  bottomPadding: {
    height: 32,
  },
});
