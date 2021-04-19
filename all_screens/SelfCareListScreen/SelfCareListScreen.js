import React, { Component } from "react";
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity, Switch } from "react-native";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 //this wouldn't work great but could use one storage key 
 //store entire desiredTasksArray (from points screen) in that one

 //plan b: save the global array in async storage, use on submit with the save button
 //could atleast get the point compilation part done
const STORAGE_KEY = '@saveDesiredTasks'

class SelfCareListScreen extends React.Component {

  state = {
    activityList: 
    [
      {
      pointValue: 15,
      activity: 'Biking',
      toggled: true
  },
  {
      pointValue: 20,
      activity: 'Walking',
      toggled: true
  },
  {
      pointValue: 25,
      activity: 'Running',
      toggled: false
  },
{
    pointValue: 15,
    activity: 'Journal',
    toggled: false
},
{
    pointValue: 20,
    activity: 'Podcast',
    toggled: false
},
{
    pointValue: 25,
    activity: 'Listen to Music',
    toggled: false
},
{
  pointValue: 25,
  activity: 'Draw',
  toggled: false
},
{
  pointValue: 25,
  activity: 'Yoga',
  toggled: false
},

{
  pointValue: 25,
  activity: 'Meditate',
  toggled: false
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
         
         <View style={styles.screenBreakListContainer}>
            <View style={styles.pointValueContainer}>
              <Text style={styles.textStyle}>{screenObject.pointValue}</Text>
             </View>
                  
            <View style={styles.pointContainer}>
              <Text style={styles.textStyle}>{screenObject.activity}</Text>
            </View>  

            <View style = {styles.buttonContainer}>
 
            <View style = {styles.innerButtonContainer}>
            <TouchableOpacity 
              style = {styles.redButton}
              onPress = {() => {
                global.globalDesiredTasksArray.splice(i, 1);
                this.state.desiredTasksArray.splice(i, 1);
                this.setState({
                  desiredTasksArray: this.state.desiredTasksArray
                })
              }}
            >
              <Text style = {styles.buttonText}>Pop</Text>
            </TouchableOpacity>

              </View>
            </View>

         </View>
  ))}

<Text>Self-Care Task Options</Text>
{this.state.activityList.map((screenObject, i, activityList) =>(
         
         <View style={styles.screenBreakListContainer}>
            <View style={styles.pointValueContainer}>
              <Text style={styles.textStyle}>{screenObject.pointValue}</Text>
             </View>
                  
            <View style={styles.pointContainer}>
              <Text style={styles.textStyle}>{screenObject.activity}</Text>
            </View>  

            <View style = {styles.buttonContainer}>

              <View style = {styles.innerButtonContainer}>
 
            <TouchableOpacity 
              style = {styles.greenButton} 
              onPress = {() => {
                this.state.desiredTasksArray.push(activityList[i]);
                global.globalDesiredTasksArray.push(activityList[i]);
                this.setState({
                  desiredTasksArray: this.state.desiredTasksArray
                })
                const onSave = this.save
                onSave(this.state.desiredTasksArray)
              }
            }
            >
              <Text style = {styles.buttonText}>Push</Text>
            </TouchableOpacity>

            </View>
            
            </View>
         </View>
  ))}

  <TouchableOpacity>
     <View style = {styles.saveButton}>
        <Text style = {styles.buttonText}>
          Save
        </Text>
     </View>
     </TouchableOpacity>
 
   </ScrollView>
 );
}
}


 
const styles = StyleSheet.create({
 container: {
   flex: 1
 },
titleText: {
  fontSize: 15,
  fontWeight: 'bold'
},
 screenBreakListContainer: {
   flexDirection: 'row',
   borderBottomWidth: 1,
   borderBottomColor: 'white',
   backgroundColor: '#D3FAFF',
},
pointValueContainer: {
   flex: 1,
   height: 75,
   alignItems: 'center',
   justifyContent: 'center'
},
middleContainer: {
   flex: 1,
   margin: 10,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center'
},
pointContainer: {
  width: windowWidth/4,
  height: windowHeight/3,
  alignItems: 'center',
  justifyContent: 'center',
  margin: 1
},
textStyle: {
   color: 'black',
   fontSize: 20,
   textAlign: 'center'
},
greenButton: {
   justifyContent: "center",
   alignItems: "center",
   margin: 10,
   borderRadius: 10,
   backgroundColor: "green",
   height: windowHeight/10
},
 
 redButton: {
   backgroundColor: "red",
   justifyContent: "center",
   alignItems: "center",
   margin: 10,
   borderRadius: 10,
   height: windowHeight/10
 },
 
buttonContainer: {
  height: windowHeight/10,
  width: windowWidth/3,
  flexDirection: 'row'
},

 buttonText: {
   color: 'white',
   fontSize: 14
 },
 innerButtonContainer: {
   height: windowHeight,
   width: windowWidth/3,
 },
 saveButton: {
  backgroundColor: "#5233ff",
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
  borderRadius: 10,
  height: windowHeight/10,
  width: windowWidth/4
 }
});
 
export default SelfCareListScreen;
 

