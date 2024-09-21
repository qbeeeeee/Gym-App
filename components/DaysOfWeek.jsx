import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Colors } from "./../constants/Colors";

// Array of days
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getFormattedDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  return `${day}/${month}`;
};

const getWeekDates = (baseDate) => {
  const weekDates = [];
  const currentDayIndex = baseDate.getDay();
  // Calculate the date for each day of the week
  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() - currentDayIndex + i);
    weekDates.push(getFormattedDate(date));
  }
  return weekDates;
};

export default function WeekDays() {
  const today = new Date();
  const currentDayIndex = today.getDay();
  const weekDates = getWeekDates(today);

  return (
    <View style={{ marginLeft: 7, marginTop: 20 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {daysOfWeek.map((day, index) => (
          <View
            key={index}
            style={[
              {
                marginHorizontal: 3,
                width: 48,
                padding: 8,
                borderRadius: 10,
                alignItems: "center",
                backgroundColor:
                  currentDayIndex === index ? Colors.PRIMARY : "lightgray",
              },
            ]}
          >
            <Text style={{ fontFamily: "outfit-medium", fontSize: 15 }}>
              {day.slice(0, 3)}
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 13,
                color: "#666666",
              }}
            >
              {weekDates[index]}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
