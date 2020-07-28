import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function FormGroup({
  name,
  loading,
  error,
  submitGroup,
  setGroupName,
  edit,
}) {
  return (
    <ScrollView style={styles.container}>
      {loading ? <ActivityIndicator size={45} color="#34495e" /> : null}
      {error ? (
        <Text style={{ color: "#f00", textAlign: "center" }}>{error}</Text>
      ) : null}
      <Text style={styles.text}>*Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(name) => setGroupName(name)}
        value={name}
      />
      <TouchableOpacity style={styles.button} onPress={submitGroup}>
        <Text style={{ color: "#fff", fontSize: 25 }}>
          {edit ? "Edit Group" : "Add Group"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  text: {
    fontSize: 12,
    color: "gray",
    marginTop: 20,
  },
  input: {
    borderColor: "gray",
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 15,
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#34495e",
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
