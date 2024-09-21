import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../configs/FireBaseConfig";
import { Colors } from "./../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function Slider() {
  const navigation = useNavigation();

  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    GetSliderList();
  }, []);

  const handleNavigation = (item) => {
    switch (item.name) {
      case "Chest":
        navigation.navigate("Chest"); // Navigate to Screen1 for first image
        break;
      case "Back":
        navigation.navigate("Back"); // Navigate to Screen2 for second image
        break;
      case "Legs":
        navigation.navigate("Legs"); // Navigate to Screen3 for third image
        break;
      default:
        console.log("Unknown image clicked");
    }
  };

  const GetSliderList = async () => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setSliderList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
          paddingLeft: 20,
          marginVertical: 20,
        }}
      >
        Choose your fighter
      </Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 20 }}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: 250,
              height: 150,
              borderRadius: 15,
              marginRight: 15,
              overflow: "hidden",
            }}
          >
            <Text
              style={{
                padding: 5,
                backgroundColor: "lightgray",
                fontWeight: "bold",
                textAlign: "center",
                color: Colors.PRIMARY,
                zIndex: 10,
              }}
            >
              {item.name}
            </Text>
            <TouchableOpacity onPress={() => handleNavigation(item)}>
              <Image
                source={{ uri: item.imageUrl }}
                style={{
                  bottom: 20,
                  right: 20,
                  width: 300,
                  height: 300,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
