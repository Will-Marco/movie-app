import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  fetchingPopularMovie,
  fetchingTopRatedMovie,
  fetchingTrendingMovie,
  fetchingUpcomingMovie,
} from "../api";
import {
  TrendingMovie,
  UpcomingMovie,
  TopRatedMovie,
  Loader,
} from "../components";

export default function Home({ navigation }) {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTrendingData = async () => {
    const { results } = await fetchingTrendingMovie();
    setTrending(results);
    setIsLoading(false);
  };

  const getUpcomingData = async () => {
    const { results } = await fetchingUpcomingMovie();
    setUpcoming(results);
  };

  const getTopRatedData = async () => {
    const { results } = await fetchingTopRatedMovie();
    setTopRated(results);
  };

  const getPopularData = async () => {
    const { results } = await fetchingPopularMovie();
    setPopular(results);
  };

  useEffect(() => {
    getTrendingData();
    getUpcomingData();
    getTopRatedData();
    getPopularData();
  }, []);

  return (
    <View className="flex-1 bg-slate-900">
      <SafeAreaView>
        <StatusBar style="light" />
        <View className="mx-4 flex-row justify-between items-center border-b-2 border-b-[#FFFFF0]">
          <View className="flex-row justify-between items-cente gap-2">
            <Ionicons name="videocam" size={50} color="#FFFFF0" />
            <Text className="text-[35px] text-[#FFFFF0]">Movie</Text>
          </View>
          <Ionicons name="search" color="#FFFFF0" size={25} />
        </View>
      </SafeAreaView>
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <Loader />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {trending.length > 0 && <TrendingMovie trending={trending} />}
          {upcoming.length > 0 && (
            <UpcomingMovie upcoming={upcoming} title={"Upcoming movies"} />
          )}
          {popular.length > 0 && (
            <UpcomingMovie upcoming={popular} title={"Popular movies"} />
          )}
          {topRated.length > 0 && <TrendingMovie trending={topRated} />}
        </ScrollView>
      )}
    </View>
  );
}
