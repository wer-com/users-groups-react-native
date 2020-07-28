import React, { useEffect, useState } from "react";
import api from "../api";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function AddUserToGroup(props) {
  const { groupId, getGroup } = props.route.params;
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

  const addUserToGroup = (userId) => {
    api
      .post(`/groups/${groupId}/users/${userId}`)
      .then(() => {
        {
          alert("User has been added");
          getGroup();
        }
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listElement}>
        <Text>
          <Icon name="user" size={20} color="#34495e" /> {item.username}
        </Text>
        <TouchableOpacity onPress={() => addUserToGroup(item._id)}>
          <Icon name="plus" size={20} color="#34495e" />
        </TouchableOpacity>
      </View>
    );
  };

  const displayUsers =
    users.length > 0 ? (
      <FlatList
        data={users}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={renderItem}
      />
    ) : null;

  return (
    <View>
      {loading ? <ActivityIndicator size={45} color="#34495e" /> : displayUsers}
    </View>
  );
}

const styles = StyleSheet.create({
  listElement: {
    backgroundColor: "#fff",
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
    padding: 30,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    textAlign: "center",
  },
});
