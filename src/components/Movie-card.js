import { Dimensions, Image, View } from "react-native";
import { fetchingImage500 } from "../api";

const { width, height } = Dimensions.get("window");

export default function MovieCard({ item }) {
  
  return (
    <View>
      <Image
        source={{ uri: fetchingImage500(item.poster_path) }}
        style={{ width: width * 0.7, height: height * 0.5 }}
        className={"rounded-3xl"}
      />
    </View>
  );
}
