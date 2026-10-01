import { Image, StyleSheet, Text, View } from "react-native";
import { ProductEntity } from "../models/ProductEntity";
import { Ionicons } from "@expo/vector-icons";

export function ProductCard({ name, price, image }: ProductEntity) {
    return (
        <View style={styles.mainContainer}>
            <Ionicons name={true ? "heart" : "heart-outline"}/>
            <Image
                style={styles.img}
                source={{ uri: image }}
                resizeMode="cover"
            />

            <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={1}>{name}</Text>
                <Text style={styles.price}>{price}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: "48%",
        marginBottom: 20,
    },

    img: {
        width: "100%",
        aspectRatio: 0.95,
        borderRadius: 10,
        backgroundColor: "#e3ebed",
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
});