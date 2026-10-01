// import { Text, View, Button, TextInput } from "react-native";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../navigation/AppNavigator";
// import { useState } from "react";

// type Props = NativeStackScreenProps<RootStackParamList, "Profile">;
// export function ProfileScreen ({navigation}: Props){
//     const [name, setName] = useState<string>("")
//     const handelOpenDetails = () => {
//         if(name != ""){
//             navigation.navigate("Details", {username: name})
//         }
//         else{
//             alert("Fill text input")
//         }
//     }
//     return (
//         <View>
//             <Text>User profile</Text>
//             <TextInput onChangeText={(text) => setName(text)}></TextInput>
//             <Button title="Open details" onPress={handelOpenDetails}></Button>
//         </View>
//     )
// }