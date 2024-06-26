
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Input({placeHolder, setValor, clave, setTextChange}) {

return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#FFF'}
    secureTextEntry={clave} 
    onChangeText={setTextChange}
    />

    );
}

const styles = StyleSheet.create({
    Input: {
        color: "#fff", 
        fontWeight:'800',
        height: 55, // Ajusta la altura según sea necesario
        borderRadius: 20, // Redondeo de los bordes
        borderColor: 'white',
        borderWidth: 4,
        backgroundColor: '#0A2B32', // Color de fondo del input
        paddingHorizontal: 15,
        marginBottom: 20,
        color: '#ffffff',
    },

});