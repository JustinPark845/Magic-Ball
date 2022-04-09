import { StatusBar } from 'expo-status-bar';
import { Text, View, Image} from 'react-native';
import Ball from './src/components/ball';
import styles from './src/styles/App.styles';
// import { app, db } from './src/constants/firebase';
// import { collection, doc, getDoc, getDocs } from "firebase/firestore"; 

export default function App() {

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image source={require('./assets/title.png')}/>
        <Text>Welcome to the ReCirclable Magic 8 Ball!</Text>
      </View>
      <Ball />
      <StatusBar style="auto" />
    </View>
  );
}
