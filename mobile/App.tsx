import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native!</Text>
      <Button title="Native!" />
      <StatusBar style="auto" />
    </View>
  );
}

interface ButtonProps {
  title: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121214",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22,
  },
  button: {
    marginTop: 20,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#c1c1c1",
  },
});
