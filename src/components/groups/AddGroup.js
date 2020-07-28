import React, { useState } from "react";
import api from "../api";
import FormGroup from "./FormGroup";

export default function AddGroup({ navigation }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitGroup = () => {
    const newGroup = {
      name,
    };
    setLoading(true);
    api
      .post("/groups", newGroup)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        if (err.response) {
          const { response } = err;
          if (response.status === 500) {
            setError("Name is invalid");
          } else {
            setError(response.data.error);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setGroupName = (name) => {
    setName(name);
  };

  return (
    <FormGroup
      error={error}
      loading={loading}
      name={name}
      submitGroup={submitGroup}
      setGroupName={setGroupName}
    />
  );
}
