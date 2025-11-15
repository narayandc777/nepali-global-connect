import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Chip, Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '../../../src/theme/colors';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams();

  const job = {
    id,
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'New York, Manhattan',
    type: 'Full-time',
    salary: '$120k - $150k',
    postedDate: '2 days ago',
    description:
      'We are looking for an experienced Senior Software Engineer to join our growing team. You will be responsible for designing, developing, and maintaining high-quality software solutions.',
    requirements:
      '• 5+ years of experience in software development\n• Proficiency in React, Node.js, and TypeScript\n• Experience with cloud platforms (AWS/Azure)\n• Strong understanding of database systems\n• Excellent communication skills',
    contactEmail: 'careers@techcorp.com',
    contactPhone: '+1 (555) 123-4567',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.title}>
              {job.title}
            </Text>
            <Text variant="titleMedium" style={styles.company}>
              {job.company}
            </Text>
            <Text variant="bodySmall" style={styles.postedDate}>
              Posted {job.postedDate}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.infoRow}>
              <Chip icon="map-marker" style={styles.infoChip}>
                {job.location}
              </Chip>
              <Chip icon="clock-outline" style={styles.infoChip}>
                {job.type}
              </Chip>
              <Chip icon="cash" style={styles.infoChip}>
                {job.salary}
              </Chip>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Job Description
            </Text>
            <Text variant="bodyMedium" style={styles.sectionText}>
              {job.description}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Requirements
            </Text>
            <Text variant="bodyMedium" style={styles.sectionText}>
              {job.requirements}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Contact Information
            </Text>
            <View style={styles.contactRow}>
              <Text variant="bodyMedium">Email: {job.contactEmail}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text variant="bodyMedium">Phone: {job.contactPhone}</Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.actionBar}>
        <Button mode="outlined" icon="email" style={styles.contactButton}>
          Contact
        </Button>
        <Button mode="contained" icon="send" style={styles.applyButton}>
          Apply Now
        </Button>
      </View>
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
  headerCard: {
    margin: 16,
    marginBottom: 8,
  },
  card: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  company: {
    color: colors.textSecondary,
    marginBottom: 8,
  },
  postedDate: {
    color: colors.textSecondary,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoChip: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionText: {
    lineHeight: 24,
  },
  contactRow: {
    marginBottom: 8,
  },
  bottomPadding: {
    height: 100,
  },
  actionBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: 16,
    paddingBottom: 32,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  contactButton: {
    flex: 1,
  },
  applyButton: {
    flex: 2,
  },
});
