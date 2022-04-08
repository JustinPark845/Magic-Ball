import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import React, { useState } from 'react';
// import { app, db } from './src/constants/firebase';
// import { collection, doc, getDoc, getDocs } from "firebase/firestore"; 

export default function App() {
  interface Result {
    success?: boolean
  }
  interface PingResult {
    result?: Result
  }

  const [data, setData] = useState([]);

  function tapped (): void {
    console.log("tapped");
    getData();
  }

  const getData = async () => {
    try {
      const response = await fetch('https://us-east4-recirclable-dev.cloudfunctions.net/call-ping', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({

        // })
      });
      const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the ReCirclable Magic 8 Ball!</Text>
      <Button onPress={tapped} title="Tap!"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
