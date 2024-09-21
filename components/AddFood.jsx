import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import addFood from "./../assets/images/add.png";

export default function AddFood() {
  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 180,
        height: 140,
        borderRadius: 20,
        marginBottom: 20,
        marginTop: 20,
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
      <Image
        source={addFood}
        style={{
          width: 80,
          height: 80,
        }}
        resizeMode="cover"
      />
      <Text style={{ color: "white", fontFamily: "outfit-medium" }}>
        Add Food
      </Text>
      <Text
        style={{ color: "white", fontFamily: "outfit-medium", fontSize: 10 }}
      >
        Count Your Calories
      </Text>
    </SafeAreaView>
  );
}
