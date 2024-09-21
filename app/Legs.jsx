import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";

export default function Legs() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  });
  return (
    <View>
      <Text>Legs</Text>
    </View>
  );
}
