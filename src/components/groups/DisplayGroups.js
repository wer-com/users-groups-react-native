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

export default function DisplayGroups({ groups, loading, navigation }) {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Group", { groupId: item._id })}
      >
        <View>
          <Text style={styles.listElement}>
            <Icon name="group" size={20} color="#34495e" /> {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const displayGroups =
    groups.length > 0 ? (
      <FlatList
        data={groups}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={renderItem}
      />
    ) : null;

  return (
    <View>
      {loading ? (
        <ActivityIndicator size={45} color="#34495e" />
      ) : (
        displayGroups
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listElement: {
    backgroundColor: "#fff",
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
    padding: 30,
    fontSize: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    textAlign: "center",
  },
});
