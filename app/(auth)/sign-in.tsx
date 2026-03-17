import { router } from "expo-router"
import React from "react"
import { Button, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SignIn = () => {
    return (
        <SafeAreaView className="flex-center">
            <Text>Sign In</Text>
            <Button title="Sign Up" onPress={() => router.push("/sign-up")}></Button>
        </SafeAreaView>
    )
} 

export default SignIn