import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/components/navigation/Home";
import Users from "./src/components/users/Users";
import User from "./src/components/users/User";
import AddUser from "./src/components/users/AddUser";
import Groups from "./src/components/groups/Groups";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="Groups" component={Groups} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
