
import { StyleSheet, Text, View,TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'; // Dependencia para el texto de telefono, esto es para poder utilizar una maskara de dijitos

export default function Input({placeHolder, setValor, clave, setTextChange}) {

return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#000'}
    secureTextEntry={clave} 
    onChangeText={setTextChange}
    />

    );
}

const styles = StyleSheet.create({
    Input: {
        color: "black", 
        fontWeight:'900',
        width: 280,
        height: 60, // Ajusta la altura según sea necesario
        borderRadius: 20, // Redondeo de los bordes
        borderColor: 'black',
        borderWidth: 4,
        backgroundColor: '#FFFFFF', // Color de fondo del input
        paddingHorizontal: 19,
        marginBottom: 4,
        fontSize: 17,
    },

});