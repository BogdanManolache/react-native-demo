import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    // <View style={styles.container}>
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-pblack">Aora!</Text>
      <StatusBar style="auto" />
      <Link href="/home" className="text-secondary-100 font-bold">
        Go to Home
      </Link>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
