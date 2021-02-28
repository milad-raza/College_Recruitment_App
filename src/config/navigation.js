import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Login from "../screens/Login";
import SelectAccountType from "../screens/SelectAccountType";
import Student from "../screens/Student";
import Company from "../screens/Company";
import Admin from "../screens/Admin";


const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Home}
          options={
            // props.login
            //   ?
            //    {
            //       headerTintColor: '#ffffff',
            //       headerRight: () => (
            //         <Icon
            //           name="logout"
            //           size={30}
            //           style={{marginRight: 10}}
            //           color="#fff"
            //           onPress={() => {
            //             logout();
            //           }}
            //         />
            //       ),
            //       headerStyle: {
            //         backgroundColor: '#E6233F',
            //       },
            //     }
            //   :
            { headerShown: false }
          }
        />
        <Stack.Screen
          name="Create An Account As Student"
          component={Student}
          options={{
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#2d2f6a',
            },
          }}
        />
        <Stack.Screen
          name="Create An Account As Company"
          component={Company}
          options={{
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#2d2f6a',
            },
          }}
        />
        <Stack.Screen
          name="Create An Account As Admin"
          component={Admin}
          options={{
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#2d2f6a',
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTintColor: "#ffffff",
            headerStyle: {
              backgroundColor: "#2d2f6a",
            },
          }}
        />
         <Stack.Screen
          name="Select Account Type"
          component={SelectAccountType}
          options={{
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#2d2f6a',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
