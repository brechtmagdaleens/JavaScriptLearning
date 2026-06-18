import React from 'react';
import { StatusBar, Platform, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import PregnancyScreen from './src/screens/PregnancyScreen';
import ContractionTimerScreen from './src/screens/ContractionTimerScreen';
import FeedingTrackerScreen from './src/screens/FeedingTrackerScreen';
import BabyDevelopmentScreen from './src/screens/BabyDevelopmentScreen';

const Tab = createBottomTabNavigator();

const PINK = '#E91E8C';
const PURPLE = '#7B1FA2';
const INACTIVE = '#BDBDBD';

function TabIcon({ emoji, label, focused, color }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 4 }}>
      <Text style={{ fontSize: focused ? 26 : 22 }}>{emoji}</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: PINK,
            tabBarInactiveTintColor: INACTIVE,
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopColor: '#f0f0f0',
              borderTopWidth: 1,
              height: Platform.OS === 'ios' ? 85 : 65,
              paddingBottom: Platform.OS === 'ios' ? 24 : 8,
              paddingTop: 6,
              elevation: 8,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: -2 },
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
              marginTop: 2,
            },
          }}
        >
          <Tab.Screen
            name="Zwangerschap"
            component={PregnancyScreen}
            options={{
              tabBarLabel: 'Zwangerschap',
              tabBarIcon: ({ focused, color }) => (
                <TabIcon emoji="🤰" label="Zwangerschap" focused={focused} color={color} />
              ),
              tabBarActiveTintColor: PINK,
            }}
          />
          <Tab.Screen
            name="Weeëntimer"
            component={ContractionTimerScreen}
            options={{
              tabBarLabel: 'Weeëntimer',
              tabBarIcon: ({ focused, color }) => (
                <TabIcon emoji="⏱️" label="Weeëntimer" focused={focused} color={color} />
              ),
              tabBarActiveTintColor: '#E53935',
            }}
          />
          <Tab.Screen
            name="Voeding"
            component={FeedingTrackerScreen}
            options={{
              tabBarLabel: 'Voeding',
              tabBarIcon: ({ focused, color }) => (
                <TabIcon emoji="🍼" label="Voeding" focused={focused} color={color} />
              ),
              tabBarActiveTintColor: '#1976D2',
            }}
          />
          <Tab.Screen
            name="Ontwikkeling"
            component={BabyDevelopmentScreen}
            options={{
              tabBarLabel: 'Ontwikkeling',
              tabBarIcon: ({ focused, color }) => (
                <TabIcon emoji="👶" label="Ontwikkeling" focused={focused} color={color} />
              ),
              tabBarActiveTintColor: PURPLE,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
