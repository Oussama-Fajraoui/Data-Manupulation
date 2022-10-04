import React, { useState, useEffect} from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Modal } from 'react-native'
import axios from "axios";


const App = () => {


  const [List,setList] = useState([]);
  const [Visible,setVisible] = useState(false);
  const [courseName,setCourseName] = useState("");
  const [coursePrice,setCoursePrice] = useState("")
  const [description,setDescription] = useState("");
  const [status,setStatus] = useState(1);
  const [hideId,setHideId] = useState(null)


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
      setList(res.data);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  //DELETE :

  const handleDelete = (item) => {
    axios({
      url: "https://nitc.cleverapps.io/api/courses/"+item.course_id,
      method: "DELETE"
    })
    .then((response) => {
      var res = response.data;
      getList();
    })
  }


  //EDIT :

  const handleEdit = (item) => {
    setVisible(true)
    setHideId(item.course_id)
    setCourseName(item.name)
    setCoursePrice(item.price)
    setDescription(item.description)
    setStatus(item.status)
  }

  const handleSave = () => {
    if(hideId == null) {
      var data = {
        "name": courseName,
        "price": Number(coursePrice) || 0,
        "description": description,
        "status": Number(status) || 0,
      }
      axios({
        url: "https://nitc.cleverapps.io/api/courses/",
        method: "POST",
        data: data,
        headers: {
          "Content-Type" : "application/json"
        }
      })
      .then((response) => {
        getList();
        setCourseName("")
        setCoursePrice(0)
        setDescription("")
        setStatus(1)
        setVisible(false)
      })
    }else {
      var data = {
        "course_id" : hideId,
        "name": courseName,
        "price": Number(coursePrice) || 0,
        "description": description,
        "status": Number(status) || 0,
      }
      axios({
        url: "https://nitc.cleverapps.io/api/courses/",
        method: "PUT",
        data: data,
        headers: {
          "Content-Type" : "application/json"
        }
      })
      .then((response) => {
        getList();
        setCourseName("")
        setCoursePrice(0)
        setDescription("")
        setStatus(1)
        setVisible(false)
      })
    }
    
  }

  const handleVisibleModal = () => {
    setVisible(!Visible)
    setHideId(null)
  }



  const onChangeName = (value) => {
    setCourseName(value)
    }

  const onChangePrice = (value) => {
    setCoursePrice(value)
  }

  const onChangeDescription = (value) => {
    setDescription(value)
  }

  const onChangeStatus = (value) => {
    setStatus(value)
  }

 



  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <Text style={styles.txt_main}>Course {List.length}</Text>
          <TouchableOpacity
          onPress={handleVisibleModal}
          style={styles.btnNewContainer}
          >
            <Text style={styles.textButton}>
              New Course
            </Text>
          </TouchableOpacity>
      </View>
      <Modal
      animationType='slide'
      visible={Visible}
      >
        <SafeAreaView>
          <View style={styles.form}>
            <TouchableOpacity
            onPress={handleVisibleModal}
            >
              <Text style={styles.txtClose}>
                Close
              </Text>
            </TouchableOpacity>
            <Text>{hideId},</Text>
            <Text>{courseName},</Text>
            <Text>{coursePrice},</Text>
            <Text>{description},</Text>
            <Text>{status}</Text>
            <TextInput 
            value={courseName}
            style={styles.text_input}
            placeholder="Course Name"
            onChangeText={onChangeName}
            />
            <TextInput 
            value={coursePrice}
            style={styles.text_input}
            placeholder="Course Price"
            onChangeText={onChangePrice}
            />
            <TextInput 
            value={description}
            style={styles.text_input}
            placeholder="Description"
            onChangeText={onChangeDescription}

            />
            <TextInput 
            value={status}
            style={styles.text_input}
            placeholder="Status"
            onChangeText={onChangeStatus}

            />
            <TouchableOpacity
            onPress={handleSave}
            style={styles.btnContainer}
            >
              <Text style={styles.textButton}>
                {hideId == null ? "Save" : "Update"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <ScrollView>
        {List.map((item,index)=>{
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
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default App

const styles= StyleSheet.create({
  form: {
    padding: 15,
    marginTop: 10
  },
  txtClose: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "right"
  },
  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 10
  },
  header_container: {
    padding: 15,
    backgroundColor: "#eeeeee",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  txt_main: {

  }
})
