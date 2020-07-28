import React, { useReducer, useState } from "react";
import api from "../api";
import FormUser from "./FormUser";

function reducer(state, { field, value }) {
  return { ...state, [field]: value };
}

export default function EditUser({ navigation, route }) {
  const { user } = route.params;

  const { username, name, lastName } = user;

  const birth = user.dateOfBirth;

  const initialState = {
    username,
    password: "",
    name,
    lastName,
    birth,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitUser = () => {
    const editedUser = {
      username: state.username,
      password: state.password,
      name: state.name,
      lastName: state.lastName,
      dateOfBirth: state.birth,
    };
    setLoading(true);
    api
      .put(`/users/${user._id}`, editedUser)
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
      edit={true}
    />
  );
}
