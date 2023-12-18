import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  fetchingTopRatedMovie,
  fetchingTrendingMovie,
  fetchingUpcomingMovie,
} from "../api";
import { TrendingMovie, UpcomingMovie, TopRatedMovie } from "../components";

export default function Home({ navigation }) {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const getTrendingData = async () => {
    const data = await fetchingTrendingMovie();
    setTrending(data.results);
  };

  const getUpcomingData = async () => {
    const data = await fetchingUpcomingMovie();
    setUpcoming(data.results);
  };

  const getTopRatedData = async () => {
    const data = await fetchingTopRatedMovie();
    setTopRated(data.results);
  };

  useEffect(() => {
    getTrendingData();
    getUpcomingData();
    getTopRatedData();
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {trending.length > 0 && <TrendingMovie />}
        {upcoming.length > 0 && <UpcomingMovie />}
        {topRated.length > 0 && <TopRatedMovie />}
      </ScrollView>
    </View>
  );
}
