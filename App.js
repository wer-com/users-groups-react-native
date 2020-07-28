import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/components/navigation/Home";
import Users from "./src/components/users/Users";
import User from "./src/components/users/User";
import AddUser from "./src/components/users/AddUser";
import EditUser from "./src/components/users/EditUser";
import Groups from "./src/components/groups/Groups";
import Group from "./src/components/groups/Group";
import EditGroup from "./src/components/groups/EditGroup";
import AddGroup from "./src/components/groups/AddGroup";
import AddUserToGroup from "./src/components/groups/AddUserToGroup";
import { YellowBox } from "react-native";
const Stack = createStackNavigator();

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="EditUser" component={EditUser} />
        <Stack.Screen name="Groups" component={Groups} />
        <Stack.Screen name="Group" component={Group} />
        <Stack.Screen name="AddGroup" component={AddGroup} />
        <Stack.Screen name="EditGroup" component={EditGroup} />
        <Stack.Screen name="AddUserToGroup" component={AddUserToGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
