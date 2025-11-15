import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function RoomDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Mock room data
  const room = {
    id,
    title: 'Spacious 1BR Apartment',
    rent: '$1,200/month',
    location: 'Brooklyn, Williamsburg',
    country: 'United States',
    city: 'Brooklyn',
    area: 'Williamsburg',
    type: 'Private Room',
    size: '500 sq ft',
    bedrooms: '1',
    bathrooms: '1',
    postedDate: '3 days ago',
    available: 'Available Now',
    description:
      'Beautiful and spacious 1-bedroom apartment in the heart of Williamsburg. Features include hardwood floors, large windows with natural light, modern kitchen with stainless steel appliances, and a cozy living area. Perfect for young professionals.',
    amenities:
      '• High-speed WiFi\n• Parking available\n• In-unit laundry\n• Air conditioning\n• Heating\n• Pet-friendly\n• 24/7 security\n• Close to subway',
    contactName: 'John Smith',
    contactEmail: 'john@email.com',
    contactPhone: '+1 (555) 123-4567',
  };

  const handleContact = () => {
    Alert.alert('Contact', `Email: ${room.contactEmail}\nPhone: ${room.contactPhone}`);
  };

  const handleInquire = () => {
    Alert.alert('Inquire', 'Inquiry feature coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Placeholder */}
        <View style={styles.imageContainer}>
          <Ionicons name="home" size={64} color="#007AFF" />
          <Text style={styles.imagePlaceholderText}>Room Photos</Text>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{room.title}</Text>
          <Text style={styles.rent}>{room.rent}</Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#34C759" />
              <Text style={styles.statusText}>{room.available}</Text>
            </View>
            <Text style={styles.postedDate}>Posted {room.postedDate}</Text>
          </View>
        </View>

        {/* Quick Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={20} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{room.location}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Ionicons name="resize" size={20} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Size</Text>
              <Text style={styles.infoValue}>{room.size}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Ionicons name="bed" size={20} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Bedrooms / Bathrooms</Text>
              <Text style={styles.infoValue}>
                {room.bedrooms} bed • {room.bathrooms} bath
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Ionicons name="pricetag" size={20} color="#007AFF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Type</Text>
              <Text style={styles.infoValue}>{room.type}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>{room.description}</Text>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <Text style={styles.sectionText}>{room.amenities}</Text>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactRow}>
            <Ionicons name="person" size={20} color="#8E8E93" />
            <Text style={styles.contactText}>{room.contactName}</Text>
          </View>
          <View style={styles.contactRow}>
            <Ionicons name="mail" size={20} color="#8E8E93" />
            <Text style={styles.contactText}>{room.contactEmail}</Text>
          </View>
          <View style={styles.contactRow}>
            <Ionicons name="call" size={20} color="#8E8E93" />
            <Text style={styles.contactText}>{room.contactPhone}</Text>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
          <Ionicons name="mail-outline" size={20} color="#007AFF" />
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inquireButton} onPress={handleInquire}>
          <Text style={styles.inquireButtonText}>Send Inquiry</Text>
        </TouchableOpacity>
      </View>
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
  imagePlaceholderText: {
    marginTop: 12,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  rent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34C759',
    marginLeft: 4,
  },
  postedDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
  },
  bottomPadding: {
    height: 100,
  },
  actionBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 8,
  },
  contactButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  inquireButton: {
    flex: 2,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  inquireButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
