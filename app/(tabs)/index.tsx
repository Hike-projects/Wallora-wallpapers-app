import React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const wallpapers = [
  { id: '1', source: require('@/assets/images/wallpapers/wallpaper1.jpg') },
  { id: '2', source: require('@/assets/images/wallpapers/wallpaper2.jpg') },
  // Add more wallpapers here
];

export default function HomeScreen() {
  const handleDownload = async (source) => {
    try {
      // Request permission to access the media library
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please grant permission to save images.');
        return;
      }

      // Convert the local asset URI to a file system URI
      const localUri = Image.resolveAssetSource(source).uri;

      // Create a unique file name for the downloaded image
      const fileName = `wallpaper_${Date.now()}.jpg`;
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

      // Download the image to the cache directory
      await FileSystem.downloadAsync(localUri, fileUri);

      // Save the downloaded image to the media library
      await MediaLibrary.saveToLibraryAsync(fileUri);

      // Show success message
      Alert.alert('Success', 'Wallpaper downloaded successfully!');
    } catch (error) {
      console.error('Error downloading wallpaper:', error);
      Alert.alert('Error', 'Failed to download wallpaper.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Wallpapers</ThemedText>
      </ThemedView>
      <FlatList
        data={wallpapers}
        renderItem={({ item }) => (
          <ThemedView style={styles.wallpaperContainer}>
            <Image source={item.source} style={styles.wallpaper} />
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => handleDownload(item.source)}
            >
              <ThemedText style={styles.buttonText}>Download</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.wallpaperList}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  wallpaperList: {
    padding: 16,
  },
  wallpaperContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  wallpaper: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  downloadButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
