import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";
import waterBottle from "./../assets/images/water-bottle.png";

export default function AddWater() {
  const [water, setWater] = useState(0);

  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 180,
        height: 140,
        borderRadius: 15,
        borderRadius: 20,
        marginBottom: 20,
        marginLeft: 15,
        backgroundColor: "#1F1F1F",
        borderWidth: 5,
        borderColor: "#666",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
      }}
    >
      <Text
        style={{
          color: "white",
          fontFamily: "outfit-medium",
          fontSize: 18,
          paddingTop: 20,
          marginBottom: 10,
        }}
      >
        Stay Hydrated
      </Text>
      <View
        style={{
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Image
          source={waterBottle}
          style={{
            width: 40,
            height: 40,
            marginBottom: 10,
          }}
          resizeMode="cover"
        />
        <Text
          style={{
            color: "#76C7C0",
            fontFamily: "outfit-medium",
            fontSize: 15,
          }}
        >
          {water}L / 2000L
        </Text>
        <View
          style={{
            width: "100%",
            height: 10,
            borderRadius: 5,
            backgroundColor: "#333",
            overflow: "hidden",
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
}
