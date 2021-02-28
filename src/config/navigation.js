import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Login from "../screens/Login";
import SelectAccountType from "../screens/SelectAccountType";
import Student from "../screens/Student";
import Company from "../screens/Company";
import Admin from "../screens/Admin";
import Icon from 'react-native-vector-icons/MaterialIcons';
import StudentDashboard from '../screens/StudentDashboard';
import CompanyDashboard from '../screens/CompanyDashboard';
import AdminDashboard from '../screens/AdminDashboard'
import auth from '@react-native-firebase/auth';
import changeLogin from "../store/Actions/LoginAction";
import { connect } from "react-redux";
import StudentProfile from '../screens/StudentProfile';
import StudentUpdateProfile from '../screens/StudentUpdateProfile'
import StudentViewAllCompanies from '../screens/StudetViewAllCompanies';
import CompanyViewAllStudents from "../screens/CompanyViewAllStudents";
import AdminViewAllCompanies from "../screens/AdminViewAllCompanies";
import AdminViewAllStudents from "../screens/AdminViewAllStudents";




const Stack = createStackNavigator();

function AppNavigation(props) {


  const logout = () => {
    console.log(props)
    props.ChangeLogin(false)
    
    auth().signOut().then(
      
    )
    .catch(null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={
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
         <Stack.Screen
          name="Student Dashboard"
          component={StudentDashboard}
          navigationOptions= {{
            title: 'Title',
            swipeEnabled: false,
            gesturesEnabled: false,
          }
         }
          options={
             {
                  headerTintColor: '#ffffff',
                  headerRight: () => (
                    <Icon
                      name="logout"
                      size={30}
                      style={{marginRight: 10}}
                      color="#fff"
                      onPress={() => {
                        logout();
                      }}
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#2d2f6a',
                  },
                  headerLeft: null,
                  swipeEnabled: false,
                  gesturesEnabled: false,
                }
          }
        />
         <Stack.Screen
          name="Admin Dashboard"
          component={AdminDashboard}
          options={
             {
                  headerTintColor: '#ffffff',
                  headerRight: () => (
                    <Icon
                      name="logout"
                      size={30}
                      style={{marginRight: 10}}
                      color="#fff"
                      onPress={() => {
                        logout();
                      }}
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#2d2f6a',
                  },
                  headerLeft: null,
                  swipeEnabled: false,
                  gesturesEnabled: false,
                }
          }
        />
         <Stack.Screen
          name="Company Dashboard"
          component={CompanyDashboard}
          options={
             {
                  headerTintColor: '#ffffff',
                  headerRight: () => (
                    <Icon
                      name="logout"
                      size={30}
                      style={{marginRight: 10}}
                      color="#fff"
                      onPress={() => {
                        logout();
                      }}
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#2d2f6a',
                  },
                  headerLeft: null,
                  gesturesEnabled: false,
                }
          }
        />
         <Stack.Screen
          name="Student Profile"
          component={StudentProfile}
          options={
             {
                  headerTintColor: '#ffffff',
                  headerRight: () => (
                    <Icon
                      name="logout"
                      size={30}
                      style={{marginRight: 10}}
                      color="#fff"
                      onPress={() => {
                        logout();
                      }}
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#2d2f6a',
                  },
                }
          }
        />
         <Stack.Screen
          name="Student Update Profile"
          component={StudentUpdateProfile}
          options={
             {
                  headerTintColor: '#ffffff',
                  headerRight: () => (
                    <Icon
                      name="logout"
                      size={30}
                      style={{marginRight: 10}}
                      color="#fff"
                      onPress={() => {
                        logout();
                      }}
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#2d2f6a',
                  },
                }
          }
        />
        <Stack.Screen
          name="All Companies"
          component={StudentViewAllCompanies}
          options={
             {
                  headerTintColor: '#ffffff',
                  headerRight: () => (
                    <Icon
                      name="logout"
                      size={30}
                      style={{marginRight: 10}}
                      color="#fff"
                      onPress={() => {
                        logout();
                      }}
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#2d2f6a',
                  },
                }
          }
        />
         <Stack.Screen
          name="All Students Details"
          component={CompanyViewAllStudents}
          options={
             {
                  headerTintColor: '#ffffff',
                  headerRight: () => (
                    <Icon
                      name="logout"
                      size={30}
                      style={{marginRight: 10}}
                      color="#fff"
                      onPress={() => {
                        logout();
                      }}
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#2d2f6a',
                  },
                }
          }
        />
        <Stack.Screen
          name="All Students Details "
          component={AdminViewAllStudents}
          options={
             {
                  headerTintColor: '#ffffff',
                  headerRight: () => (
                    <Icon
                      name="logout"
                      size={30}
                      style={{marginRight: 10}}
                      color="#fff"
                      onPress={() => {
                        logout();
                      }}
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#2d2f6a',
                  },
                }
          }
        />
         <Stack.Screen
          name="All Companies Details"
          component={AdminViewAllCompanies}
          options={
             {
                  headerTintColor: '#ffffff',
                  headerRight: () => (
                    <Icon
                      name="logout"
                      size={30}
                      style={{marginRight: 10}}
                      color="#fff"
                      onPress={() => {
                        logout();
                      }}
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#2d2f6a',
                  },
                }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




const mapStateToProps = (state) => ({
  login: state.Login.login,
});

const mapDispatchToProp = (dispatch) => ({
  ChangeLogin: (login) => dispatch(changeLogin(login)),
});

export default connect(mapStateToProps, mapDispatchToProp)(AppNavigation);