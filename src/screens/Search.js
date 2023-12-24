import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { debounce } from "lodash";
import { fetchingImage185, fetchingSearchMovies } from "../api";
import { Loader } from "../components";

export default function Search() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const navigation = useNavigation();

  const searchHandler = async () => {
    try {
      if (query && query.length > 3) {
        const data = await fetchingSearchMovies({
          query,
          include_adult: false,
          page: "1",
        });
        setIsLoading(false);
        setResults(data.results);
      } else {
        setResults([]);
        setIsLoading(true);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setIsLoading(true);
      setResults([]);
    }
  };

  // const textDebounceHandler = useCallback(debounce(searchHandler, 400), []);

  const { width, height } = Dimensions.get("window");

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="mx-4 my-3 flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-14 px-1 py-2 absolute top-0 left-***l0 bg-neutral-500 rounded-tl-full rounded-bl-full"
        >
          <Ionicons name="chevron-back" size={30} color="#FFFFF0" />
        </TouchableOpacity>
        <View className="ml-8 flex-row justify-between items-center bg-slate-900 border border-neutral-400 rounded-full">
          <TextInput
            onChangeText={(e) => setQuery(e)}
            placeholder="Search movie"
            placeholderTextColor={"lightgray"}
            className="pb-1 pl-4 flex-1 text-base font-semibold text-[#FFFFF0]"
            value={query}
          />
          <TouchableOpacity
            onPress={searchHandler}
            className="p-2 m-1 bg-neutral-500 rounded-full"
          >
            <Ionicons name="search" color="#FFFFF0" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <Loader />
        </View>
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className={"flex-row justify-between flex-wrap"}>
            {results?.map((item) => (
              <TouchableWithoutFeedback
                key={item.id}
                onPress={() => navigation.navigate("Movie", item.id)}
              >
                <View className={"space-y-2 mb-4"}>
                  <Image
                    source={{ uri: fetchingImage185(item.poster_path) }}
                    className="rounded-3xl"
                    style={{
                      width: width * 0.44,
                      height: height * 0.3,
                    }}
                  />
                  <Text className="text-[#FFFFF0] ml-1">
                    {item.title.length > 22
                      ? item.title.slice(0, 22) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="justify-center">
          <Image
            source={require("../../assets/not-found.png")}
            className="h-96 w-96"
          />
          <Text className={"text-3xl text-white text-center"}>
            Movies not found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
