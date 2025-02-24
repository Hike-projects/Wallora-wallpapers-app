import React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const wallpapers = [
  { id: '1', source: require('@/assets/images/wallpapers/wallpaper1.jpg') },
  { id: '2', source: require('@/assets/images/wallpapers/wallpaper2.jpg') },
  // Add more wallpapers here
];

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Wallpapers</ThemedText>
      </ThemedView>
      <FlatList
        data={wallpapers}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.wallpaperContainer}>
            <Image source={item.source} style={styles.wallpaper} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.wallpaperList}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Change the background color if needed
    paddingTop: Platform.OS === 'ios' ? 60 : 40, // Adjust padding for status bar
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wallpaperList: {
    padding: 16,
  },
  wallpaperContainer: {
    flex: 1,
    margin: 8,
  },
  wallpaper: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});