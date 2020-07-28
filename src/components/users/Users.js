import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DisplayUsers from "./DisplayUsers";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../api";

export default function Users({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = () => {
    setLoading(true);
    api
      .get("/users")
      .then(({ data }) => {
        {
          setUsers(data.users);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(getUsers, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddUser")}
      >
        <Icon name="plus" size={25} color="#fff" />
      </TouchableOpacity>
      <DisplayUsers navigation={navigation} users={users} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: "100%" },
  button: {
    alignItems: "center",
    backgroundColor: "#34495e",
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    position: "absolute",
    bottom: 15,
    right: 15,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
