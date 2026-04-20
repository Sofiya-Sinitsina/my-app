import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { useCartStore } from "@/store/cart.store";
import { PaymentInfoStripeProps } from '@/type';
import cn from "clsx";
import { router } from "expo-router";
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentInfoStripe = ({ label,  value,  labelStyle,  valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const Cart = () => {
    const items = useCartStore((state) => state.items);

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = items.reduce((total, item) => {
        const base = item.price;
        const customPrice =
            item.customizations?.reduce((s, c) => s + c.price, 0) ?? 0;
        return total + item.quantity * (base + customPrice);
    }, 0);

    const getDiscountRate = (total: number) => {
        if (total >= 500) return 0.5;
        if (total >= 300) return 0.2;
        if (total >= 200) return 0.1;
        if (total >= 100) return 0.05;
        return 0.01;
    };

    const discountRate = getDiscountRate(totalPrice);
    const discountAmount = totalPrice * discountRate;
    const finalPrice = totalPrice + 5 - discountAmount;

    const clearCart = useCartStore((state) => state.clearCart);
    const handleClearCart = () => {
        Alert.alert(
            "Clear cart?",
            "All items will be removed",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Yes", style: "destructive", onPress: clearCart }
            ]
        );
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={items}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(item) =>
                    `${item.id}-${(item.customizations ?? [])
                        .map((c) => c.id)
                        .sort()
                        .join("-")}`}
                contentContainerClassName="pb-28 px-5 pt-5"
                ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
                ListEmptyComponent={() => (
                    <TouchableOpacity
                        onPress={() => router.push("/search")}
                        className="flex-1 items-center justify-center mt-20 gap-2"
                    >
                        <Text className="text-dark-100 text-lg font-semibold">
                            Your cart is empty
                        </Text>

                        <Text className="text-primary text-base">
                            Search now →
                        </Text>
                    </TouchableOpacity>
                )}
                ListFooterComponent={() => totalItems > 0 && (
                    <View className="gap-5">
                        <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                            <Text className="h3-bold text-dark-100 mb-5">
                                Payment Summary
                            </Text>

                            <PaymentInfoStripe
                                label={`Total Items (${totalItems})`}
                                value={`$${totalPrice.toFixed(2)}`}
                            />
                        
                            <PaymentInfoStripe
                                label={`Discount (${(discountRate * 100)}%)`}
                                value={`- $${discountAmount.toFixed(2)}`}
                                valueStyle="!text-success"
                            />

                            <PaymentInfoStripe
                                label={`Delivery Fee`}
                                value={`$5.00`}
                            />
                            
                            <View className="border-t border-gray-300 my-2" />
                            <PaymentInfoStripe
                                label={`Total`}
                                value={`$${finalPrice.toFixed(2)}`}
                                labelStyle="base-bold !text-dark-100"
                                valueStyle="base-bold !text-dark-100 !text-right"
                            />
                        </View>

                        <TouchableOpacity onPress={handleClearCart}>
                            <Text className="text-red-700 text-center border border-dashed border-red-700 rounded-full p-3 w-full flex flex-row justify-center mt-4">
                                Clear cart
                            </Text>
                        </TouchableOpacity>
                        <CustomButton title="Order Now" />
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Cart