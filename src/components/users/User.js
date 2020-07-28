import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import api from "../api";
import Icon from "react-native-vector-icons/FontAwesome";

export default function User(props) {
  const { userId, refreshUsers } = props.route.params;
  const { navigation } = props;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [showGroups, setShowGroups] = useState(false);

  const setVisibility = () => {
    setShowGroups(!showGroups);
  };

  const getUser = () => {
    setShowGroups(false);
    setLoading(true);
    api
      .get(`/users/${userId}`)
      .then(({ data }) => {
        {
          setUser(data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(getUser, []);

  const deleteUser = () => {
    api
      .delete(`/users/${userId}`)
      .then(() => {
        {
          refreshUsers();
          navigation.navigate("Users");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayUser = !user ? (
    <Text>User not found</Text>
  ) : (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>Username: {user.username}</Text>
      </View>
      <View style={styles.item}>
        <Text>
          Name: {user.name} {user.lastName}
        </Text>
      </View>
      <View style={styles.item}>
        <Text>Date of birth: {user.dateOfBirth}</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() =>
            navigation.navigate("EditUser", {
              user: user,
              refreshUsers,
            })
          }
        >
          <Icon name="pencil" size={25} color="#34495e" />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 15 }} onPress={deleteUser}>
          <Icon name="trash" size={25} color="#34495e" />
        </TouchableOpacity>
      </View>
      <Button title="SHOW GROUPS" color="#34495e" onPress={setVisibility} />
      <ScrollView>
        {showGroups ? (
          user.groups.length > 0 ? (
            user.groups.map((i, index) => (
              <View key={index} style={styles.groupItem}>
                <Text>{i.name}</Text>
              </View>
            ))
          ) : (
            <Text>User has no groups</Text>
          )
        ) : (
          <Text></Text>
        )}
      </ScrollView>
    </View>
  );

  return (
    <View>
      {loading ? <ActivityIndicator size={45} color="#34495e" /> : displayUser}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 30,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  item: { width: "100%", padding: 20 },
  icons: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupItem: {
    marginTop: 5,
    padding: 20,
    borderColor: "gray",
    borderWidth: 1,
  },
});
