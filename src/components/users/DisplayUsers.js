import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function DisplayUsers({ users, loading, navigation }) {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("User", { userId: item._id })}
      >
        <View>
          <Text style={styles.listElement}>
            <Icon name="user" size={20} color="#34495e" /> {item.username}
          </Text>
        </View>
      </TouchableOpacity>
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
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    textAlign: "center",
  },
});
