import { Slot } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function _Layout() {
    return (
        <View>
            <Text className="text-blue-500">Layout Auth</Text>
            <Slot/>
        </View>
    )
}