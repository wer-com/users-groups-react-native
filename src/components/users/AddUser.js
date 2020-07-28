import React, { useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import api from "../api";

const initialState = {
  username: "",
  password: "",
  name: "",
  lastName: "",
  birth: "",
};

function reducer(state, { field, value }) {
  return { ...state, [field]: value };
}

export default function AddUsers({ navigation }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { username, password, name, lastName, birth } = state;

  const submitUser = () => {
    const newUser = {
      username,
      password,
      name,
      lastName,
      dateOfBirth: birth,
    };
    setLoading(true);
    api
      .post("/users", newUser)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        if (err.response) {
          const { response } = err;
          if (response.status === 500) {
            setError("Credentials are invalid");
          } else {
            setError(response.data.error);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? <ActivityIndicator size={45} color="#34495e" /> : null}
      {error ? (
        <Text style={{ color: "#f00", textAlign: "center" }}>{error}</Text>
      ) : null}
      <Text style={styles.text}>*Username (min: 7)</Text>
      <TextInput
        style={styles.input}
        onChangeText={(username) =>
          dispatch({ field: "username", value: username })
        }
        value={username}
      />
      <Text style={styles.text}>*Password (min: 7)</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(password) =>
          dispatch({ field: "password", value: password })
        }
        value={password}
      />
      <Text style={styles.text}>*Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(name) => dispatch({ field: "name", value: name })}
        value={name}
      />
      <Text style={styles.text}>*Last Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(lastName) =>
          dispatch({ field: "lastName", value: lastName })
        }
        value={lastName}
      />
      <Text style={styles.text}>*Date Of Birth</Text>
      <TextInput
        style={styles.input}
        onChangeText={(birth) => dispatch({ field: "birth", value: birth })}
        value={birth}
      />
      <TouchableOpacity style={styles.button} onPress={submitUser}>
        <Text style={{ color: "#fff", fontSize: 25 }}>Add User</Text>
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
