import { Tabs } from 'expo-router';
import React from 'react';
import { View, Image } from 'react-native';
import { Colors } from '@/constants/theme';
import HomeIcon from '@/assets/icons/home.png';
import LeafIcon from '@/assets/icons/leaf.png';
import WandIcon from '@/assets/icons/wand.png';
import ClockIcon from '@/assets/icons/clock.png';
import SettingsIcon from '@/assets/icons/settings.png';

const icons = {
  home: HomeIcon,
  leaf: LeafIcon,
  wand: WandIcon,
  clock: ClockIcon,
  settings: SettingsIcon,
};

function TabBarIcon({ name, focused }: { name: keyof typeof icons; focused: boolean }) {
  return (
    <View
      style={{
        backgroundColor: focused ? 'rgba(226, 222, 210, 0.18)' : 'transparent',
        borderRadius: 50,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        source={icons[name]}
        style={{
          width: 20,
          height: 20,
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
        name="home"
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="ingredients"
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="leaf" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="generateRecipe"
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="wand" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="pastRecipes"
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="clock" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="settings" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
