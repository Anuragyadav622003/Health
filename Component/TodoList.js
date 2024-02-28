import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Platform, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
const TodoList = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddTask = async () => {
    if (!task.trim()) {
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
      const response = await axios.post(
        'http://10.0.2.2:3000/api/todos',
        { task, date, time }, // Include task, date, and time in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      );
      console.log('Task added successfully:', response.data);
  
      // Update local state after successful submission
      setTasks([...tasks, { task, date, time }]);
      setTask('');
      setDate(new Date());
      setTime(new Date());
    } catch (error) {
      console.error('Error adding task:', error);
      // Handle error
    }
  };

//   const handleRemoveTask = index => {
//     setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
//   };
const handleRemoveTask = async index => {
    const newTasks = [...tasks];
   const [deletedTask]= newTasks.splice(index, 1);
    setTasks(newTasks);
    const {task ,date,time} = deletedTask;
    // You need to implement logic to delete tasks on the server
    const token = await AsyncStorage.getItem('token');
    const response = await axios.delete(
      'http://10.0.2.2:3000/api/todos',
      { task, date, time },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
      },
    );
  };
  const renderTask = ({ item, index }) => (
    <View style={styles.taskContainer}>
      <View style={styles.taskSquare}>
        <View style={styles.taskDateTime}>
          <Text style={styles.taskDate}>{item.date.toLocaleDateString()}</Text>
          <Text style={styles.taskTime}>{item.time.toLocaleTimeString()}</Text>
        </View>
        <View style={styles.taskContent}>
          <Text style={styles.taskText}>{item.task}</Text>
          <TouchableOpacity onPress={() => handleRemoveTask(index)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleDateChange = (_, selectedDate) => {
    setShowDatePicker(false);
    setDate(selectedDate || date);
  };

  const handleTimeChange = (_, selectedTime) => {
    setShowTimePicker(false);
    setTime(selectedTime || time);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Entypo name='plus' style={styles.plus} />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
      )}

      {showTimePicker && (
        <DateTimePicker value={time} mode="time" is24Hour={true} display="default" onChange={handleTimeChange} />
      )}

      <View style={styles.dateAndTimeButtons}>
        <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
          <Entypo name='calendar' size={20} />
          <Text>Due Date</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setShowTimePicker(true)}>
          <MaterialIcons name='alarm' size={20} />
          <Text>Due Time</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
        ListEmptyComponent={<Image source={require('../assets/calendar.png')} style={styles.emptyImage} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 24,
    color: 'white',
  },
  dateAndTimeButtons: {
    flexDirection: 'row',
  gap:20,
  padding:5,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: '#ccc',
  },
  taskContainer: {
    marginBottom: 20,
  },
  taskSquare: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  taskDateTime: {
    marginRight: 10,
  },
  taskDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  taskTime: {
    fontSize: 16,
    color: '#555',
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 20,
    fontWeight: '600',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  emptyImage: {
    width: '100%',
    height: 300,
marginTop:'30%'
  },
});

export default TodoList;