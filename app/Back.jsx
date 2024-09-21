import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "expo-router";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../configs/FireBaseConfig";
import { Colors } from "../constants/Colors";
import removeIcon from "../assets/images/remove.png";
import addIcon from "../assets/images/plus.png";

export default function Back() {
  const [exercises, setExercises] = useState([]);
  const [exercisesRemaining, setExercisesRemaining] = useState([]);
  const [exercisesSelected, setExercisesSelected] = useState([]);
  const [setMenu, setSetMenu] = useState(null);
  const [setDetails, setSetDetails] = useState({});
  const [sets, setSets] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const navigation = useNavigation();

  const RemoveItem = (itemId) => {
    setExercisesSelected((prev) => {
      const itemToMove = prev.find((item) => item.id === itemId);
      const newList = prev.filter((item) => item.id !== itemId);
      setExercisesRemaining((prev2) => [...prev2, itemToMove]);
      return newList;
    });
    // Clear set details and error message when removing an item
    setSetDetails((prev) => {
      const newDetails = { ...prev };
      delete newDetails[itemId];
      return newDetails;
    });
    setErrorMessage((prev) => {
      const newErrors = { ...prev };
      delete newErrors[itemId];
      return newErrors;
    });
    setSets((prev) => {
      const newSets = { ...prev };
      delete newSets[itemId];
      return newSets;
    });
  };

  const AddItem = (itemId) => {
    setExercisesRemaining((prev) => {
      const itemToAdd = prev.find((item) => item.id === itemId);
      const newList = prev.filter((item) => item.id !== itemId);
      setExercisesSelected((prev) => [...prev, itemToAdd]);
      return newList;
    });
  };

  const handleAddSets = (id) => {
    setSetMenu((prevId) => (prevId === id ? null : id));
  };

  const handleSetChange = (exerciseId, setIndex, field, value) => {
    setSetDetails((prev) => {
      const updatedDetails = { ...prev };
      if (!updatedDetails[exerciseId]) {
        updatedDetails[exerciseId] = [];
      }
      updatedDetails[exerciseId][setIndex] = {
        ...updatedDetails[exerciseId][setIndex],
        [field]: value,
      };
      return updatedDetails;
    });
  };

  const handleSetInput = (itemId, value) => {
    const numSets = Number(value);
    setSets((prev) => ({ ...prev, [itemId]: value }));

    if (numSets > 5) {
      setErrorMessage((prev) => ({ ...prev, [itemId]: "Too many sets" }));
    } else {
      setErrorMessage((prev) => {
        const newErrors = { ...prev };
        delete newErrors[itemId];
        return newErrors;
      });
      setSetDetails((prev) => ({
        ...prev,
        [itemId]: new Array(numSets).fill({ kg: "", reps: "" }),
      }));
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });

    const fetchExercises = async () => {
      const q = query(collection(db, "BackExercises"));
      const querySnapshot = await getDocs(q);
      const exerciseList = [];
      querySnapshot.forEach((doc) => {
        exerciseList.push({ id: doc.id, ...doc.data() });
      });
      setExercises(exerciseList);
    };

    fetchExercises();
  }, [navigation]);

  useEffect(() => {
    const fetchSelectedExercises = () => {
      const exerciseList = [];
      const exerciseList2 = [];
      exercises.forEach((doc) => {
        if (exerciseList.length < 3) {
          exerciseList.push(doc);
        } else {
          exerciseList2.push(doc);
        }
      });
      setExercisesRemaining(exerciseList2);
      setExercisesSelected(exerciseList);
    };

    if (exercises.length > 0) {
      fetchSelectedExercises();
    }
  }, [exercises]);

  const getExerciseData = () => {
    const exerciseData = exercisesSelected.map((exercise) => {
      const sets = setDetails[exercise.id] || [];
      return {
        id: exercise.id,
        name: exercise.name,
        sets: sets.map((set, index) => ({
          setNumber: index + 1,
          kg: set.kg || "",
          reps: set.reps || "",
        })),
      };
    });

    return exerciseData;
  };

  const handleSubmit = () => {
    const exerciseData = getExerciseData();
    console.log(JSON.stringify(exerciseData, null, 2));
    Alert.alert(
      "Workout Data",
      "Workout data has been logged to the console. You can now send this data to your server or store it locally.",
      [{ text: "OK" }]
    );
    // Here you would typically send this data to your server or store it locally
  };

  const renderExerciseItem = ({ item }) => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#999",
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 5,
          backgroundColor: "lightgray",
          borderRadius: 10,
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setErrorMessage((prev) => ({ ...prev, [item.id]: null }));
            handleAddSets(item.id);
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Image
            source={{ uri: item.icon }}
            style={{ width: 45, height: 45 }}
            resizeMode="cover"
          />
          <Text
            style={{
              marginLeft: 20,
              fontFamily: "outfit-medium",
              fontSize: 18,
              flex: 1,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => RemoveItem(item.id)}>
          <Image
            source={removeIcon}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>

      {setMenu === item.id && (
        <View style={{ width: "100%", padding: 10 }}>
          <TextInput
            placeholder="Type how many sets you would like to do"
            keyboardType="numeric"
            value={sets[item.id] || ""}
            onChangeText={(text) => handleSetInput(item.id, text)}
            style={{
              marginBottom: 10,
              textAlign: "center",
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
            }}
          />
          {errorMessage[item.id] ? (
            <Text
              style={{
                textAlign: "center",
                color: "red",
                marginBottom: 10,
              }}
            >
              {errorMessage[item.id]}
            </Text>
          ) : (
            setDetails[item.id]?.map((detail, index) => (
              <View
                key={index}
                style={{
                  marginBottom: 10,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TextInput
                  placeholder={`Set ${index + 1} - Kg`}
                  keyboardType="numeric"
                  value={detail.kg}
                  onChangeText={(text) =>
                    handleSetChange(item.id, index, "kg", text)
                  }
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 10,
                    textAlign: "center",
                    flex: 1,
                    marginRight: 5,
                  }}
                />
                <TextInput
                  placeholder={`Set ${index + 1} - Reps`}
                  keyboardType="numeric"
                  value={detail.reps}
                  onChangeText={(text) =>
                    handleSetChange(item.id, index, "reps", text)
                  }
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 10,
                    textAlign: "center",
                    flex: 1,
                    marginLeft: 5,
                  }}
                />
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f9f9f9" }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          textAlign: "center",
          marginVertical: 30,
          color: Colors.PRIMARY,
        }}
      >
        Back Exercises
      </Text>

      <FlatList
        data={exercisesSelected}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() => (
          <>
            <Text
              style={{
                textAlign: "center",
                marginVertical: 30,
                fontSize: 20,
                color: "#ccc",
              }}
            >
              Add More Exercises
            </Text>

            <FlatList
              data={exercisesRemaining}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 5,
                    backgroundColor: "lightgray",
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                  }}
                >
                  <Image
                    source={{ uri: item.icon }}
                    style={{ width: 45, height: 45 }}
                    resizeMode="cover"
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontFamily: "outfit-medium",
                      fontSize: 18,
                      flex: 1,
                    }}
                  >
                    {item.name}
                  </Text>
                  <TouchableOpacity onPress={() => AddItem(item.id)}>
                    <Image
                      source={addIcon}
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />

            <Button
              title="Submit Workout"
              onPress={handleSubmit}
              color={Colors.PRIMARY}
            />
          </>
        )}
      />
    </View>
  );
}
