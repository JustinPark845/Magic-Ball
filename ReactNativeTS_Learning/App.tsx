import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import './src/constants/firebase';

export default function App() {
  function shake (): void {
    console.log("shaken");
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
