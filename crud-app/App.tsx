import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ShoppingItem from "./components/ShoppingItem";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "./firebase/index";

export default function App() {
  const [title, setTitle] = useState("");
  const [shoppingList, setShoppingList] = useState<any>([]);

  interface dataDoc {
    title: string;
    id: string;
  }

  const addShoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const getShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      setShoppingList({
        ...doc.data(),
        id: doc.id,
      });
    });
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Shopping List</Text>
        <Text style={styles.noOfItem}>0</Text>
        <Pressable>
          <MaterialIcons name="delete" size={30} color="black" />
        </Pressable>
      </View>

      <TextInput
        placeholder="Enter shopping item"
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addShoppingItem}
      />

      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={({ item }) => <ShoppingItem title={item.title} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    flex: 1,
  },
  noOfItem: {
    fontSize: 30,
    fontWeight: "500",
    marginRight: 20,
  },
  input: {
    backgroundColor: "cyan",
    padding: 16,
    fontSize: 17,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
});
