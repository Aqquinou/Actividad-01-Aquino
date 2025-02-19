import { StyleSheet, Text, View } from 'react-native'
import { Icon, Avatar, Button } from '@rneui/base';
import React, { useState } from 'react'
import { getAuth } from "firebase/auth";

export default function Home() {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  return (
    <View style={styles.container}>
      <Button
        title={"Sign out"}
        onPress={() => auth.signOut()}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
})