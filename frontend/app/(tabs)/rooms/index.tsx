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
import { colors, theme } from '../../../src/theme/colors';

const MOCK_ROOMS = [
  {
    id: '1',
    title: 'Spacious 1BR Apartment',
    rent: '$1,200/month',
    location: 'Brooklyn, Williamsburg',
    type: 'Private Room',
    size: '500 sq ft',
    available: 'Available Now',
  },
  {
    id: '2',
    title: 'Cozy Studio in Downtown',
    rent: '$950/month',
    location: 'Manhattan, Midtown',
    type: 'Entire Place',
    size: '350 sq ft',
    available: 'From March 1',
  },
];

export default function RoomsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const countries = ['All', 'United States', 'Canada', 'United Kingdom'];
  const cities = ['All', 'New York', 'Los Angeles', 'Chicago'];
  const roomTypes = ['All', 'Private Room', 'Shared Room', 'Entire Place'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.headerTitle}>
          Rooms
        </Text>
      </View>

      <Searchbar
        placeholder="Search rooms..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        icon="magnify"
        right={() => <IconButton icon="filter-variant" onPress={() => setShowFilters(true)} />}
      />

      {(selectedCountry !== 'All' || selectedCity !== 'All' || selectedType !== 'All') && (
        <ScrollView horizontal style={styles.filterChips} showsHorizontalScrollIndicator={false}>
          {selectedCountry !== 'All' && (
            <Chip mode="flat" onClose={() => setSelectedCountry('All')} style={styles.chip}>
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {MOCK_ROOMS.map((room) => (
          <Card
            key={room.id}
            style={styles.roomCard}
            onPress={() => router.push(`/rooms/${room.id}`)}
          >
            <Card.Cover source={{ uri: 'https://via.placeholder.com/400x200' }} />
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" style={styles.roomTitle}>
                {room.title}
              </Text>
              <Text variant="titleLarge" style={styles.roomRent}>
                {room.rent}
              </Text>
              <View style={styles.roomDetails}>
                <Chip icon="map-marker" compact style={styles.detailChip}>
                  {room.location}
                </Chip>
                <Chip icon="resize" compact style={styles.detailChip}>
                  {room.size}
                </Chip>
                <Chip icon="home" compact style={styles.detailChip}>
                  {room.type}
                </Chip>
              </View>
              <Chip
                icon="check-circle"
                mode="flat"
                textStyle={styles.availableText}
                style={styles.availableChip}
              >
                {room.available}
              </Chip>
            </Card.Content>
          </Card>
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>

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

          <Text variant="titleMedium" style={styles.filterLabel}>
            Room Type
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {roomTypes.map((type) => (
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

          <Button mode="contained" onPress={() => setShowFilters(false)} style={styles.applyButton}>
            Apply Filters
          </Button>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/rooms/post')}
        label="Post Room"
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
  roomCard: {
    marginTop: 12,
  },
  cardContent: {
    paddingTop: 12,
  },
  roomTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  roomRent: {
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  roomDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },
  detailChip: {
    marginRight: 4,
    marginBottom: 4,
  },
  availableChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
  },
  availableText: {
    color: colors.success,
    fontWeight: '600',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
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
