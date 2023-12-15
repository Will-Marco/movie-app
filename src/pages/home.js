import React from "react";
import { StatusBar, Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-500">
      <Text className="text-[60px]">Hello world!</Text>
      <StatusBar style="auto" />
    </View>
  );
}