import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import cn from "clsx";
import { Image, Text, View } from "react-native";

const CartTabIcon = ({ focused }: { focused: boolean }) => {
    const totalItems = useCartStore((state) => state.getTotalItems());

    return (
        <View className="tab-icon">
            <Image source={images.bag} className="size-7" resizeMode="contain" tintColor={focused ? '#fe8c00' : '#5d5f6d'} />

            {totalItems > 0 && (
                <View className="absolute -top-2 -right-1 bg-primary rounded-full px-1 min-w-[16px] items-center justify-center">
                    <Text className="small-bold next-white">{totalItems}</Text>
                </View>
            )}

            <Text className={cn('text-sm font-bold', focused ? 'text-primary' : 'text-gray-200')}>
                Cart
            </Text>
        </View>
    );
};

export default CartTabIcon;