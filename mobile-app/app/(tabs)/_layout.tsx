import { Tabs } from 'expo-router';
import React from 'react';
import { View, Image } from 'react-native';
import { Colors } from '@/constants/theme';

const icons = {
  home: require('@/assets/icons/home.png'),
  leaf: require('@/assets/icons/leaf.png'),
  wand: require('@/assets/icons/wand.png'),
  clock: require('@/assets/icons/clock.png'),
  settings: require('@/assets/icons/settings.png'),
};

function TabBarIcon({ name, focused }: { name: keyof typeof icons; focused: boolean }) {
  return (
    <View
      style={{
        backgroundColor: focused ? 'rgba(226, 222, 210, 0.18)' : 'transparent',
        borderRadius: 50,
        padding: focused ? 8 : 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        source={icons[name]}
        style={{
          width: 20,
          height: 20,
          tintColor: Colors.light.background,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.light.icon,
          position: 'absolute',
          bottom: -42,
          height: 96,
          borderRadius: 45,
        },
        tabBarItemStyle: {
          marginVertical: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="ingredients"
        options={{
          title: 'Ingredients',
          tabBarIcon: ({ focused }) => <TabBarIcon name="leaf" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="generateRecipe"
        options={{
          title: 'Generate Recipe',
          tabBarIcon: ({ focused }) => <TabBarIcon name="wand" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="pastRecipes"
        options={{
          title: 'Past Recipes',
          tabBarIcon: ({ focused }) => <TabBarIcon name="clock" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabBarIcon name="settings" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
