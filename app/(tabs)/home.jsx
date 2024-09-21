import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Slider";
import DaysOfWeek from "../../components/DaysOfWeek";
import StepCounter from "../../components/StepCounter";
import AddFood from "../../components/AddFood";
import AddWater from "../../components/AddWater";

export default function home() {
  return (
    <ScrollView>
      <View>
        <Header></Header>
        <Slider></Slider>
        <DaysOfWeek></DaysOfWeek>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <StepCounter></StepCounter>
          <View>
            <AddFood></AddFood>
            <AddWater></AddWater>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
