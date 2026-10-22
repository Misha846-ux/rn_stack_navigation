import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ShopFirstScreen } from "../screens/ShopFirstScree";
import { ShopSecondScreen } from "../screens/ShopSecondSreen";
import { ShopThirdScreen } from "../screens/ShopThirdScreen";
import { ProductEntity } from "../models/ProductEntity";

export type RootStackParamList = {
    ShopThird: undefined;
    ShopSecond: { product: ProductEntity };
    ShopFirst: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ShopFirst" component={ShopFirstScreen}/>
            <Stack.Screen name="ShopSecond" component={ShopSecondScreen}/>
            <Stack.Screen name="ShopThird" component={ShopThirdScreen}/>
        </Stack.Navigator>
    )
}
