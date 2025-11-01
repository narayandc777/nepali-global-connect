import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

export default function NewsDetailScreen() {
  const { id } = useLocalSearchParams();

  // Mock news data
  const news = {
    id,
    title: 'New Community Center Opens in Downtown',
    category: 'Local News',
    location: 'New York, Manhattan',
    postedDate: '1 hour ago',
    author: 'City News',
    content:
      'The city has announced the grand opening of a brand new community center in downtown Manhattan. This state-of-the-art facility will provide a wide range of programs and services for residents of all ages.\n\nThe center features multiple activity rooms, a gym, a library, computer labs, and meeting spaces. Programs will include youth activities, senior services, fitness classes, educational workshops, and community events.\n\n"This community center represents our commitment to bringing people together and providing valuable resources for all residents," said Mayor Johnson at the opening ceremony.\n\nThe center will be open seven days a week and offers both free and affordable programming. Registration for classes and programs will begin next week.\n\nCommunity members are invited to attend the grand opening celebration this Saturday from 10 AM to 4 PM, which will include tours, demonstrations, refreshments, and entertainment for the whole family.',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Placeholder */}
        <View style={styles.imageContainer}>
          <Ionicons name="newspaper" size={64} color="#007AFF" />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{news.category}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{news.title}</Text>

          {/* Meta Info */}
          <View style={styles.metaContainer}>
            <View style={styles.metaRow}>
              <Ionicons name="time" size={16} color="#8E8E93" />
              <Text style={styles.metaText}>{news.postedDate}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="location" size={16} color="#8E8E93" />
              <Text style={styles.metaText}>{news.location}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="person" size={16} color="#8E8E93" />
              <Text style={styles.metaText}>{news.author}</Text>
            </View>
          </View>

          {/* Content */}
          <Text style={styles.contentText}>{news.content}</Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  categoryBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    lineHeight: 36,
  },
  metaContainer: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 8,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#000000',
  },
  bottomPadding: {
    height: 32,
  },
});
