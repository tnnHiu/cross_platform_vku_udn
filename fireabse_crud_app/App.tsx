import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "./firebaseConfig";

interface Task {
  id: string;
  task: string;
  createAt: Date;
}

export default function App() {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  const addTask = async () => {
    if (task.trim() === "") {
      Alert.alert("Error", "Please enter a task");
      return;
    }
    try {
      await addDoc(collection(firestore, "task_list"), {
        task: task,
        createAt: new Date(),
      });
      setTask("");
    } catch (error) {
      console.error("Error adding task: ", error);
      Alert.alert("Error", "Could not add task");
    }
  };

  const updateTask = async (id: string) => {
    const taskToUpdate = taskList.find((item) => item.id === id);
    if (!taskToUpdate) return;
    Alert.prompt(
      "Update Task",
      "Enter new task",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: async (newTask) => {
            if (newTask?.trim() === "") {
              Alert.alert("Error", "Task cannot be empty");
              return;
            }
            try {
              const taskRef = doc(firestore, "task_list", id);
              await updateDoc(taskRef, {
                task: newTask,
              });
            } catch (error) {
              console.error("Error updating task: ", error);
            }
          },
        },
      ],
      "plain-text",
      taskToUpdate.task
    );
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, "task_list", id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  useEffect(() => {
    const _query = query(
      collection(firestore, "task_list"),
      orderBy("createAt", "desc")
    );
    const unsub = onSnapshot(_query, (snapshot) => {
      const tasksData: Task[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        task: doc.data().task,
        createAt: doc.data().createAt.toDate(),
      }));
      setTaskList(tasksData);
    });
    return () => unsub();
  }, []);

  const taskItem = ({ item }: { item: Task }) => {
    console.log(item);
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>{item.task}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              updateTask(item.id);
            }}
            style={styles.updateButton}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteTask(item.id);
            }}
            style={styles.deleteButton}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={taskItem}
        ListEmptyComponent={<Text>No tasks available</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  updateButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});
