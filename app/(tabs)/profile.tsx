import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { useState } from 'react'
import styles from '@/assets/styles/profile.styles';
import ProfileHeader from '@/components/ProfileHeader';
import LogoutButton from '@/components/LogoutButton';

export default function Profile() {

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };


  




  return (
    <ScrollView style={{ backgroundColor: "black", flex: 1 }}
          contentContainerStyle={{ padding: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={"white"}
            />
          }
        >
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />
    </View>
    </ScrollView>

  )
}