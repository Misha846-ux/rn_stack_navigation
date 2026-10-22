import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useProductStore } from "../store/useProductStore";

type Props = NativeStackScreenProps<RootStackParamList, "ShopThird">;

const SHIPPING = 15;
const TAX_RATE = 0.05;

function getPrice(price: string): number {
    return Number(price.replace(/[^0-9.]/g, "")) || 0;
}

function formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
}

export const ShopThirdScreen = ({ navigation }: Props) => {
    const cart = useProductStore((state) => state.cart);
    const setCartQuantity = useProductStore((state) => state.setCartQuantity);
    const clearCart = useProductStore((state) => state.clearCart);
    const subtotal = cart.reduce((total, item) => total + getPrice(item.product.price) * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + (cart.length > 0 ? SHIPPING : 0) + tax;

    const placeOrder = () => {
        Alert.alert("Заказ оформлен", `Итого: ${formatPrice(total)}`);
        clearCart();
        navigation.popToTop();
    };

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={23} color="#263638" />
                </Pressable>
                <Text style={styles.headerTitle}>YOUR BAG</Text>
                <View style={styles.headerSpace} />
            </View>

            {cart.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="bag-outline" size={46} color="#83aaa5" />
                    <Text style={styles.emptyTitle}>Your bag is empty</Text>
                    <Text style={styles.emptyDescription}>Add something you love from the shop.</Text>
                    <Pressable style={styles.shopButton} onPress={() => navigation.popToTop()}>
                        <Text style={styles.placeOrderText}>CONTINUE SHOPPING</Text>
                    </Pressable>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
                    <View style={styles.items}>
                        {cart.map(({ product, quantity, size }) => (
                            <View key={`${product.id}-${size}`} style={styles.itemRow}>
                                <Image source={{ uri: product.image }} style={styles.itemImage} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName} numberOfLines={2}>
                                        {product.name.toUpperCase()}
                                    </Text>
                                    <Text style={styles.itemVariant}>Size {size}</Text>
                                    <Text style={styles.itemPrice}>{product.price}</Text>
                                </View>
                                <View style={styles.quantityControl}>
                                    <Pressable
                                        accessibilityLabel={`Decrease quantity of ${product.name}`}
                                        onPress={() => setCartQuantity(product.id, size, quantity - 1)}
                                    >
                                        <Ionicons name="remove" size={15} color="#536568" />
                                    </Pressable>
                                    <Text style={styles.quantity}>{quantity}</Text>
                                    <Pressable
                                        accessibilityLabel={`Increase quantity of ${product.name}`}
                                        onPress={() => setCartQuantity(product.id, size, quantity + 1)}
                                    >
                                        <Ionicons name="add" size={15} color="#536568" />
                                    </Pressable>
                                </View>
                            </View>
                        ))}
                    </View>

                    <Pressable style={styles.infoRow}>
                        <View>
                            <Text style={styles.sectionTitle}>Shipping Address</Text>
                            <Text style={styles.address}>Eliza Reed{"\n"}45 Bright St, NYC</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#5a696b" />
                    </Pressable>
                    <Pressable style={styles.infoRow}>
                        <View>
                            <Text style={styles.sectionTitle}>Payment Method</Text>
                            <View style={styles.payment}>
                                <Text style={styles.visa}>VISA</Text>
                                <Text style={styles.address}>Visa **** 7890</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#5a696b" />
                    </Pressable>

                    <View style={styles.summary}>
                        <Text style={styles.sectionTitle}>Order Summary</Text>
                        <View style={styles.summaryLine}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
                        </View>
                        <View style={styles.summaryLine}>
                            <Text style={styles.summaryLabel}>Shipping</Text>
                            <Text style={styles.summaryValue}>{formatPrice(SHIPPING)}</Text>
                        </View>
                        <View style={styles.summaryLine}>
                            <Text style={styles.summaryLabel}>Tax</Text>
                            <Text style={styles.summaryValue}>{formatPrice(tax)}</Text>
                        </View>
                        <View style={[styles.summaryLine, styles.totalLine]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
                        </View>
                    </View>

                    <Pressable style={styles.placeOrderButton} onPress={placeOrder}>
                        <Text style={styles.placeOrderText}>PLACE ORDER - {formatPrice(total)}</Text>
                    </Pressable>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f6fbfa",
        paddingHorizontal: 20,
    },
    header: {
        height: 62,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#dce5e4",
    },
    backButton: {
        width: 32,
    },
    headerTitle: {
        color: "#182528",
        fontSize: 17,
        fontWeight: "800",
        letterSpacing: 0.4,
    },
    headerSpace: {
        width: 32,
    },
    body: {
        paddingBottom: 22,
    },
    items: {
        marginBottom: 8,
    },
    itemRow: {
        minHeight: 85,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#dce5e4",
        paddingVertical: 9,
        gap: 9,
    },
    itemImage: {
        width: 58,
        height: 58,
        borderRadius: 8,
        backgroundColor: "#e5eceb",
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        color: "#263638",
        fontSize: 12,
        fontWeight: "700",
    },
    itemVariant: {
        color: "#536568",
        fontSize: 11,
        marginTop: 2,
    },
    itemPrice: {
        color: "#182528",
        fontSize: 12,
        fontWeight: "700",
        marginTop: 3,
    },
    quantityControl: {
        minWidth: 64,
        height: 28,
        borderRadius: 7,
        backgroundColor: "#e4eceb",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    quantity: {
        color: "#263638",
        fontSize: 12,
    },
    infoRow: {
        minHeight: 72,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#dce5e4",
        paddingVertical: 11,
    },
    sectionTitle: {
        color: "#263638",
        fontSize: 14,
        fontWeight: "700",
    },
    address: {
        color: "#3f4e50",
        fontSize: 12,
        lineHeight: 16,
        marginTop: 3,
    },
    payment: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    visa: {
        color: "#ffffff",
        backgroundColor: "#243c74",
        fontSize: 8,
        fontWeight: "800",
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 2,
        overflow: "hidden",
    },
    summary: {
        paddingTop: 15,
    },
    summaryLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 7,
    },
    summaryLabel: {
        color: "#536568",
        fontSize: 12,
    },
    summaryValue: {
        color: "#263638",
        fontSize: 12,
    },
    totalLine: {
        marginTop: 11,
        paddingTop: 9,
        borderTopWidth: 1,
        borderTopColor: "#dce5e4",
    },
    totalLabel: {
        color: "#263638",
        fontSize: 14,
        fontWeight: "700",
    },
    totalValue: {
        color: "#182528",
        fontSize: 14,
        fontWeight: "800",
    },
    placeOrderButton: {
        height: 46,
        borderRadius: 24,
        backgroundColor: "#63a99e",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 17,
    },
    placeOrderText: {
        color: "#ffffff",
        fontSize: 13,
        fontWeight: "700",
    },
    emptyState: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 60,
    },
    emptyTitle: {
        color: "#263638",
        fontSize: 19,
        fontWeight: "700",
        marginTop: 14,
    },
    emptyDescription: {
        color: "#536568",
        fontSize: 14,
        marginTop: 6,
    },
    shopButton: {
        paddingHorizontal: 22,
        paddingVertical: 13,
        borderRadius: 24,
        backgroundColor: "#63a99e",
        marginTop: 20,
    },
});