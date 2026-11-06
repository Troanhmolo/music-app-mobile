import { create } from 'zustand';
import { API_URL } from "../constants/api";
import { getErrorMessage } from "../helpers/miscellaneous";
import type { Album, Artist, Playlist, Song } from "../types";

export interface PlaylistUpdates {
    name?: string;
    songIds?: string[];
}

interface MusicStore {
    songById: Song | null;
    songs: Song[];
    songsInAlbum: Song[];
    songsInPlaylist: Song[];
    album: Album | null;
    artist: Artist | null;
    albums: Album[];
    albumsByArtist: Album[];
    favoriteSongs: Song[];
    isLoading: boolean;
    error: string | null;
    artists: Artist[];
    songsByArtist: Song[];
    searchedSongs: Song[];
    searchedAlbums: Album[];
    searchedArtists: Artist[];
    playlist: Playlist | null;
    playlists: Playlist[];
    fetchSongs: () => Promise<void>;
    fetchSongById: (songId: string) => Promise<void>;
    fetchSongsInAlbum: (albumId: string) => Promise<void>;
    fetchFavoriteSongs: (userId: string) => Promise<void>;
    fetchAlbumById: (albumId: string) => Promise<void>;
    fetchArtistById: (artistId: string) => Promise<void>;
    fetchAlbums: () => Promise<void>;
    fetchArtists: () => Promise<void>;
    fetchSongsByArtist: (artistId: string) => Promise<void>;
    fetchSongsInPlaylist: (playlistId: string) => Promise<void>;
    fetchAlbumsByArtist: (artistId: string) => Promise<void>;
    searchAll: (q: string) => Promise<void>;
    toggleFavoriteSong: (userId: string, songId: string) => Promise<void>;
    createPlaylist: (name: string, userId: string) => Promise<Playlist>;
    fetchPlaylists: (userId: string) => Promise<void>;
    fetchPlaylistById: (playlistId: string) => Promise<void>;
    updatePlaylist: (playlistId: string, updates: PlaylistUpdates) => Promise<void>;
    deletePlaylist: (playlistId: string) => Promise<void>;
    addSongToPlaylist: (playlistId: string, songId: string) => Promise<void>;
    removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
    songById: null,
    songs: [],
    songsInAlbum: [],
    songsInPlaylist: [],
    album: null,
    artist: null,
    albums: [],
    albumsByArtist: [],
    favoriteSongs: [],
    isLoading: false,
    error: null,
    artists: [],
    songsByArtist: [],
    searchedSongs: [],
    searchedAlbums: [],
    searchedArtists: [],
    playlist: null,
    playlists: [],



    fetchSongs: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/songs`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch songs");

            set({ songs: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },

    fetchSongById: async (songId: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/songs/${songId}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch song");

            set({ songById: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },

    fetchSongsInAlbum: async (albumId: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/songs/album/${albumId}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch songs in album");

            set({ songsInAlbum: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },

    fetchFavoriteSongs: async (userId: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/favorites/mobile/${userId}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch favorite songs");

            set({ favoriteSongs: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },

    fetchAlbumById: async (albumId: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/albums/${albumId}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch album");

            set({ album: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },

    fetchArtistById: async (artistId: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/artists/${artistId}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch album");

            set({ artist: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },

    fetchAlbums: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/albums`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch albums");

            set({ albums: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },

    fetchArtists: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/artists`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch artists");

            set({ artists: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },

    fetchSongsByArtist: async (artistId: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/songs/artist/${artistId}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch songs by artist");

            set({ songsByArtist: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },

    fetchSongsInPlaylist: async (playlistId: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/songs/playlist/${playlistId}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch songs by artist");

            set({ songsInPlaylist: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },



    fetchAlbumsByArtist: async (artistId: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/albums/artist/${artistId}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch songs by artist");

            set({ albumsByArtist: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },

    searchAll: async (q: string) => {
        try {
            const response = await fetch(`${API_URL}/api/search?q=${q}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to search");

            set({ searchedSongs: data.songs, searchedAlbums: data.albums, searchedArtists: data.artists });
        } catch (error) {
            set({ error: getErrorMessage(error) });
        }

    },

    toggleFavoriteSong: async (userId: string, songId: string) => {
        try {
            const response = await fetch(`${API_URL}/api/favorites/mobile`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: userId, song: songId }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to toggle favorite");

            await get().fetchFavoriteSongs(userId);

        } catch (error) {
            set({ error: getErrorMessage(error) });
        }
    },

    createPlaylist: async (name: string, userId: string) => {
        const response = await fetch(`${API_URL}/api/playlists/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, userId }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to create playlist');
        return data;
    },

    fetchPlaylists: async (userId: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/playlists/${userId}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch playlists");

            set({ playlists: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },

    fetchPlaylistById: async (playlistId: string) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/api/playlists/playlist/${playlistId}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch album");

            set({ playlist: data, isLoading: false });
        } catch (error) {
            set({ error: getErrorMessage(error), isLoading: false });
        }
    },

    updatePlaylist: async (playlistId: string, updates: PlaylistUpdates) => {
        try {
            const response = await fetch(`${API_URL}/api/playlists/update/${playlistId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates), // { name, songIds }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update playlist');
            }
        } catch (error) {
            console.error('Update playlist error:', getErrorMessage(error));
            throw error;
        }
    },

    deletePlaylist: async (playlistId: string) => {
        try {
            const response = await fetch(`${API_URL}/api/playlists/delete/${playlistId}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete playlist');
            }
        } catch (error) {
            console.error('Delete playlist error:', getErrorMessage(error));
            throw error;
        }
    },

    addSongToPlaylist: async (playlistId: string, songId: string) => {
        const response = await fetch(`${API_URL}/api/playlists/add/${playlistId}/${songId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to add song to playlist');
        }
    },

    removeSongFromPlaylist: async (playlistId: string, songId: string) => {
        const res = await fetch(`${API_URL}/api/playlists/remove/${playlistId}/${songId}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to remove song');
    },

}));