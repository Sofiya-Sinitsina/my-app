import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import PromoInput from "@/components/PromoInput";
import { getPromoCode } from "@/lib/appwrite";
import { useCartStore } from "@/store/cart.store";
import { PaymentInfoStripeProps } from '@/type';
import cn from "clsx";
import { router } from "expo-router";
import { useEffect, useState } from "react";
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

    const [promo, setPromo] = useState("");
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
    const [loadingPromo, setLoadingPromo] = useState(false);
    const applyPromo = async () => {
        const code = promo.trim().toUpperCase();

        if (!code) return;

        if (appliedPromo === code) {
            Alert.alert("Promo already applied");
            return;
        }

        setLoadingPromo(true);

        try {
            const data = await getPromoCode(code);

            if (!data) {
                setPromoDiscount(0);
                setAppliedPromo(null);
                Alert.alert("Invalid promo code");
                return;
            }

            setPromoDiscount(data.discount);
            setAppliedPromo(code);

            Alert.alert("Promo applied!");
        } catch (e) {
            console.log("PROMO ERROR:", e);
            Alert.alert("Error applying promo");
        } finally {
            setLoadingPromo(false);
        }
    };

    const discountRate = getDiscountRate(totalPrice);
    const discountAmount = totalPrice * discountRate + totalPrice * promoDiscount;
    const finalPrice = totalPrice + 5 - discountAmount;

    useEffect(() => {
        if (items.length === 0) {
            setPromo("");
            setPromoDiscount(0);
            setAppliedPromo(null);
        }
    }, [items]);

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
                                label={`Delivery Fee`}
                                value={`$5.00`}
                            />
                        
                            <PaymentInfoStripe
                                label={`Discount (${discountRate > 0 ? "-" : "+"}${Math.abs(discountRate * 100).toFixed(0)}%)`}
                                value={`${discountAmount > 0 ? "-" : "+"} $${Math.abs(totalPrice * discountRate).toFixed(2)}`}
                                valueStyle="!text-success"
                            />

                            {promoDiscount != 0 && (
                                <PaymentInfoStripe
                                    label={`Promo ${appliedPromo} (${promoDiscount > 0 ? "-" : "+"} $${Math.abs((promoDiscount * 100)).toFixed(0)}%)`}
                                    value={`${promoDiscount > 0 ? "-" : "+"} $${Math.abs((totalPrice * promoDiscount)).toFixed(2)}`}
                                    valueStyle="!text-success"
                                />
                            )}

                            <PromoInput
                                promo={promo}
                                setPromo={setPromo}
                                applyPromo={applyPromo}
                                loadingPromo={loadingPromo}
                            />
                            

                            {appliedPromo && (
                                <Text className="text-success mt-2">
                                    Promo "{appliedPromo}" applied
                                </Text>
                            )}
                            
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