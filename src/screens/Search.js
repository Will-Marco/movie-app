import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchingSearchMovies } from "../api";
import { debounce } from "lodash";

export default function Search() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const searchHandler = (searchText) => {
    if (searchText && searchText.length > 3) {
      setIsLoading(true);
      fetchingSearchMovies({
        query: searchText,
        include_adult: false,
        page: "1",
      }).then((data) => {
        setIsLoading(false);
        console.log('API request');
        setResults(data.results);
      });
    } else {
      setResults([]);
      setIsLoading(false);
    }
  };

  const textDebounceHandler = useCallback(debounce(searchHandler, 400), []);

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="mx-4 my-3 flex-row justify-between items-center border border-neutral-400 rounded-full">
        <TextInput
          placeholder="Search movie"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-4 flex-1 text-base font-semibold text-[#FFFFF0]"
          onChangeText={textDebounceHandler}
        />
        <TouchableOpacity
        
          onPress={() => navigation.navigate("Home")}
          className={"rounded-full p-2 m-1 bg-neutral-500"}
        >
          <Ionicons name="close" color="#FFFFF0" size={20} />
        </TouchableOpacity>
      </View>
      <Text>Search</Text>
    </SafeAreaView>
  );
}
