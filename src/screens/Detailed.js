import { Button, StatusBar, Text, View } from "react-native";

export default function Home({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-500">
      <Text className="text-[60px] text-white">Detail Page!</Text>
      <Button
        title="Go to Home Page"
        onPress={() => navigation.navigate("Home")}
      />
      <StatusBar style="auto" />
    </View>
  );
}
