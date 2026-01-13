import { Tabs } from 'expo-router';
import React from 'react';
import { View, Dimensions } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { Icon } from '@/src/components/icon';
import { Home, Leaf, Wand, Past, Cart } from '@/src/assets/icons';

const icons = {
  home: Home,
  leaf: Leaf,
  wand: Wand,
  past: Past,
  cart: Cart,
};

const { width: screenWidth } = Dimensions.get('window');

function TabBarIcon({ name, focused }: { name: keyof typeof icons; focused: boolean }) {
  return (
    <View
      style={{
        backgroundColor: focused ? 'rgba(226, 222, 210, 0.18)' : 'transparent',
        borderRadius: 25,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
      }}
    >
      <Icon source={icons[name]} size={20} />
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
          bottom: -19,
          left: -4,
          height: 82,
          width: screenWidth + 8,
          borderRadius: 38,
          paddingHorizontal: 10,
        },
        tabBarItemStyle: {
          marginVertical: 0,
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
          tabBarIcon: ({ focused }) => <TabBarIcon name="past" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="shoppingList"
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="cart" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
