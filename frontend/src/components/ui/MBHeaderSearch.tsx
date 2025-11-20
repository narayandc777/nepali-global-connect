import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { Searchbar, Avatar } from 'react-native-paper';
import { colors, theme } from '../../../src/theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface MBHeaderSearchProps {
  searchQuery?: string;
  setSearchQuery?: any;
  onProfilePress?: any;
}

const MBHeaderSearch: React.FC<MBHeaderSearchProps> = ({
  searchQuery = '',
  setSearchQuery,
  onProfilePress,
}) => {
  return (
    <SafeAreaView edges={['top']} style={styles.headerContainer}>
      <View style={styles.contentRow}>
        <Searchbar
          placeholder="Search..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchBarInput}
          icon="magnify"
        />

        <Avatar.Icon
          size={36}
          icon="account-circle"
          style={styles.profileIcon}
          color={colors.primary}
          onTouchEnd={onProfilePress}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  searchBar: {
    flex: 1,
    height: 42,
    marginRight: 10,
    backgroundColor: theme.colors.surface,
  },
  searchBarInput: {
    minHeight: 0,
    fontSize: 14,
  },
  profileIcon: {
    backgroundColor: 'transparent',
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

export default MBHeaderSearch;
