import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import FinancesScreen from './screens/FinancesScreen';
import AddEventScreen from './screens/AddEventScreen';
import CalendarScreen from './screens/CalendarScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Finances') {
          iconName = 'money';
        } else if (route.name === 'Add Event') {
          iconName = 'calendar-plus-o';
        } else if (route.name === 'Calendar') {
          iconName = 'calendar';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarLabel: () => null, // This will hide the label
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Finances" component={FinancesScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Add Event" component={AddEventScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }}/>
  </Tab.Navigator>
);


const App = () => {
  return (
    <>
    <StatusBar hidden={true} />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={TabNavigator} 
          options={({ navigation }) => ({
            title: '', // This will remove the "Home" title
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Icon name="gear" size={30} color="#000" style={{ marginRight: 10 }} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;