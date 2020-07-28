import React, { useReducer, useState } from "react";
import api from "../api";
import FormUser from "./FormUser";

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

export default function AddUser({ route, navigation }) {
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
        route.params.refreshUsers();
        navigation.navigate("Users");
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

  const setUser = (field, value) => {
    dispatch({ field, value });
  };

  return (
    <FormUser
      error={error}
      loading={loading}
      state={state}
      submitUser={submitUser}
      setUser={setUser}
    />
  );
}
