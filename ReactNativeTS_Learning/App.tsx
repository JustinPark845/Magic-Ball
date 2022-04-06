import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { app, db } from './src/constants/firebase';
import { collection, doc, getDoc, getDocs } from "firebase/firestore"; 
import { async } from '@firebase/util';

export default function App() {
  function shake (): void {
    console.log("shaken");

    // const docRef = doc(db, "output", "help");
    // const docSnap = getDoc(docRef);
    // console.log(docSnap);

    // const querySnapshot = getDocs(collection(db, "Output"));
    // console.log(querySnapshot);

  }

  async getInfo () {
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);
  }
  
  return (
    <View style={styles.container}>
      <Text>Welcome to the ReCirclable Magic 8 Ball!</Text>
      <Button onPress={shake} title="Shake"/>
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
