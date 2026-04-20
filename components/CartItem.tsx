import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartItem = ({ item }: { item: CartItemType }) => {
    const { increaseQty, decreaseQty, removeItem } = useCartStore();

    const customizationsPrice =
        item.customizations?.reduce((sum, c) => sum + Number(c.price || 0), 0) ?? 0;

    const totalPrice = item.price + customizationsPrice;

    return (
        <View className="cart-item">
            <View className="flex flex-row items-center gap-x-3">
                <View className="cart-item__image">
                    <Image
                        source={{ uri: item.image_url }}
                        className="size-4/5 rounded-lg"
                        resizeMode="cover"
                    />
                </View>

                <View>
                    <Text className="base-bold text-dark-100">{item.name}</Text>
                    {item.customizations && item.customizations.length > 0 && (
                        <View className="mt-1">
                            {item.customizations.map((c) => (
                                <Text key={c.id} className="text-xs text-gray-500">
                                    + {c.name}
                                </Text>
                            ))}
                        </View>
                    )}
                    
                    <Text className="paragraph-bold text-primary mt-1">
                        ${totalPrice.toFixed(2)}
                    </Text>
                    {customizationsPrice > 0 && (
                        <Text className="text-xs text-gray-400">
                            base ${item.price} + extras ${customizationsPrice}
                        </Text>
                    )}

                    <View className="flex flex-row items-center gap-x-4 mt-2">
                        <TouchableOpacity
                            onPress={() => decreaseQty(item.id, item.customizations ?? [])}
                            className="cart-item__actions"
                        >
                            <Image
                                source={images.minus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>

                        <Text className="base-bold text-dark-100">{item.quantity}</Text>

                        <TouchableOpacity
                            onPress={() => increaseQty(item.id, item.customizations ?? [])}
                            className="cart-item__actions"
                        >
                            <Image
                                source={images.plus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => removeItem(item.id, item.customizations ?? [])}
                className="flex-center"
            >
                <Image source={images.trash} className="size-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default CartItem;