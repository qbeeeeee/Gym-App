import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (error) {
      console.error("OAuth error", err);
    }
  });

  return (
    <View>
      <View style={{ display: "flex", alignItems: "center", marginTop: 100 }}>
        <Image
          source={require("./../assets/images/login.jpeg")}
          style={{
            width: 225,
            height: 450,
            borderRadius: 20,
            borderWidth: 5,
            borderColor: "#000",
          }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your <Text style={{ color: Colors.PRIMARY }}>Gym</Text> App
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find your favourite gym excersices and keep a record
        </Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontFamily: "outfit",
          }}
        >
          Let's Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    display: "flex",
    alignItems: "center",
    marginTop: -20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: 40,
    padding: 16,
    borderRadius: 99,
  },
});
