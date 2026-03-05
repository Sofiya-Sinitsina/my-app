import { offers } from "@/constants";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      {/* <Image source = {images.avatar} className="w-72 h-72 m-4" />
      <Image source = {images.avocado} className="w-64 h-64 m-4" />
      <Text className="text-3xl text-primary font-quicksand-medium">Edited screen's text.</Text> */}
      <FlatList
          data = {offers} 
          renderItem={
            ({item, index}) => {
              return (
                <View>
                  <Pressable className="my-3 h-[100px]" style={{backgroundColor: item.color}}>
                    <Text className="mx-auto">{item.title}</Text>
                  </Pressable>
                </View>
              )
            }
          }
      />
    </SafeAreaView>
  );
}
