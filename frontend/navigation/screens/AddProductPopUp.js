import * as React from "react";
import { Button, Pressable, Text, StyleSheet, View, TextInput, Alert, Keyboard } from 'react-native';
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../Styles'
import { host } from './QueryTable'

export const AddProductPopUp = () => {

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
	// -------------- Item Name -------------------------
	const [prodName, setProdName] = React.useState('');

	// -------------- Item Quantity ---------------------
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

	// -------------- Expiration Date ---------------------
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


	// -------------- Add Item ---------------------
	const handleAdd = async () => {
		if (number.length == 0) {
			Alert.alert("Please, input the item quantity", number,
				[{ text: "OK", onPress: () => console.log("OK Pressed") }],
			);
			setNumber('');
			Keyboard.dismiss();
		}
		else {
			handleClose()
			const response = await fetch(`${host}/addItem?Name=${prodName}&Quantity=${number}&ExprDate=${date.toISOString()}`, {
				method: 'POST',
				headers: {
					Accept: 'text/plain',
					'Content-type': 'application/json'
				},
			});
			if (!response.ok) {
				console.log("error")
				throw new Error(`Error! status: ${response.status}`);
			}
			res = await response.text();
			Alert.alert(res, null, [{ text: "OK", onPress: () => console.log("OK Pressed") }]); 
			
		}
	}

    return (
    <Modal isVisible={visible} animationIn={'zoomIn'} animationOut={'zoomOut'}>
        <View style={styles.popUp}>

			<TextInput style={styles.textInput} value={prodName} onChangeText={setProdName} placeholder="Product name" />
			
			<TextInput
				keyboardType='numeric'
				onChangeText={text => onChangeNumber(text)}
				value={number}
				style={styles.textInput}
				placeholder='Item quantity'
				maxLength={4}
			/>

			<Pressable style={{...styles.button, backgroundColor: 'grey'}} onPress={showDatepicker}>
				<Text style={styles.buttonText}>Expiration date: {date.toLocaleDateString('es')} 📅</Text>
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
				<Text style={styles.buttonText}>Add</Text>
			</Pressable>

			<Pressable style={{...styles.button, backgroundColor: 'red'}} onPress={handleClose}>
				<Text style={styles.buttonText}>Cancel</Text>
			</Pressable>
				
        </View>
    </Modal>
    )
}