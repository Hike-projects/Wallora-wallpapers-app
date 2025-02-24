import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import * as Updates from 'expo-updates';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Sample wallpapers array; update these image paths as needed.
const wallpapers = [
  { id: '1', source: require('@/assets/images/wallpaper1.jpg') },
  { id: '2', source: require('@/assets/images/wallpaper2.jpg') },
  { id: '3', source: require('@/assets/images/wallpaper3.jpg') },
  // Add more wallpapers as needed.
];

// Placeholder download handler; replace with your actual download logic.
const handleDownload = (item: { id: string; source: number }) => {
  Alert.alert('Download', `Downloading wallpaper ${item.id}`);
  // Implement your download functionality here.
};

export default function HomeScreen() {
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  // Check for updates on mount using expo-updates.
  useEffect(() => {
    async function checkUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setUpdateMessage('Update available! Downloading...');
          await Updates.fetchUpdateAsync();
          setUpdateMessage('Update downloaded. Restarting app...');
          // Reload the app to apply the update.
          await Updates.reloadAsync();
        } else {
          setUpdateMessage('App is up to date.');
        }
      } catch (e) {
        console.error('Error checking for OTA update:', e);
        setUpdateMessage('Error checking for updates.');
      }
    }
    checkUpdates();
  }, []);

  // Optional manual update trigger.
  const handleManualUpdate = async () => {
    try {
      setUpdateMessage('Checking for update...');
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setUpdateMessage('Update available! Downloading...');
        await Updates.fetchUpdateAsync();
        setUpdateMessage('Update downloaded. Restarting app...');
        await Updates.reloadAsync();
      } else {
        setUpdateMessage('No updates available.');
      }
    } catch (e) {
      console.error('Manual update error:', e);
      setUpdateMessage('Error checking for updates.');
    }
  };

  const renderItem = ({ item }: { item: { id: string; source: number } }) => (
    <View style={styles.itemContainer}>
      <Image source={item.source} style={styles.wallpaperImage} />
      <TouchableOpacity
        style={styles.downloadButton}
        onPress={() => handleDownload(item)}>
        <ThemedText style={styles.downloadButtonText}>Download</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="header" style={styles.headerText}>
        Wallpapers Gallery
      </ThemedText>

      {updateMessage && (
        <View style={styles.updateMessageContainer}>
          <ThemedText>{updateMessage}</ThemedText>
        </View>
      )}

      {/* Manual Update Button */}
      <View style={styles.manualUpdateContainer}>
        <Button title="Check for Updates" onPress={handleManualUpdate} />
      </View>

      <FlatList
        data={wallpapers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gallery}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  updateMessageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  manualUpdateContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  gallery: {
    justifyContent: 'center',
  },
  itemContainer: {
    margin: 8,
    alignItems: 'center',
  },
  wallpaperImage: {
    width: 150,
    height: 250,
    borderRadius: 8,
  },
  downloadButton: {
    marginTop: 8,
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
