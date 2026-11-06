import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { useAudioQueueStore } from '@/store/useAudioQueueStore'
import { Image } from 'expo-image'
import { colors } from '@/constants/tokens'
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { unknownTrackImageUri } from '@/constants/images'
import { PlayerSlider } from '@/components/PlayerSlider'
import { pausePlayback, playNextTrack, playPreviousTrack, resumePlayback, seekTo, usePlayerStatus } from '@/store/player-service'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import COLORS from '@/constants/colors'
import { useMusicStore } from '@/store/useMusicStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'expo-router'



export default function PlayerScreen() {
  const router = useRouter();
  const { queue, currentIndex } = useAudioQueueStore();
  const currentTrack = queue[currentIndex];
  const { position, isPlaying } = usePlayerStatus();
  const { top, bottom } = useSafeAreaInsets()
  const { favoriteSongs, toggleFavoriteSong } = useMusicStore();
  const { user } = useAuthStore();
  if (!currentTrack) {
    return (
      <View style={styles.container}>
        <Text>No track selected</Text>
      </View>
    );
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      resumePlayback();
    }
  };

  const handlePrevious = () => {
    if (position > 5000) {
      // If we're more than 5 seconds into the track, seek to beginning
      seekTo(0);
    } else {
      playPreviousTrack();
    }
  };

  const handleNext = () => {
    playNextTrack();
  };

  const isFavorite = favoriteSongs.some(song => song._id === currentTrack.id);


  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          onPress={() => router.back()}
          name="arrow-back"
          size={24}
          color="white"
        />
      </View>
      {/* Artwork */}
      <View style={{ flex: 1, marginTop: top, marginBottom: bottom }}>
        <View style={styles.artworkImageContainer}>
          <Image
            source={{ uri: currentTrack.artwork ?? unknownTrackImageUri }}
            contentFit='cover'
            style={styles.artwork}
          />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 20 }}>
            <View style={{ height: 60 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >


                {/* Title */}
                <Text style={styles.title}>
                  {currentTrack.title || "unknown title"}
                </Text>
                
                  <Pressable onPress={() => { toggleFavoriteSong(user!._id, currentTrack.id)}}>
                <FontAwesome
                  name={isFavorite ? 'heart' : 'heart-o'}
                  size={22}
                  color={isFavorite ? COLORS.primary : COLORS.white}
                  style={{ marginHorizontal: 14 }}
                  
                />
                </Pressable>
              </View>
              {/* Artist */}

              <Text numberOfLines={1} style={[styles.artist, { marginTop: 6 }]}>
                {currentTrack.artist || "unknown artist"}
              </Text>
            </View>
            {/* Controls */}
            <PlayerSlider style={{ marginTop: 32 }} />

            <View style={{ marginTop: 40, width: '100%' }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>


                <TouchableOpacity activeOpacity={0.7} onPress={handlePrevious}>
                  <Ionicons name="play-skip-back" size={30} color={colors.text} />
                </TouchableOpacity>
                <View>


                  <TouchableOpacity onPress={handlePlayPause}>
                    <FontAwesome6 name={isPlaying ? 'pause' : 'play'} size={48} color={colors.text} />
                  </TouchableOpacity>

                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={handleNext}>
                  <Ionicons name="play-skip-forward" size={30} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, backgroundColor: '#000' },
  loadingContainer: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artwork: { width: '100%', height: '100%', borderRadius: 12 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold'},
  artist: { color: '#aaa', fontSize: 20 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 32 },
  artworkImageContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11.0,
    flexDirection: 'row',
    justifyContent: 'center',
    height: '45%',
  },
});
