import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Accelerometer } from "expo-sensors";

const CALORIES_PER_STEP = 0.05;

const StepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState(0);

  useEffect(() => {
    let subscription;

    const threshold = 0.4; // Adjust based on testing

    const handleAccelerometerData = (accelerometerData) => {
      const { y } = accelerometerData;
      const timestamp = new Date().getTime();

      if (
        Math.abs(y - lastY) > threshold &&
        !isCounting &&
        timestamp - lastTimestamp > 800
      ) {
        setIsCounting(true);
        setLastY(y);
        setLastTimestamp(timestamp);
        setSteps((prevSteps) => prevSteps + 1);

        setTimeout(() => {
          setIsCounting(false);
        }, 1200);
      }
    };

    Accelerometer.isAvailableAsync().then((result) => {
      if (result) {
        subscription = Accelerometer.addListener(handleAccelerometerData);
      } else {
        console.log("Accelerometer not available on this device");
      }
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isCounting, lastY, lastTimestamp]);

  const resetSteps = () => {
    setSteps(0);
  };

  const estimatedCaloriesBurned = steps * CALORIES_PER_STEP;

  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 180,
        height: 300,
        borderRadius: 20,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 15,
        backgroundColor: "#333",
        padding: 20,
        borderWidth: 5,
        borderColor: "#666",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
      }}
    >
      <Text
        style={{
          fontFamily: "Roboto",
          fontSize: 18,
          fontWeight: "bold",
          color: "#ffffff",
          marginBottom: 10,
        }}
      >
        Step Counter
      </Text>
      <Text
        style={{
          fontFamily: "Roboto",
          fontSize: 48,
          fontWeight: "bold",
          color: "#00e676",
          marginVertical: 10,
        }}
      >
        {steps}
      </Text>
      <Text
        style={{
          fontFamily: "Roboto",
          fontSize: 14,
          color: "#ffffff",
          marginBottom: 5,
        }}
      >
        Steps
      </Text>
      <Text
        style={{
          fontFamily: "Roboto",
          fontSize: 10,
          color: "#ffffff",
          marginBottom: 15,
          marginTop: 15,
        }}
      >
        Estimated Calories Burned:
      </Text>
      <Text
        style={{
          fontFamily: "Roboto",
          fontSize: 20,
          fontWeight: "bold",
          color: "#ff3d00",
        }}
      >
        {estimatedCaloriesBurned.toFixed(2)}
      </Text>
    </SafeAreaView>
  );
};

export default StepCounter;
