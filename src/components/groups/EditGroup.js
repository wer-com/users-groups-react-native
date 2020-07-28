import React, { useState } from "react";
import api from "../api";
import FormGroup from "./FormGroup";

export default function EditGroup({ navigation, route }) {
  const { groupId, groupName } = route.params;
  const [name, setName] = useState(groupName);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitGroup = () => {
    const editedGroup = {
      name,
    };
    setLoading(true);
    api
      .put(`/groups/${groupId}`, editedGroup)
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
      edit={true}
    />
  );
}
