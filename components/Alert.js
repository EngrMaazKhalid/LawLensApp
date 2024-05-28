import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const Alert = ({ visible, title, message, onClose,otherStyles, func }) => {
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
          <View className="flex-row justify-around">
          <TouchableOpacity className={` p-2 rounded-xl w-20 shadow-md ${otherStyles}`}  onPress={func}>
            <Text className='font-psemibold text-base text-white text-center'>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity className={` p-2 border-2 border-secondary rounded-xl w-20 shadow-md ${otherStyles}`} onPress={onClose}>
            <Text className='font-psemibold text-base text-white text-center'>Cancel</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  
  modalView: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});

export default Alert;
