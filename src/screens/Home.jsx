import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Home({ navigation }) {
  return (
    <View className="flex-1 bg-slate-900">
      <SafeAreaView>
        <StatusBar style="light" />
        <View className="mx-4 flex-row justify-between items-center border-b-2 border-b-[#FFFFF0]">
          <View className="flex-row justify-between items-cente gap-2">
            <Ionicons name="videocam" size={50} color="#FFFFF0" />
            <Text className="text-[35px] text-[#FFFFF0]">Movie</Text>
          </View>
          <Ionicons name="search" color="#FFFFF0" size={25} />
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      ></ScrollView>
    </View>
  );
}
