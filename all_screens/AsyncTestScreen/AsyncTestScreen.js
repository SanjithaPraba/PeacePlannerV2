import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Touchable, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@save_name'

//link for reference: https://heartbeat.fritz.ai/building-offline-react-native-apps-with-asyncstorage-dcb4b0657f93

class AsyncTestScreen extends React.Component {

  static navigationOptions = {
    title: 'AsyncTestScreen' 
  };
  
  state = {
    text: '',
    name: ''
  }


save = async name => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, name)
      alert('Data successfully saved!')
      this.setState({ name })
    } catch (e) {
      alert('Failed to save name.')
    }
  }


  retrieveData = async () => {
    try {
      const name = await AsyncStorage.getItem(STORAGE_KEY)

      if (name !== null) {
        this.setState({ name })
      }
    } catch (e) {
      alert('Failed to load name.')
    }
  }

  removeEverything = async () => {
    try {
      await AsyncStorage.clear()
      alert('Storage successfully cleared!')
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }

  onChangeText = text => this.setState({ text })

onSubmitEditing = () => {
    const onSave = this.save
    const { text } = this.state

    if (!text) return

    onSave(text)
    this.setState({ text: '' })
}

  componentDidMount() {
    this.retrieveData()
  }

  render() {
    const { text, name } = this.state

  return (
    <View style={styles.container}>
        
    <TextInput
        style={styles.input}
        value={text}
        placeholder='Type your name, hit enter, and refresh'
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
    />

    <Text style={styles.text}>Hello {name}!</Text>
    <TouchableOpacity onPress={this.removeEverything} style={styles.button}>
        <Text style={styles.buttonText}>Clear Storage</Text>
    </TouchableOpacity>
</View>


  );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        padding: 10,
        backgroundColor: '#bcb0ff'
    },
    input: { 
        padding: 15,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        margin: 10
    },
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: '#5233ff'
    },
    buttonText: {
        fontSize: 14,
        color: 'white'
    }
});

export default AsyncTestScreen;
