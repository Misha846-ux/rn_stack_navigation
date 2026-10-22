import { useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useProductStore } from "../store/useProductStore";

type Props = NativeStackScreenProps<RootStackParamList, "ShopSecond">;

const FALLBACK_PRODUCT = {
    id: "minimalist-sneakers",
    name: "Minimalist Sneakers",
    price: "$160.00",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1000",
    description:
        "High-quality visual, meat, consectetur adipiscing sit. Discorosscus shomoni, and mansions, insititation, and more.",
    rating: 4.8,
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["#e5e9e7", "#ffffff", "#cbd0d0", "#303538"],
};

export const ShopSecondScreen = ({ navigation, route }: Props) => {
    const product = route.params.product ?? FALLBACK_PRODUCT;
    const addToCart = useProductStore((state) => state.addToCart);
    const favorites = useProductStore((state) => state.favorites);
    const toggleFavorite = useProductStore((state) => state.toggleFavorite);
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] ?? "M");
    const [selectedColor, setSelectedColor] = useState(0);
    const isFavorite = favorites.some((favorite) => favorite.productId === product.id);

    const openBag = () => {
        addToCart(product, selectedSize);
        navigation.navigate("ShopThird");
    };

    const handleToggleFavorite = async () => {
        try {
            await toggleFavorite(product);
        } catch (favoriteError: unknown) {
            Alert.alert(
                "Не вдалося оновити улюблені",
                favoriteError instanceof Error ? favoriteError.message : "Спробуйте ще раз."
            );
        }
    };

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            <View style={styles.imagePanel}>
                <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />
                <View style={styles.topBar}>
                    <Pressable style={styles.iconButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={23} color="#263638" />
                    </Pressable>
                    <View style={styles.topActions}>
                        <Pressable
                            style={styles.iconButton}
                            accessibilityRole="button"
                            accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            onPress={() => void handleToggleFavorite()}
                        >
                            <Ionicons
                                name={isFavorite ? "heart" : "heart-outline"}
                                size={23}
                                color={isFavorite ? "#d45d66" : "#263638"}
                            />
                        </Pressable>
                        <Pressable style={styles.iconButton} accessibilityLabel="Share product">
                            <Ionicons name="share-outline" size={22} color="#263638" />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.dots}>
                    {[0, 1, 2, 3].map((dot) => (
                        <View key={dot} style={[styles.dot, dot === 0 && styles.activeDot]} />
                    ))}
                </View>
            </View>

            <View style={styles.details}>
                <View style={styles.titleRow}>
                    <Text style={styles.name}>{product.name.toUpperCase()}</Text>
                    <View style={styles.rating}>
                        <Ionicons name="star" size={15} color="#d4a72c" />
                        <Text style={styles.ratingText}>{product.rating ?? "4.8"}</Text>
                    </View>
                </View>
                <Text style={styles.price}>{product.price}</Text>
                <Text style={styles.description}>
                    {product.description ?? "A timeless everyday essential, carefully made with quality materials and a comfortable fit."}
                </Text>

                <Text style={styles.optionTitle}>Size</Text>
                <View style={styles.options}>
                    {(product.sizes ?? ["XS", "S", "M", "L", "XL"]).map((size) => (
                        <Pressable
                            key={size}
                            onPress={() => setSelectedSize(size)}
                            style={[styles.sizeOption, selectedSize === size && styles.selectedSize]}
                        >
                            <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>
                                {size}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <Text style={styles.optionTitle}>Color</Text>
                <View style={styles.colors}>
                    {(product.colors ?? ["#e5e9e7", "#ffffff", "#cbd0d0", "#303538"]).map((color, index) => (
                        <Pressable
                            key={color}
                            accessibilityLabel={`Color ${index + 1}`}
                            onPress={() => setSelectedColor(index)}
                            style={[styles.colorOption, { backgroundColor: color }, selectedColor === index && styles.selectedColor]}
                        />
                    ))}
                </View>

                <View style={styles.buttons}>
                    <Pressable style={styles.primaryButton} onPress={openBag}>
                        <Text style={styles.primaryButtonText}>ADD TO BAG</Text>
                    </Pressable>
                    <Pressable style={styles.secondaryButton} onPress={openBag}>
                        <Text style={styles.secondaryButtonText}>BUY NOW</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f6fbfa",
    },
    content: {
        flexGrow: 1,
    },
    imagePanel: {
        height: 350,
        backgroundColor: "#e8efee",
        justifyContent: "center",
    },
    productImage: {
        width: "100%",
        height: "100%",
    },
    topBar: {
        position: "absolute",
        top: 18,
        left: 18,
        right: 18,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    topActions: {
        flexDirection: "row",
        gap: 12,
    },
    iconButton: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "rgba(246, 251, 250, 0.82)",
    },
    dots: {
        position: "absolute",
        bottom: 14,
        alignSelf: "center",
        flexDirection: "row",
        gap: 7,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#b3c3c1",
    },
    activeDot: {
        backgroundColor: "#273c3d",
    },
    details: {
        paddingHorizontal: 22,
        paddingTop: 18,
        paddingBottom: 28,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    name: {
        flex: 1,
        color: "#182528",
        fontSize: 19,
        fontWeight: "800",
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    ratingText: {
        color: "#182528",
        fontSize: 14,
        fontWeight: "600",
    },
    price: {
        color: "#63a99e",
        fontSize: 21,
        fontWeight: "700",
        marginTop: 3,
    },
    description: {
        color: "#465456",
        fontSize: 13,
        lineHeight: 18,
        marginTop: 9,
    },
    optionTitle: {
        color: "#263638",
        fontSize: 14,
        fontWeight: "700",
        marginTop: 15,
        marginBottom: 7,
    },
    options: {
        flexDirection: "row",
        gap: 8,
    },
    sizeOption: {
        width: 38,
        height: 34,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "#d4dddd",
        backgroundColor: "#f6fbfa",
        alignItems: "center",
        justifyContent: "center",
    },
    selectedSize: {
        backgroundColor: "#63a99e",
        borderColor: "#63a99e",
    },
    sizeText: {
        color: "#263638",
        fontSize: 13,
    },
    selectedSizeText: {
        color: "#ffffff",
        fontWeight: "700",
    },
    colors: {
        flexDirection: "row",
        gap: 9,
    },
    colorOption: {
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#c5cfce",
    },
    selectedColor: {
        borderColor: "#263638",
        borderWidth: 2,
    },
    buttons: {
        flexDirection: "row",
        gap: 10,
        marginTop: 18,
    },
    primaryButton: {
        flex: 1,
        height: 46,
        borderRadius: 24,
        backgroundColor: "#63a99e",
        alignItems: "center",
        justifyContent: "center",
    },
    primaryButtonText: {
        color: "#ffffff",
        fontSize: 13,
        fontWeight: "700",
    },
    secondaryButton: {
        flex: 1,
        height: 46,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#63a99e",
        alignItems: "center",
        justifyContent: "center",
    },
    secondaryButtonText: {
        color: "#397d74",
        fontSize: 13,
        fontWeight: "700",
    },
});