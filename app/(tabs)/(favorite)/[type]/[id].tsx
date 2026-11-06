import { useLocalSearchParams } from 'expo-router';
import AlbumScreen from '@/components/AlbumScreen';
import ArtistScreen from '@/components/ArtistScreen';
import SingleScreen from '@/components/SingleScreen';

export default function DetailPage() {
  const { type } = useLocalSearchParams<{ type: string }>();
  if (type === 'album') return <AlbumScreen />;
  if (type === 'artist') return <ArtistScreen />;
  if (type === 'single') return <SingleScreen />;
  return null;
}