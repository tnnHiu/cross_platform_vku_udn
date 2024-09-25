import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export type ShoppingItemProps = {
  id: string;
  isChecked: boolean;
  title: string;
  onRefresh: () => void;
};

const ShoppingItem = (props: ShoppingItemProps) => {
  return (
    <View style={styles.container}>
      <Pressable>
        <AntDesign name="checkcircleo" size={24} color="black" />
      </Pressable>

      <Text style={styles.title}>{props.title}</Text>

      <Pressable>
        <MaterialIcons name="delete" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default ShoppingItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "cyan",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "500",
  },
});
