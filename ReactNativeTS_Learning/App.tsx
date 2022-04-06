import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
// import { app, db } from './src/constants/firebase';
// import { collection, doc, getDoc, getDocs } from "firebase/firestore"; 

export default function App() {
  function shake (): void {
    console.log("shaken");
  }

    // readData();

    // const docRef = doc(db, "output", "help");
    // const docSnap = getDoc(docRef);
    // console.log(docSnap);

    // const querySnapshot = getDocs(collection(db, "Output"));
    // console.log(querySnapshot);

  // }

  // const readData = async () => {
  //   let docRef = collection(db, 'Output');
  //   console.log(docRef);
  //   const docSnap = await doc(docRef, 'Hoj4h4WH7TX10ywP5WBF');
  //   console.log(docSnap);

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
