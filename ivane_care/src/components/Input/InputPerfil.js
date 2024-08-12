import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Input({ placeHolder, value, clave, onChangeText }) {

    return (
        <TextInput
            style={styles.Input}
            placeholder={placeHolder}
            value={value}
            placeholderTextColor={'#000'}
            secureTextEntry={clave}
            onChangeText={onChangeText}
        />

    );
}

const styles = StyleSheet.create({
    Input: {
        color: "black",
        fontWeight: '900',
        width: 300,
        height: 55, // Ajusta la altura según sea necesario
        borderRadius: 20, // Redondeo de los bordes
        borderColor: 'black',
        borderWidth: 4,
        backgroundColor: '#FFFFFF', // Color de fondo del input
        paddingHorizontal: 19,
        fontSize: 17,
    },


});