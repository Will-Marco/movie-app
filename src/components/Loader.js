import { ActivityIndicator, View } from "react-native";

export default function Loader() {
  return (
    <View className="flex-1 justify-center">
      <ActivityIndicator size="large" color="#FFFFF0" />
    </View>
  );
}
