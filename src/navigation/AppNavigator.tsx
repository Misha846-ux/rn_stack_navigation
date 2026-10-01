import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ShopFirstScreen } from "../screens/ShopFirstScree";
// import { HomeScreen } from "../screens/HomeScreen";
// import { DetailsScreen } from "../screens/DetailsScreen";
// import { ProfileScreen } from "../screens/ProfileScreen";


export type RootStackParamList = {
    // Home:undefined;
    // Profile:undefined;
    // Details: {username: string};
    ShopFirst: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
            <Stack.Screen name="Details" component={DetailsScreen}/> */}
            <Stack.Screen name="ShopFirst" component={ShopFirstScreen}/>
        </Stack.Navigator>
    )
}

