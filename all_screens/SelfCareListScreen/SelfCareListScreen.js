import React, { Component } from "react";
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity, Switch } from "react-native";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

global.globalDesiredTasksArray = [
  {
    pointValue: "15",
    activity: "Biking"
  }
]

const STORAGE_KEY = '@saveDesiredTasks'

class SelfCareListScreen extends React.Component {

  state = {
    activityList: 
    [
      {
      pointValue: 15,
      activity: 'Biking',
      toggled: true,
      text: "Push"
  },
  {
      pointValue: 20,
      activity: 'Walking',
      toggled: true,
      text: "Push"
  },
  {
      pointValue: 25,
      activity: 'Running',
      toggled: false,
      text: "Push"
  },
{
    pointValue: 15,
    activity: 'Journal',
    toggled: false,
    text: "Push"
},
{
    pointValue: 20,
    activity: 'Podcast',
    toggled: false,
    text: "Push"
},
{
    pointValue: 25,
    activity: 'Listen to Music',
    toggled: false,
    text: "Push"
},
{
  pointValue: 25,
  activity: 'Draw',
  toggled: false,
  text: "Push"
},
{
  pointValue: 25,
  activity: 'Yoga',
  toggled: false,
  text: "Push"
},

{
  pointValue: 25,
  activity: 'Meditate',
  toggled: false,
  text: "Push"
},
],

desiredTasksArray: 
  [

  ]
}

addToDesired = () => {
  desiredTasksArray.push(activityList[i])
  this.setState({desiredTasksArray:desiredTasksArray})
}
 


save = async newDesiredTasksArray => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDesiredTasksArray))
    console.log(newDesiredTasksArray)
    alert('Data successfully saved!')
    this.setState({ 
      desiredTasksArray: newDesiredTasksArray
     })
  } catch (e) {
    alert('Failed to save name.')
  }
}

retrieveData = async () => {
  try {
    const taskArray = await AsyncStorage.getItem(STORAGE_KEY)
    if(taskArray != null) {
      const parsedTaskArray = JSON.parse(taskArray);
      console.log(taskArray)
      this.setState({
        desiredTasksArray: parsedTaskArray
      })

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


componentDidMount() {
  this.retrieveData()
}

onChangeText = text => this.setState({ text })

 render() {

 return (
   <ScrollView style={styles.container}>

     <Text style = {styles.textStyle}>Did you complete your tasks for the day?</Text>
 
     <Text>Just Added:</Text>
 
 {this.state.desiredTasksArray.map((screenObject, i) =>(
         
         <View style={styles.objectContainer}>

            <View style={styles.pointContainer}>
              <Text style={styles.pointText}>{screenObject.pointValue}</Text>
             </View>
                  
            <View style={styles.pointContainer}>
              <Text style={styles.pointText}>{screenObject.activity}</Text>
            </View>  

            <View style = {styles.pointContainer}>
 
            <TouchableOpacity 
              onPress = {() => {
                global.globalDesiredTasksArray.splice(i, 1);
                this.state.desiredTasksArray.splice(i, 1);
                this.setState({
                  desiredTasksArray: this.state.desiredTasksArray
                })
                

                try {
                  const value = AsyncStorage.getItem(STORAGE_KEY)
                  if(value != null) {
                    value.splice(i,1)
                    AsyncStorage.setItem(STORAGE_KEY, value);
                  }
                } catch(exception) {
                  alert("Unable to remove item")
                }
              }}
            >

            <View style = {styles.redButton}>
            <Text style = {styles.buttonText}>Pop</Text>
            </View>
            </TouchableOpacity>
    
            </View>

         </View>
  ))}

<Text>Self-Care Task Options</Text>
{this.state.activityList.map((screenObject, i, activityList) =>(
         
         <View style={styles.objectContainer}>
            <View style={styles.pointContainer}>
              <Text style={styles.pointText}>{screenObject.pointValue}</Text>
             </View>
                  
            <View style={styles.pointContainer}>
              <Text style={styles.pointText}>{screenObject.activity}</Text>
            </View>  

            <View style = {styles.pointContainer}>
            <TouchableOpacity 
              onPress = {() => {
                this.state.activityList[i].toggled = !this.state.activityList[i].toggled

                if(this.state.activityList[i].toggled) {
                  this.state.desiredTasksArray.push(activityList[i]);
                  global.globalDesiredTasksArray.push(activityList[i]);
                this.setState({
                  desiredTasksArray: this.state.desiredTasksArray,
                })
              }

              
                const onSave = this.save
                onSave(this.state.desiredTasksArray)
              }
            }
            >

        <View style = {
          {backgroundColor: activityList[i].toggled ? "red": "green",
          justifyContent: "center",
          alignItems: "center",
          height: windowHeight/10,
          width: windowWidth/4, 
          borderRadius: 10}
        }
        >

          <Text style = {styles.buttonText}>Push</Text>
        </View>

            </TouchableOpacity>
            </View>
            
            </View>

  ))}

  <TouchableOpacity
    onPress = {this.removeEverything}  
  >
     <View style = {styles.clearButton}>
        <Text style = {styles.buttonText}>
          Clear Tasks
        </Text>
     </View>
     </TouchableOpacity>
 
   </ScrollView>
 );
}
}


 
const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth
  },
  pointContainer: {
    width: windowWidth/4,
    height: windowHeight/3,
    alignItems: 'center',
    justifyContent: 'center',
},
pointText: {
  textAlign: 'center',
  fontFamily: 'Arial',
  fontSize: 20
},
objectContainer: {
  flexDirection: 'row',
  width: windowWidth,
  height: windowHeight/8,
  alignItems: 'center',
  justifyContent: 'center',
  //borderBottomWidth: 1,
  borderBottomColor: 'white',
  backgroundColor: '#ADFCFF',
},
 redButton: {
  backgroundColor: "red",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  height: windowHeight/10,
  width: windowWidth/4
},
greenButton: {
  
},
buttonText: {
  color: 'white',
  fontSize: 14
},
 clearButton: {
  backgroundColor: "#5233ff",
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
  height: windowHeight/10,
  width: windowWidth/4, 
  borderRadius: 10
 }
});
 
export default SelfCareListScreen;
 

