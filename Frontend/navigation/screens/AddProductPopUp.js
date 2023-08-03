import * as React from "react";
import { Button, Pressable, Text, StyleSheet, View, TextInput, Alert, Keyboard } from 'react-native';
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';

export const TabOneScreen = () => {

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  return (
	<View style={{flex:0, alignItems: "flex-end", justifyContent: "center", margin: 5}}>
      <Button title="Add item" onPress={handleModal} />
      <AddProductForm visible={isModalVisible} handleClose={handleModal} />
    </View>
  );
}

const AddProductForm = ({ visible, handleClose }) => {
	const [number, setNumber] = React.useState('');

	const onChangeNumber = (text) => {
		let newText = '';
		let numbers = '0123456789';

		for (var i=0; i < text.length; i++) {
			if(numbers.indexOf(text[i]) > -1 )
				newText = newText + text[i];
			else
				alert("Please enter numbers only");
		}
		setNumber(newText);
	}

	const handleAdd = () => {
		if (number.length == 0) {
			Alert.alert("Please, input the item quantity", number,
				[{ text: "OK", onPress: () => console.log("OK Pressed") }],
			);
			setNumber('');
			Keyboard.dismiss();
		}
		else {
			handleClose()
			Alert.alert("Items added", null, [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
		}
	}

	const [date, setDate] = React.useState(new Date());
	const [mode, setMode] = React.useState('date');
	const [show, setShow] = React.useState(false);

	const onChangeDate = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	const showDatepicker = () => {
		setShow(true);
		setMode('date');
	  };

    return (
    <Modal isVisible={visible} animationIn={'zoomIn'} animationOut={'zoomOut'}>
        <View style={{ flex: 0, backgroundColor:'blue', borderRadius: 10 }}>

			<TextInput style={styles.textInput} placeholder="Product name" />
			
			<TextInput
				keyboardType='numeric'
				onChangeText={text => onChangeNumber(text)}
				value={number}
				style={styles.textInput}
				placeholder='Item quantity'
				maxLength={4}
			/>

			<Pressable style={{...styles.button, backgroundColor: 'blue'}} onPress={showDatepicker}>
				<Text style={styles.text}>Expiration date: {date.toLocaleDateString('es')} 📅</Text>
			</Pressable>


			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode={mode}
					is24Hour={true}
					onChange={onChangeDate}
				/>
			)}
			
			<Pressable style={{...styles.button, backgroundColor: 'green'}} onPress={handleAdd}>
				<Text style={styles.text}>Add</Text>
			</Pressable>

			<Pressable style={{...styles.button, backgroundColor: 'red'}} onPress={handleClose}>
				<Text style={styles.text}>Cancel</Text>
			</Pressable>
				
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 3,
      margin: 5
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    textInput: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'black',
      fontSize: 15,
      margin: 5,
      backgroundColor: 'white',
      borderRadius: 10,
    }
  });