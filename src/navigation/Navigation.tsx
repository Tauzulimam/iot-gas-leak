import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icon library


const Stack = createStackNavigator();

const Navigation = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Gas Leak App",
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Setting")}
              >
                <Ionicons name="settings-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Setting" component={SettingScreen} />
      </Stack.Navigator>
  );
};

export default Navigation;
