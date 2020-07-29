import React, { useReducer, useState } from "react";
import api from "../api";
import FormUser from "./FormUser";

function reducer(state, { field, value }) {
  return { ...state, [field]: value };
}

export default function EditUser({ navigation, route }) {
  const { user, refreshUsers } = route.params;

  const { username, name, lastName, dateOfBirth } = user;

  const initialState = {
    username,
    password: "",
    name,
    lastName,
  };

  const [date, setDate] = useState(new Date(dateOfBirth));
  const [show, setShow] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  const submitUser = () => {
    const editedUser = {
      username: state.username,
      password: state.password,
      name: state.name,
      lastName: state.lastName,
      dateOfBirth: date,
    };
    if (state.password.length < 7 || state.username.length < 7) {
      setError("Password And Username has to be at least 7 characters");
      return;
    }
    setLoading(true);
    api
      .put(`/users/${user._id}`, editedUser)
      .then(() => {
        refreshUsers();
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
      edit={true}
      date={date}
      onChange={onChange}
      show={show}
      showMode={showMode}
    />
  );
}
