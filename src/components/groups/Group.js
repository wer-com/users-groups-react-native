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

export default function Group(props) {
  const { groupId, getGroups } = props.route.params;
  const { navigation } = props;
  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const setVisibility = () => {
    setShowUsers(!showUsers);
  };

  const getGroup = () => {
    setShowUsers(false);
    setLoading(true);
    api
      .get(`/groups/${groupId}`)
      .then(({ data }) => {
        {
          setGroup(data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(getGroup, []);

  const deleteUserFromGroup = (userId) => {
    api
      .delete(`/groups/${groupId}/users/${userId}`)
      .then(() => {
        {
          getGroup();
          getGroups();
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const deleteGroup = () => {
    api
      .delete(`/groups/${groupId}`)
      .then(() => {
        {
          getGroups();
          navigation.navigate("Groups");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const displayGroup = !group ? (
    <Text>Group not found</Text>
  ) : (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          Group: {group.name}
        </Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() =>
            navigation.navigate("EditGroup", {
              groupId: group._id,
              groupName: group.name,
              getGroups,
            })
          }
        >
          <Icon name="pencil" size={25} color="#34495e" />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 15 }} onPress={deleteGroup}>
          <Icon name="trash" size={25} color="#34495e" />
        </TouchableOpacity>
      </View>
      <Button
        title="ADD USERS TO GROUP"
        color="#34495e"
        onPress={() =>
          navigation.navigate("AddUserToGroup", {
            groupId: group._id,
            getGroup,
          })
        }
      />
      <View style={{ marginTop: 10 }}></View>
      <Button title="SHOW USERS" color="#34495e" onPress={setVisibility} />
      <ScrollView>
        {showUsers ? (
          group.users.length > 0 ? (
            group.users.map((i, index) => (
              <View key={index} style={styles.groupItem}>
                <Text>{i.username} </Text>
                <TouchableOpacity
                  style={{ padding: 15 }}
                  onPress={() => deleteUserFromGroup(i._id)}
                >
                  <Icon name="trash" size={25} color="#34495e" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>Group has no users</Text>
          )
        ) : (
          <Text></Text>
        )}
      </ScrollView>
    </View>
  );

  return (
    <View>
      {loading ? <ActivityIndicator size={45} color="#34495e" /> : displayGroup}
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
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
