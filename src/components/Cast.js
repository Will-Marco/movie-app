import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fetchingImage185 } from "../api";

export default function Cast({ cast }) {
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
            <TouchableOpacity key={idx} className={"mr-4 mb-6 items-center"}>
              <View>
                <Image
                  source={{ uri: fetchingImage185(person?.profile_path) }}
                  className="w-24 h-28 rounded-2xl"
                />
              </View>
              <Text className="text-white text-xs mt-1">
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
