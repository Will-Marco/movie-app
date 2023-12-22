import { View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./Movie-card";

const { width } = Dimensions.get("window");

export default function TrendingMovie({ trending }) {
  return (
    <View className="my-2">
      <Carousel
        data={trending}
        renderItem={({ item }) => <MovieCard item={item} />}
        inactiveSlideOpacity={0.4}
        sliderWidth={width}
        itemWidth={width * 0.7}
        slideStyle={{ display: "flex", alignItems: "center" }}
        loop={true}
      />
    </View>
  );
}
