import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Avatar } from 'react-native-paper';
import { colors, theme } from '../../../src/theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MBHeaderSearchProps {
  searchQuery: string;
  setSearchQuery: any;
  onProfilePress?: any;
}

const MBHeaderSearch: React.FC<MBHeaderSearchProps> = ({
  searchQuery,
  setSearchQuery,
  onProfilePress,
}) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
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
    paddingTop: 0,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    flex: 1,
    height: 38,
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
});

export default MBHeaderSearch;
