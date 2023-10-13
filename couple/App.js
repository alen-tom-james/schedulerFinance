import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import FinancesScreen from './screens/FinancesScreen';
import AddEventScreen from './screens/AddEventScreen';
import CalendarScreen from './screens/CalendarScreen'; // Ensure path is correct
import SettingsScreen from './screens/SettingsScreen';
import React, { useState, useRef, useEffect, useContext } from 'react';

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
      tabBarLabel: () => null,
      tabBarActiveTintColor: "lightblue",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: [{
        display: "flex"
      }, null ],

      tabBarLabel: () => null,
      "tabBarActiveTintColor": "tomato",
      "tabBarInactiveTintColor": "gray",
      "tabBarStyle": [
        {
          "display": "flex"
        },
        null
      ] // This will hide the label
    })}
  >
    <Tab.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Finances" component={FinancesScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Add Event" component={AddEventScreen} options={{ headerShown: false }}/>
  </Tab.Navigator>
);

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={TabNavigator} 
            options={({ navigation }) => ({
              title: '',
              headerLeft: () => (
                <TouchableOpacity onPress={() => setSelectedDate(new Date())}>
                  <Icon name="calendar" size={30} color="#000" style={{ 
                    marginLeft: 12,
                    opacity: .5,
                    bottom: 14
                  }} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                  <Icon name="gear" size={30} color="#000" style={{ 
                    marginRight: 12,
                    opacity: .5,
                    bottom: 14
                  }} />
                </TouchableOpacity>
              ),
              headerTransparent: true,     
            })}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DateContext.Provider>
  );
};

export default App;
