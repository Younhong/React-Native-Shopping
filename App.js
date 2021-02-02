import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

const App = () => {
  const [items, setItems] = useState([
    { id: numToString(Math.random()), text: 'Milk' },
    { id: numToString(Math.random()), text: 'Eggs' },
    { id: numToString(Math.random()), text: 'Bread' },
    { id: numToString(Math.random()), text: 'Juice' },
  ]);

  const deleteItem = (id) => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id != id);
    });
  };

  function numToString(id) {
    return Math.floor(id * 100000 + 1).toString()
  }

  const addItem = (text) => {
    if(!text) {
      Alert.alert("Error", "Please enter an item", {text: "OK"});
    } 
    else {
      setItems(prevItems => {
        for (var i = 0; i < prevItems.length; i++) {
          if (prevItems[i].text == text) {
            Alert.alert("Error", `Duplicated Item ${text}. Try another item`, 
              {text: "OK"});
            return [...prevItems];
          }
          else {
            return [{id: numToString(Math.random()), text},...prevItems]
          };
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Shopping List"/>
      <AddItem addItem={addItem}/>
      <FlatList data={items} 
        renderItem={({item}) => (
          <ListItem item={item} deleteItem={deleteItem}/>
      )}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60
  },
})

export default App;