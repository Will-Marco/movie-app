import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchingImage185 } from "../api";

const { width, height } = Dimensions.get("window");

export default function UpcomingMovie({ upcoming, title }) {
  const navigation = useNavigation();

  return (
    <View className="mx-3 mb-8 space-y-4">
      <Text className="text-xl text-[#FFFFF0] font-semibold">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {upcoming.map((item) => (
          <TouchableWithoutFeedback
            key={item.id}
            onPress={() => navigation.navigate("Movie", item)}
          >
            <View className="space-y-1 mr-4 items-center">
              <Image
                source={{ uri: fetchingImage185(item.poster_path) }}
                className="rounded-2xl"
                style={{ width: width * 0.3, height: height * 0.2 }}
              />
              <Text className="text-[#FFFFF0] ">
                {item.title.length > 13
                  ? item.title.slice(0, 12) + "..."
                  : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
