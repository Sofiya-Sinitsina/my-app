import CartButton from "@/components/cartButton";
import { images, offers } from "@/constants";
import cn from "clsx";
import { Fragment } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-white flex-1">

      <View className="flex-between flex-row w-full mb-2 px-5">
        <View className="flex-start">
          <Text className="text-green-600 bold">DELIVER TO</Text>
          <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
            <Text className="paragraph-bold text-dark-100">Petropavl, KZ</Text>
            <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <CartButton/>
      </View>
      {/* <Image source = {images.avatar} className="w-72 h-72 m-4" />
      <Image source = {images.avocado} className="w-64 h-64 m-4" />
      <Text className="text-3xl text-primary font-quicksand-medium">Edited screen's text.</Text> */}
      {/* <Button title="Seed" onPress={() => seed().catch((error) => console.log("Failed to seed the database", error))} /> */}
      <FlatList
          data = {offers} 
          renderItem={
            ({item, index}) => {

              const isEven:boolean = index % 2 == 0;

              return (
                <View>
                  <Pressable className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')} style={{backgroundColor: item.color}} android_ripple={{ color: "#ffffff" }}>
                    {
                      ({pressed}) => (
                        <Fragment>
                          <View className={"h-full w-1/2"} style={{transform: [{ scale: pressed ? 0.8 : 1 }]}}>
                            <Image source = {item.image} className={"size-full"} resizeMode={"contain"} />
                          </View>

                          <View className={cn("offer-card__info", isEven ? 'pl-10' : 'pr-10')}>
                            <Text>
                              {item.title}
                            </Text>
                            <Image source={images.arrowRight}
                            className="size-10"
                            resizeMode="contain"
                            tintColor="#ffffff"
                            />
                          </View>
                        </Fragment>
                      )
                    }
                  </Pressable>
                </View>
              )
            }
          }
      />
    </SafeAreaView>
  );
}
