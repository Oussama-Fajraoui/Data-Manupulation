import React, { useState, useEffect} from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Modal } from 'react-native'
import axios from "axios";


const App = () => {


  const [List,setList] = useState([]);
  const [Visible,setVisible] = useState(false);

  //ComponentDidMount :

  useEffect(()=> {
    getList()
  },[]);


  //GET :
  const getList = () => {
    axios({
      url: "https://nitc.cleverapps.io/api/courses",
      method: "GET"
    })
    .then((response) => {
      console.log(response);
      var res = response.data;
      setList(response.data);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  //DELETE :

  const handleDelete = (item) => {
    axios({
      url: "https://nitc.cleverapps.io/api/courses"+item.course_id,
      method: "DELETE"
    })
    .then((response) => {
      var res = response.data;
      getList();
    })
  }

  //EDIT :
  const handleEdit = (item) => {
    axios({
      url: "",
      method: "UPDATE"
    })
  }


 



  return (
    <View>
      <ScrollView>
        {List.map((item,index)=> {
          return (
            <View style={styles.item_course} key={index}>
              <View>
              <Text style={styles.txt_name}>{index+1}. {item.name}</Text>
              <Text style={styles.txt_item}>{item.price}</Text>
              <Text style={styles.txt_item}>{item.description}</Text>
              <Text style={item.status === 1 ? styles.txt_enabled : styles.txt_disabled}>{item.status === 1 ? "Enabled" : "Disabled"}</Text>
              </View>
              <View>
                <TouchableOpacity
                onPress={() => handleDelete(item)}
                >
                  <Text style={styles.txt_del}> Delete </Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => handleEdit(item)}
                >
                  <Text style={styles.txt_edit}> Edit </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })

        }
      </ScrollView>
    </View>
  )
}

export default App

const styles= StyleSheet.create({

})
