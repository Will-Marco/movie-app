import { useNavigation, useRoute } from "@react-navigation/native";
import {
  fetchingImage342,
  fetchingPersonalDetails,
  fetchingPersonalMovies,
} from "../api";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Loader, UpcomingMovie } from "../components";

export default function Person() {
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  const { params: id } = useRoute();
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  const getPersonDetail = async () => {
    const data = await fetchingPersonalDetails(id);
    setPerson(data);
    setIsLoading(false);
  };

  const getPersonMovies = async () => {
    const data = await fetchingPersonalMovies(id);
    setPersonMovies(data.cast);
  };

  useEffect(() => {
    getPersonDetail();
    getPersonMovies();
  }, [id]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-slate-900"
    >
      <SafeAreaView className="w-full px-4 py-2 top-0 flex-row justify-between items-center absolute z-20 ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="#FFFFF0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="heart"
            size={35}
            color={isFavourite ? "#A00" : "#FFFFF0"}
            onPress={() => setIsFavourite((prev) => !prev)}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {isLoading ? (
        <View
          className="flex-1 justify-center items-center"
          style={{ width: width, height: height }}
        >
          <Loader />
        </View>
      ) : (
        <SafeAreaView className="mt-4">
          <View
            className={"flex-row justify-center"}
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="w-72 h-72 items-center rounded-full overflow-hidden border-neutral-200 border-2">
              <Image
                source={{ uri: fetchingImage342(person?.profile_path) }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className={"mt-6"}>
            <Text className={"text-3xl text-white font-bold text-center"}>
              {person?.name}
            </Text>
            <Text className={"text-neutral-400 text-base text-center"}>
              {person?.place_of_birth}
            </Text>
          </View>
          <View
            className={
              "mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full"
            }
          >
            <View
              className={"border-r-2 border-r-neutral-400 px-2 items-center"}
            >
              <Text className={"text-white font-semibold"}>Gender</Text>
              <Text className={"text-neutral-400 text-sm"}>
                {person?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View
              className={"border-r-2 border-r-neutral-400 px-2 items-center"}
            >
              <Text className={"text-white font-semibold"}>Birthday</Text>
              <Text className={"text-neutral-400 text-sm"}>
                {person?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className={"my-6 mx-4 space-y-2"}>
            <Text className="text-white text-lg">Biography</Text>
            <Text className={"text-neutral-400 tracking-wide"}>
              {person?.biography}
            </Text>
          </View>
          {person?.id && personMovies.length > 0 && (
            <UpcomingMovie title={"Movies"} upcoming={personMovies} />
          )}
        </SafeAreaView>
      )}
    </ScrollView>
  );
}
