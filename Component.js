import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// card functions
export const Card = ({title, removeHandler}) => {
  return (
    <View style={styles.card}>
      <Text style={{fontSize: 18}}>{title} </Text>
      <TouchableOpacity onPress={removeHandler} style={styles.removebutton}>
        <Text style={{color: '#fff'}}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

const Component = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [showModal, setShowModal] = useState(false);

  const pressHandler = (id) => {
    //   console.log(id+"id panga");
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id != id);
    });
  };

  return (
    <View>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Todo"
            style={styles.input}
            onChangeText={val => {
              setTask(val);
            }}
          />
          <TouchableOpacity
            style={styles.addbutton}
            onPress={() => {
              setTodos(currentTodos => {
                return [
                  {id: currentTodos.length + 1, todo: task},
                  ...currentTodos,
                ];
              });
            //   console.log(todos);
              setShowModal(false);
            }}>
            <Text style={{color: '#fff'}}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={{fontSize: 22, textAlign: 'center'}}>Todo List</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addbutton}
          onPress={() => {
            setShowModal(true);
            // console.log('show modal');
          }}>
          <Text style={{color: 'black', fontSize: 16}}>Add Todo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.todolists}>
        <FlatList
          data={todos}
          keyExtractor={({id}, index) => id.toString()}
          renderItem={({item}) => (
            <Card
              title={item.todo}
              removeHandler={()=>{
                //   console.log(item.id)
                pressHandler(item.id);
              }}
            />
          )}
        />
      </View>
    </View>
  );
};
export default Component;

// STYLESSSSS

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'skyblue',
    padding: 15,
  },
  todolists: {padding: 15},
  addbutton: {
    backgroundColor: 'skyblue',
    borderRadius: 10,
    padding: 15,
  },
  removebutton: {
    backgroundColor: '#DC143C',
    padding: 8,
    borderRadius: 10,
  },
  card: {
    borderColor: '#333',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    alignItems: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#DC143C',
    borderRadius: 8,
    marginTop: 10,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    width: 200,
    marginTop: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
});
