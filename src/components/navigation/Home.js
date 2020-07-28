import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={() => navigation.navigate("Users")}>
        <View style={styles.users}>
          <Icon name="user" size={30} color="#fff" />
          <Text style={styles.titleText}>Users</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => navigation.navigate("Groups")}>
        <View style={styles.groups}>
          <Icon name="group" size={30} color="#fff" />
          <Text style={styles.titleText}>Groups</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  users: {
    backgroundColor: "#34495e",
    height: "50%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  groups: {
    backgroundColor: "#2c3e50",
    height: "50%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 30,
    color: "#fff",
  },
});
