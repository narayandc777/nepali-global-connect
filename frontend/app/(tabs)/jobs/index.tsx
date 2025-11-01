import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Text,
  Searchbar,
  FAB,
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

const MOCK_JOBS = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'New York, Manhattan',
    type: 'Full-time',
    salary: '$120k - $150k',
    postedDate: '2 days ago',
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Brand Solutions',
    location: 'Los Angeles, Downtown',
    type: 'Full-time',
    salary: '$80k - $100k',
    postedDate: '1 week ago',
  },
  {
    id: '3',
    title: 'Graphic Designer',
    company: 'Creative Studio',
    location: 'Chicago, Loop',
    type: 'Contract',
    salary: '$50k - $70k',
    postedDate: '3 days ago',
  },
];

export default function JobsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const countries = ['All', 'United States', 'Canada', 'United Kingdom'];
  const cities = ['All', 'New York', 'Los Angeles', 'Chicago', 'Toronto'];
  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Freelance'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.headerTitle}>
          Jobs
        </Text>
      </View>

      {/* Search Bar */}
      <Searchbar
        placeholder="Search jobs..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        icon="magnify"
        right={() => (
          <IconButton icon="filter-variant" onPress={() => setShowFilters(true)} />
        )}
      />

      {/* Active Filters */}
      {(selectedCountry !== 'All' || selectedCity !== 'All' || selectedType !== 'All') && (
        <ScrollView
          horizontal
          style={styles.filterChips}
          showsHorizontalScrollIndicator={false}
        >
          {selectedCountry !== 'All' && (
            <Chip
              mode="flat"
              onClose={() => setSelectedCountry('All')}
              style={styles.chip}
            >
              {selectedCountry}
            </Chip>
          )}
          {selectedCity !== 'All' && (
            <Chip mode="flat" onClose={() => setSelectedCity('All')} style={styles.chip}>
              {selectedCity}
            </Chip>
          )}
          {selectedType !== 'All' && (
            <Chip mode="flat" onClose={() => setSelectedType('All')} style={styles.chip}>
              {selectedType}
            </Chip>
          )}
        </ScrollView>
      )}

      {/* Job Listings */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {MOCK_JOBS.map((job) => (
          <Card
            key={job.id}
            style={styles.jobCard}
            onPress={() => router.push(`/jobs/${job.id}`)}
          >
            <Card.Content>
              <View style={styles.jobHeader}>
                <View style={styles.jobInfo}>
                  <Text variant="titleMedium" style={styles.jobTitle}>
                    {job.title}
                  </Text>
                  <Text variant="bodyMedium" style={styles.jobCompany}>
                    {job.company}
                  </Text>
                </View>
              </View>
              <View style={styles.jobDetails}>
                <Chip icon="map-marker" compact style={styles.detailChip}>
                  {job.location}
                </Chip>
                <Chip icon="clock-outline" compact style={styles.detailChip}>
                  {job.type}
                </Chip>
                <Chip icon="cash" compact style={styles.detailChip}>
                  {job.salary}
                </Chip>
              </View>
              <Text variant="bodySmall" style={styles.jobPosted}>
                {job.postedDate}
              </Text>
            </Card.Content>
          </Card>
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Filter Modal */}
      <Portal>
        <Modal
          visible={showFilters}
          onDismiss={() => setShowFilters(false)}
          contentContainerStyle={styles.modalContent}
        >
          <View style={styles.modalHeader}>
            <Text variant="headlineSmall">Filters</Text>
            <IconButton icon="close" onPress={() => setShowFilters(false)} />
          </View>

          {/* Country Filter */}
          <Text variant="titleMedium" style={styles.filterLabel}>
            Country
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {countries.map((country) => (
              <Chip
                key={country}
                selected={selectedCountry === country}
                onPress={() => setSelectedCountry(country)}
                style={styles.filterChip}
              >
                {country}
              </Chip>
            ))}
          </ScrollView>

          {/* City Filter */}
          <Text variant="titleMedium" style={styles.filterLabel}>
            City
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cities.map((city) => (
              <Chip
                key={city}
                selected={selectedCity === city}
                onPress={() => setSelectedCity(city)}
                style={styles.filterChip}
              >
                {city}
              </Chip>
            ))}
          </ScrollView>

          {/* Job Type Filter */}
          <Text variant="titleMedium" style={styles.filterLabel}>
            Job Type
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {jobTypes.map((type) => (
              <Chip
                key={type}
                selected={selectedType === type}
                onPress={() => setSelectedType(type)}
                style={styles.filterChip}
              >
                {type}
              </Chip>
            ))}
          </ScrollView>

          <Button
            mode="contained"
            onPress={() => setShowFilters(false)}
            style={styles.applyButton}
          >
            Apply Filters
          </Button>
        </Modal>
      </Portal>

      {/* FAB */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/jobs/post')}
        label="Post Job"
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
  filterChips: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  jobCard: {
    marginTop: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  jobCompany: {
    color: colors.textSecondary,
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },
  detailChip: {
    marginRight: 4,
    marginBottom: 4,
  },
  jobPosted: {
    color: colors.textSecondary,
  },
  modalContent: {
    backgroundColor: colors.surface,
    padding: 24,
    margin: 20,
    borderRadius: 16,
    maxHeight: '80%',
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
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  bottomPadding: {
    height: 80,
  },
});
