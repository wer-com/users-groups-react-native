import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../api";
import DisplayGroups from "./DisplayGroups";

export default function Groups({ navigation }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGroups = () => {
    setLoading(true);
    api
      .get("/groups")
      .then(({ data }) => {
        {
          setGroups(data.groups);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(getGroups, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddGroup")}
      >
        <Icon name="plus" size={25} color="#fff" />
      </TouchableOpacity>
      <DisplayGroups
        navigation={navigation}
        groups={groups}
        loading={loading}
      />
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
