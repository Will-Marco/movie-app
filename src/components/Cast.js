import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fetchingImage185 } from "../api";
import { useNavigation } from "@react-navigation/native";

export default function Cast({ cast }) {
  const navigation = useNavigation()

  return (
    <View className="my-6">
      <Text className="mx-4 mt-6 mb-5 text-xl text-[#FFFFF0]">Actors</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, idx) => (
            <TouchableOpacity key={idx} onPress={() => navigation.navigate('Person', person.id)} className={"mr-4 items-center"}>
              <View className="w-20 h-20 overflow-hidden rounded-full items-center border border-neutral-500">
                <Image
                  source={{ uri: fetchingImage185(person?.profile_path) }}
                  className="rounded-2xl w-20 h-24"
                />
              </View>
              <Text className="mt-1 text-xs text-white">
                {person?.character.length > 13
                  ? person.character.slice(0, 13) + "..."
                  : person?.character}
              </Text>
              <Text className="text-neutral-400 text-xs">
                {person?.original_name.length > 15
                  ? person.original_name.slice(0, 14) + "..."
                  : person?.original_name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
