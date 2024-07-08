import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Input({ placeHolder, setValor, clave, setTextChange }) {


    const handleTextChange = (text) => {
        // Filtra solo números
        const numericText = text.replace(/[^0-9]/g, '');
        setTextChange(numericText);
    };
    return (

        <TextInput
            style={styles.Input}
            placeholder={placeHolder}
            value={setValor}
            placeholderTextColor={'#000'}
            secureTextEntry={clave}
            onChangeText={handleTextChange}
            keyboardType='numeric' // Acepta solo entrada numérica
        />

    );
}

const styles = StyleSheet.create({
    Input: {
        color: "black",
        fontWeight: '600',
        width: 200,
        height: 40, // Ajusta la altura según sea necesario
        borderRadius: 20, // Redondeo de los bordes
        borderColor: '#0E333B',
        borderWidth: 4,
        backgroundColor: '#FFFFFF', // Color de fondo del input
        paddingHorizontal: 19,
        fontSize: 17,
    },
    

});