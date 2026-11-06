import {
	createAudioPlaylist,
	setAudioModeAsync,
	useAudioPlaylistStatus,
	type AudioMetadata,
} from 'expo-audio';

import { useAudioQueueStore } from '@/store/useAudioQueueStore';
import type { Track } from '@/types';

// A single playlist lives for the whole app, so playback survives screen changes.
// It advances and wraps natively, which keeps the queue going while the app is backgrounded.
const playlist = createAudioPlaylist({ loop: 'all', updateInterval: 1000 });

let isActiveForLockScreen = false;

function showOnLockScreen(track: Track | undefined) {
	if (!track) return;

	const metadata: AudioMetadata = {
		title: track.title,
		artist: track.artist,
		albumTitle: track.album,
		artworkUrl: track.artwork,
	};

	if (isActiveForLockScreen) {
		playlist.updateLockScreenMetadata(metadata);
	} else {
		playlist.setActiveForLockScreen(true, metadata, { showNextTrack: true, showPreviousTrack: true });
		isActiveForLockScreen = true;
	}
}

export function setupAudioPlayer() {
	setAudioModeAsync({
		playsInSilentMode: true,
		shouldPlayInBackground: true,
		// Lock screen controls require exclusive audio focus.
		interruptionMode: 'doNotMixPersistent',
	}).catch((error) => console.warn('Failed to configure audio mode:', error));

	// Tracks can change without JS asking: auto-advance and the lock screen's next/previous buttons.
	playlist.addListener('trackChanged', ({ currentIndex }) => {
		const { queue, setCurrentIndex } = useAudioQueueStore.getState();
		setCurrentIndex(currentIndex);
		showOnLockScreen(queue[currentIndex]);
	});
}

export function playQueue(tracks: Track[], startIndex: number) {
	useAudioQueueStore.getState().setQueue(tracks, startIndex);

	playlist.clear();
	for (const track of tracks) {
		playlist.add({ uri: track.url, name: track.title });
	}
	playlist.skipTo(startIndex);
	playlist.play();

	showOnLockScreen(tracks[startIndex]);
}

export function pausePlayback() {
	playlist.pause();
}

export function resumePlayback() {
	playlist.play();
}

export function playNextTrack() {
	playlist.next();
}

export function playPreviousTrack() {
	playlist.previous();
}

export function seekTo(positionMs: number) {
	playlist.seekTo(positionMs / 1000);
}

// Position and duration are in milliseconds.
export function usePlayerStatus() {
	const status = useAudioPlaylistStatus(playlist);

	return {
		isPlaying: status.playing,
		isLoading: status.isBuffering,
		position: Math.max(0, status.currentTime) * 1000,
		duration: Math.max(0, status.duration) * 1000,
	};
}
