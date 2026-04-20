import { useCartStore } from "@/store/cart.store";
import { CartCustomization, MenuItem } from "@/type";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, Text, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  item: MenuItem | null;
  customizations: CartCustomization[];
  loading: boolean;
  onClose: () => void;
}

const CustomizationModal = ({ visible, item, customizations, loading, onClose }: Props) => {
  const { addItem } = useCartStore();
  const [selected, setSelected] = useState<CartCustomization[]>([]);
  useEffect(() => {
    setSelected([]);
    }, [item]);

  const toggle = (c: CartCustomization) => {
    setSelected((prev) =>
      prev.find((x) => x.id === c.id)
        ? prev.filter((x) => x.id !== c.id)
        : [...prev, c]
    );
  };

  const handleAdd = () => {
    if (!item) return;

    addItem({
      id: item.$id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      customizations: selected,
    });

    setSelected([]);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white p-5 rounded-t-2xl">
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <>
                {item && (
                    <>
                    <Image source={{ uri: item.image_url }} className="w-32 h-32 self-center" />
                    <Text className="text-xl font-bold text-center">{item.name}</Text>

                    {customizations.map((c) => {
                        const active = selected.find((x) => x.id === c.id);

                        return (
                        <TouchableOpacity
                            key={c.id}
                            onPress={() => toggle(c)}
                            className={`p-3 mt-2 rounded-lg ${
                            active ? "bg-primary/20" : "bg-gray-100"
                            }`}
                        >
                            <Text>{c.name} (+{c.price}$)</Text>
                        </TouchableOpacity>
                        );
                    })}

                    <TouchableOpacity onPress={handleAdd} className="mt-4 bg-primary p-4 rounded-xl">
                        <Text className="text-white text-center font-bold">Add to cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose}>
                        <Text className="text-center mt-2 text-gray-400">Cancel</Text>
                    </TouchableOpacity>
                    </>
                )}
                </>
            )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomizationModal;