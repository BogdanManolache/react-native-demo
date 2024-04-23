import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

function TrendingItem({ item, activeItem }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Animatable.View
      className="mx-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}>
      {isPlaying ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={status => {
            if (status.didJustFinish) setIsPlaying(false);
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setIsPlaying(true)}>
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
}

export default function Trending({ posts }) {
  const [activeItem, setActiveItem] = useState(posts[0]);

  function viewableItemsChanged({ viewableItems }) {
    if (viewableItems.length > 0) setActiveItem(viewableItems[0].key);
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.$id}
      renderItem={({ item }) => <TrendingItem item={item} activeItem={activeItem} />}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
}
