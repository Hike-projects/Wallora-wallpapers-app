import React from 'react';
import { Image, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const wallpapers = [
  { id: '1', source: require('@/assets/images/wallpaper1.jpg') },
  { id: '2', source: require('@/assets/images/wallpaper2.jpg') },
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
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
