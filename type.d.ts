import { ImageSourcePropType } from "react-native";
import { Models } from "react-native-appwrite";

export interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    label: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

export interface CustomButtonProps {
    onPress?: () => void;
    title?: string;
    style?: string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
}

export interface CreateUserParams {
    name: string;
    email: string;
    password: string;
}

export interface SignInParams {
    email: string;
    password: string;
}

export interface User extends Models.Document {
    name: string;
    email: string;
    avatar: string;
}

interface TabBarIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
}