import React from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Animated } from 'react-native'
import { createBottomTabNavigator, BottomTabBar, BottomTabBarButtonProps, BottomTabBarProps } from "@react-navigation/bottom-tabs"
import Home from '../screens/Home';
import { COLORS, icons } from "../constants"
import { isIphoneX } from 'react-native-iphone-x-helper'

const Tab = createBottomTabNavigator()

const TabBarCustomButton = (props: BottomTabBarButtonProps) => {
    let isSelected = props.accessibilityState?.selected
    let animatedBottomValue = new Animated.Value(0)

    if (isSelected) {
        Animated.timing(animatedBottomValue, { toValue: 20, useNativeDriver: false, duration: 400 }).start()
        return (
            <Animated.View style={[styles.customTabBarButtonSection, { bottom: animatedBottomValue }]}>
                <TouchableOpacity
                    onPress={props.onPress}>
                    {props.children}
                </TouchableOpacity>
            </Animated.View>
        )
    }
    else {
        return (
            <TouchableOpacity
                style={styles.otherCustomBarButton}
                activeOpacity={1}
                onPress={props.onPress}>
                {props.children}
            </TouchableOpacity>
        )
    }
}

const CustomTabBar = (props: BottomTabBarProps) => {
    if (isIphoneX()) {
        return (
            <View>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 30,
                    backgroundColor: COLORS.white
                }}>
                </View>
                <BottomTabBar {...props} />
            </View>
        )
    }
    else {
        return (<BottomTabBar {...props} />)
    }
}

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}
            tabBar={(props) => (
                <CustomTabBar {...props} />
            )}>
            <Tab.Screen name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.cutlery}
                            resizeMode="contain"
                            style={[styles.image, focused ? { tintColor: COLORS.primary } : { tintColor: COLORS.secondary }]} />),
                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} />
                    )
                }}
            />
            <Tab.Screen name='Search'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={[styles.image, focused ? { tintColor: COLORS.primary } : { tintColor: COLORS.secondary }]} />),
                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} />
                    )
                }}
            />
            <Tab.Screen name='Like'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.like}
                            resizeMode="contain"
                            style={[styles.image, focused ? { tintColor: COLORS.primary } : { tintColor: COLORS.secondary }]} />),
                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} />
                    )
                }}
            />
            <Tab.Screen name='User'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={[styles.image, focused ? { tintColor: COLORS.primary } : { tintColor: COLORS.secondary }]} />),
                    tabBarButton: (props) => (
                        <TabBarCustomButton {...props} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25,
    },
    customTabBarButtonSection: {
        backgroundColor: COLORS.white,
        flex: 1,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderBottomWidth: 0.5
    },
    otherCustomBarButton: {
        flex: 1,
        height: 55,
        backgroundColor: COLORS.white
    }
})