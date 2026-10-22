import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ProductEntity } from "../models/ProductEntity";
import { Ionicons } from "@expo/vector-icons";

type Props = ProductEntity & {
    onPress?: () => void;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
}

export function ProductCard({
    name,
    price,
    image,
    onPress,
    isFavorite = false,
    onToggleFavorite,
}: Props) {
    return (
        <View style={styles.mainContainer}>
            <Pressable
                style={styles.product}
                onPress={onPress}
                disabled={!onPress}
                accessibilityRole={onPress ? "button" : undefined}
            >
                <Image
                    style={styles.img}
                    source={{ uri: image }}
                    resizeMode="cover"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name} numberOfLines={1}>{name}</Text>
                    <Text style={styles.price}>{price}</Text>
                </View>
            </Pressable>
            {onToggleFavorite && (
                <Pressable
                    style={styles.favoriteButton}
                    onPress={onToggleFavorite}
                    accessibilityRole="button"
                    accessibilityLabel={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
                >
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={21}
                        color={isFavorite ? "#d45d66" : "#263638"}
                    />
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 4,
        marginBottom: 20,
        position: "relative",
    },
    product: {
        flex: 1,
    },
    img: {
        width: "100%",
        aspectRatio: 0.95,
        borderRadius: 10,
        backgroundColor: "#e3ebed",
        overflow: "hidden",
    },
    textContainer: {
        width: "100%",
        paddingTop: 7,
    },

    name: {
        color: "#182528",
        fontSize: 14,
        fontWeight: "600",
    },

    price: {
        color: "#182528",
        fontSize: 14,
        fontWeight: "700",
        marginTop: 2,
    },
    favoriteButton: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(246, 251, 250, 0.9)",
    },
});