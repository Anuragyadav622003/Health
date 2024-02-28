 import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserDetail = () => {
  const [currentPage, setCurrentPage] = useState(0);
 const navigation = useNavigation();
  const [data, setData] = useState([
    { label: 'Age', value: '' },
    { label: 'Weight (kg)', value: '' },
    { label: 'Height (cm)', value: '' }
  ]);

  const nextPage = () => {
    if (currentPage <data.length -1) {
      setCurrentPage(currentPage + 1);
    } else {
     
       navigation.navigate('main');
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleInputChange = (text) => {
    const newData = [...data];
    newData[currentPage].value = text;
    setData(newData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={{color:"black"}}>{data[currentPage].label}:</Text>
        <TextInput
          keyboardType="numeric"
          placeholder={data[currentPage].label}
          value={data[currentPage].value}
          onChangeText={handleInputChange}
          style={styles.input}
        />
      </View>

      <View style={styles.tabBar}>
        <Pressable style={styles.buttonContainer} onPress={prevPage} disabled={currentPage === 0}>
          <Icon name="chevron-left" size={40} color="black" />
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
        
        <Pressable style={styles.buttonContainer} onPress={nextPage}>
          <Text style={styles.buttonText}>Next</Text>
          <Icon name="chevron-right" size={40} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor:'#FFFFFF',
    padding: 20
  },
  inputContainer: {
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor:'#FFFFFF',
    paddingVertical: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    paddingTop: 0,
    fontWeight: '700'
  }
});

export default UserDetail;
