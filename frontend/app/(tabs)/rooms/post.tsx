import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PostRoomScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [rent, setRent] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [roomType, setRoomType] = useState('Private Room');
  const [size, setSize] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const roomTypes = ['Private Room', 'Shared Room', 'Entire Place', 'Studio'];

  const handlePost = () => {
    if (!title || !rent || !country || !city || !description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Success', 'Room posted successfully!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.title}>Post a Room</Text>

            {/* Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Room Title <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Spacious 1BR Apartment"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Rent */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Monthly Rent <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. $1,200"
                value={rent}
                onChangeText={setRent}
                keyboardType="numeric"
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Location Section */}
            <Text style={styles.sectionTitle}>Location</Text>

            {/* Country */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Country <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. United States"
                value={country}
                onChangeText={setCountry}
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* City */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                City <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. New York"
                value={city}
                onChangeText={setCity}
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Area */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Area/Neighborhood</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Brooklyn"
                value={area}
                onChangeText={setArea}
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Room Type */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Room Type</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {roomTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeOption,
                      roomType === type && styles.typeOptionActive,
                    ]}
                    onPress={() => setRoomType(type)}
                  >
                    <Text
                      style={[
                        styles.typeOptionText,
                        roomType === type && styles.typeOptionTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Size */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Size (sq ft)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 500"
                value={size}
                onChangeText={setSize}
                keyboardType="numeric"
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Bedrooms */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bedrooms</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 1"
                value={bedrooms}
                onChangeText={setBedrooms}
                keyboardType="numeric"
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Bathrooms */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bathrooms</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 1"
                value={bathrooms}
                onChangeText={setBathrooms}
                keyboardType="numeric"
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Description <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe the room, amenities, rules, and what makes it special..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Amenities */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amenities</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="WiFi, Parking, Laundry, AC, Heating, etc."
                value={amenities}
                onChangeText={setAmenities}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Available From */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Available From</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. March 1, 2025"
                value={availableFrom}
                onChangeText={setAvailableFrom}
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Contact Section */}
            <Text style={styles.sectionTitle}>Contact Information</Text>

            {/* Contact Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                value={contactName}
                onChangeText={setContactName}
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                value={contactEmail}
                onChangeText={setContactEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="+1 (555) 123-4567"
                value={contactPhone}
                onChangeText={setContactPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#8E8E93"
              />
            </View>

            {/* Post Button */}
            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.postButtonText}>Post Room</Text>
            </TouchableOpacity>

            <View style={styles.bottomPadding} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginTop: 8,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  required: {
    color: '#FF3B30',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  typeOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  typeOptionActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeOptionText: {
    fontSize: 14,
    color: '#000000',
  },
  typeOptionTextActive: {
    color: '#FFFFFF',
  },
  postButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 32,
  },
});
