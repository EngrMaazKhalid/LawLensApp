import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const CustomAlert = ({ visible, title, message, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className='flex flex-1 justify-center items-center bg-rgba(0,0,0,0.5)'>
        <View className='w-300 bg-gray-200 rounded-lg p-8 items-center shadow-gray' style={styles.modalView} >
          <Text className='font-pmedium text-xl text-white mb-6'>{title}</Text>
          <Text className='font-pmedium text-white mb-5 text-center'>{message}</Text>
          <TouchableOpacity className='bg-red-600 p-2 rounded-xl w-20 shadow-md' onPress={onClose}>
            <Text className='font-psemibold text-base text-white text-center'>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomAlert;
