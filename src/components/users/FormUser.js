import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FormUser({
  state,
  loading,
  error,
  submitUser,
  setUser,
  edit,
  date,
  onChange,
  show,
  showMode,
}) {
  const { username, password, name, lastName, birth } = state;

  return (
    <ScrollView style={styles.container}>
      {loading ? <ActivityIndicator size={45} color="#34495e" /> : null}
      {error ? (
        <Text style={{ color: "#f00", textAlign: "center" }}>{error}</Text>
      ) : null}
      <Text style={styles.text}>*Username (min: 7)</Text>
      <TextInput
        style={styles.input}
        onChangeText={(username) => setUser("username", username)}
        value={username}
      />
      <Text style={styles.text}>*Password (min: 7)</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(password) => setUser("password", password)}
        value={password}
      />
      <Text style={styles.text}>*Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(name) => setUser("name", name)}
        value={name}
      />
      <Text style={styles.text}>*Last Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(lastName) => setUser("lastName", lastName)}
        value={lastName}
      />
      <View style={styles.datepicker}>
        <Button color="gray" onPress={showMode} title="Pick Date Of Birth" />
      </View>
      <TouchableOpacity style={styles.button} onPress={submitUser}>
        <Text style={{ color: "#fff", fontSize: 25 }}>
          {edit ? "Edit User" : "Add User"}
        </Text>
      </TouchableOpacity>
      <View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
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
  datepicker: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});
