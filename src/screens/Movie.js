import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Movie() {
  const [isFavourte, setIsFavourte] = useState(false);
  const navigation = useNavigation();
  const { params: item } = useRoute();

  console.log(item);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-slate-900"
    >
      <View className="w-full">
        <SafeAreaView className="w-full px-4 flex-row justify-between items-center z-20 ">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={30} color="#FFFFF0" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="heart"
              size={35}
              color={isFavourte ? "#A00" : "#FFFFF0"}
              onPress={() => setIsFavourte((prev) => !prev)}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}
