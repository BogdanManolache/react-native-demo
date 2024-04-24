import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useState } from 'react';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

export default function SearchInput({ initialQuery }) {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  // console.log(pathname);

  return (
    <View className="flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={text => setQuery(text)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query)
            return Alert.alert(
              'Missing query!',
              'Please input something to search across database'
            );

          if (pathname.startsWith('/search')) router.setParams({ query });

          router.push(`/search/${query}`);
        }}>
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
}
