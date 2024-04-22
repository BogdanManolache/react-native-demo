import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { icons } from '../constants';

export default function SearchInput() {
  return (
    <View className="flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={''}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={() => {}}
      />

      <TouchableOpacity onPress={() => {}}>
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
}
