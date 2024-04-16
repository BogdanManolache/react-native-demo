import { View, Text, TouchableOpacity } from 'react-native';

export default function CustomButton({
  title,
  containerStyles,
  handlePress,
  textStyles,
  isLoading,
}) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl justify-center items-center min-h-[62px] ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}>
      <Text className={`text-primary text-lg font-psemibold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
}
