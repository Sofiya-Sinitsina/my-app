import { images } from "@/constants";
import { Image, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-100">
      <Image source = {images.avatar} className="w-72 h-72 m-4" />
      <Image source = {images.avocado} className="w-64 h-64 m-4" />
      <Text className="text-3xl text-primary font-quicksand-medium">Edited screen's text.</Text>
    </View>
  );
}
