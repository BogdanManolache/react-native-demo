import { Alert, FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { useState } from 'react';
import { getAllPosts, getTrendingPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';

export default function Home() {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: trendingPosts } = useAppwrite(getTrendingPosts);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // console.log(posts);
  // console.log(trendingPosts);

  async function onRefresh() {
    setIsRefreshing(true);
    // refetch videos
    await refetch();
    setIsRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={item => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="flex my-6 space-y-6 px-4">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome back,</Text>
                <Text className="text-2xl font-psemibold text-white">Bogdan</Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular mb-3 text-gray-100">Latest videos</Text>

              <Trending posts={trendingPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />
        )}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}
