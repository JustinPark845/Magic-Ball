import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Animated} from 'react-native';
import React, { useState } from 'react';
// import { app, db } from './src/constants/firebase';
// import { collection, doc, getDoc, getDocs } from "firebase/firestore"; 

export default function App() {
  interface Arguments {
    args: [string]
  }

  interface Parameter {
    data : Arguments
  }

  const [data, setData] = useState([]);
  const [magic8Response, setMagic8Response] = useState('');
  const [waiting, setWaiting] = useState(false);

  function shake (): void {
    console.log("tapped");
    if (waiting === false) {
      setWaiting(true);
      getData();
    }
  }

  function shakeAnimation (isActive: boolean): void {
    if (isActive) {
      Animated.loop(
        Animated.timing(shakeAnimationValue, { toValue: 10, duration: 100, useNativeDriver: true}),
        // Animated.timing(shakeAnimationValue, { toValue: -10, duration: 100, useNativeDriver: true }),
        // Animated.timing(shakeAnimationValue, { toValue: 10, duration: 100, useNativeDriver: true }),
        // Animated.timing(shakeAnimationValue, { toValue: 0, duration: 100, useNativeDriver: true })
      )
    } else {
// turn off
    }
  }

  function revealLoading (): void {
    console.log('loading');
    shakeAnimation(true);
  }

  function hideLoading (): void {
    console.log('done');
    console.log(data);
    shakeAnimation(false);
    setWaiting(false);
    setMagic8Response(magic8BallResponses[Math.floor(Math.random()*magic8BallResponses.length)]);
  }

  const shakeAnimationValue = new Animated.Value(0);
  const magic8BallResponses: string[] = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes - definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Dont count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
  const inputDataDelay: Parameter = {
    data: {
      args: ["wait"]
    }
  }

  const getData = async () => {
    revealLoading();
    try {
      const response = await fetch('https://us-east4-recirclable-dev.cloudfunctions.net/call-ping', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputDataDelay)
      });
      const json = await response.json();
        setData(json);
        hideLoading();
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image source={require('./assets/title.png')}/>
        <Text>Welcome to the ReCirclable Magic 8 Ball!</Text>
      </View>
      <Image source={require('./assets/logo.png')}/>
      <Button onPress={shake} title="Shake!" color='#005f60'/>
      <Text>{magic8Response}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1eff7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
  }
});
