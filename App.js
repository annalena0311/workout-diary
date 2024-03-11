import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Settings from './components/Settings';
import Workoutlist from './components/Workoutlist';
import Add from './components/Add';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UnitContext, WorkoutContext } from './contexts/Context';
import { useState } from 'react';
import { IconButton, PaperProvider, Text } from 'react-native-paper';
import { myTheme } from './style/theme';
import { useFonts } from "expo-font";

const Tab = createBottomTabNavigator();

export default function App() {

  const [workouts, setWorkouts] = useState([
    {"date": "29.02.2024", "distance": "20", "duration": "120", "sport": "ski"}, 
    {"date": "3.3.2024", "distance": "10", "duration": "60", "sport": "run"}, 
    {"date": "5.3.2024", "distance": "7", "duration": "43", "sport": "run"}
  ]);
  const [unit, setUnit] = useState("km");

  const [loaded] = useFonts({
    BevanRegular: require("./style/Bevan-Regular.ttf")
  })

  if (!loaded) {
    return (<Text>Loading fonts...</Text>)
  }

  return (
    <PaperProvider theme={myTheme}>
      <WorkoutContext.Provider value={{workouts, setWorkouts}}>
        <UnitContext.Provider value={{unit, setUnit}}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                  let iconName;
              
                  if (route.name === "Add") {
                    iconName = focused
                      ? "plus-box"
                      : "plus-box-outline";
                  } else if (route.name === "Workouts") {
                    iconName = focused
                      ? "clipboard-list"
                      : "clipboard-list-outline"
                  } else if (route.name === "Settings") {
                    iconName = focused
                      ? "cog"
                      : "cog-outline"
                  }
              
                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                },
                headerStyle: {
                  backgroundColor: myTheme.colors.headerBackground,
                },
                tabBarStyle: { 
                  backgroundColor: myTheme.colors.tabBarBackground,
                },
                tabBarActiveTintColor: myTheme.colors.tabBarActive,
                tabBarInactiveTintColor: myTheme.colors.tabBarInactive,
                headerTintColor: myTheme.colors.headerNavigation
              })}
            >
              <Tab.Screen name='Add' component={Add}/>
              <Tab.Screen 
                name='Workouts'
                options={{
                  headerRight: () => {
                    const navigation = useNavigation();
                    return (
                      <IconButton 
                        icon="plus"
                        iconColor={myTheme.colors.headerNavigation}
                        onPress={() => navigation.navigate("Add")}
                      />
                    )
                  }
                }} 
                component={Workoutlist}
              />
              <Tab.Screen name='Settings' component={Settings}/>
            </Tab.Navigator> 
          </NavigationContainer>
        </UnitContext.Provider>
      </WorkoutContext.Provider>
    </PaperProvider>
  );
}