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
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  fetchingImage500,
  fetchingMovieCredits,
  fetchingMovieDetail,
  fetchingSimilarMovie,
} from "../api";
import { Cast, Loader, UpcomingMovie } from "../components";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function Movie() {
  const [isFavourte, setIsFavourte] = useState(false);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const { params: id } = useRoute();

  const getMovieDetail = async () => {
    const data = await fetchingMovieDetail(id);
    data && setMovie(data);
    setIsLoading(false);
  };

  const getMovieCredits = async () => {
    const data = await fetchingMovieCredits(id);
    data.cast && setCast(data.cast);
  };

  const getSimilarMovie = async () => {
    const data = await fetchingSimilarMovie(id);
    data.results && setSimilarMovies(data.results);
  };

  useEffect(() => {
    getMovieDetail();
    getMovieCredits();
    getSimilarMovie();
  }, [id]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-slate-900"
    >
      <View className="w-full  ">
        <SafeAreaView className="w-full px-4 py-2 flex-row justify-between items-center border-b-2 border-b-[#FFFFF0] z-20 ">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={30} color="#FFFFF0" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="heart"
              size={35}
              color={isFavourte ? "#A00" : "#FFFFF0"}
              onPress={() => setIsFavourte((prev) => !prev)}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {isLoading ? (
          <Loader />
        ) : (
          <View>
            <Image
              source={{ uri: fetchingImage500(movie.poster_path) }}
              style={{ width, height: height * 0.8 }}
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.6)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className={"absolute bottom-0"}
            />
          </View>
        )}
      </View>
      <View className="mb-4 space-y-4" style={{ marginTop: -40 }}>
        <View className="mb-4">
          <Text
            className={
              "text-3xl text-center text-[#FFFFF0] font-bold tracking-widest"
            }
          >
            {movie?.title}
          </Text>
          <Text
            className={
              "text-xl text-center text-[#BBBBB0] font-bold tracking-widest"
            }
          >
            {movie?.tagline}
          </Text>
        </View>
        {movie?.id ? (
          <Text
            className={"text-neutral-400 font-semibold text-base text-center"}
          >
            {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
            {movie?.runtime} min
          </Text>
        ) : null}
        <View className={"flex-row justify-center mx-4 space-x-2"}>
          {movie?.genres?.map((genre, idx) => (
            <Text
              key={idx}
              className="text-neutral-500 font-semibold text-base text-center"
            >
              {genre.name} {idx + 1 !== movie.genres.length ? "•" : null}
            </Text>
          ))}
        </View>
        <Text className={"mx-4 tracking-wide text-neutral-400"}>
          {movie?.overview}
        </Text>
      </View>
      {movie?.id && similarMovies.length > 0 && <Cast cast={cast} />}
      {movie?.id && similarMovies.length > 0 && (
        <UpcomingMovie upcoming={similarMovies} title={"Similar movies"} />
      )}
    </ScrollView>
  );
}
