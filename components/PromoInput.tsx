import { Text, TextInput, TouchableOpacity, View } from "react-native";

const PromoInput = ({
    promo,
    setPromo,
    applyPromo,
    loadingPromo,
}: any) => {
    return (
        <View className="flex-row items-center gap-2 mt-3">
            <TextInput
                value={promo}
                onChangeText={setPromo}
                placeholder="Promo code"
                className="flex-1 border border-gray-300 p-3 rounded-lg"
            />

            <TouchableOpacity
                onPress={applyPromo}
                disabled={loadingPromo}
                className="bg-primary px-4 py-3 rounded-lg"
            >
                <Text className="text-white font-semibold">
                    {loadingPromo ? "..." : "Apply"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PromoInput;