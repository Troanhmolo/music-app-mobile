
export const trackTitleFilter = (title: string) => (track: { title?: string }) =>
	track.title?.toLowerCase().includes(title.toLowerCase())

export const artistNameFilter = (name: string) => (artist: { name: string }) =>
	artist.name.toLowerCase().includes(name.toLowerCase())

export const playlistNameFilter = (name: string) => (playlist: { name: string }) =>
	playlist.name.toLowerCase().includes(name.toLowerCase())
