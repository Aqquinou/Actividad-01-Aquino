import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Image, Input, Button } from '@rneui/base';
import { isEmpty } from "lodash";
import { Icon } from '@rneui/base';
import { Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export default function CreateAccount({ backtoLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ email: "", password: "", passwordConfirmation: "" });
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(true);

  const handleRegister = () => {
    let newErrors = { email: "", password: "", passwordConfirmation: "" };

    if (isEmpty(email)) newErrors.email = "El correo electrónico es requerido";
    if (isEmpty(password)) newErrors.password = "La contraseña es requerida";
    if (isEmpty(passwordConfirmation)) newErrors.passwordConfirmation = "La confirmación de contraseña es requerida";
    if (password !== passwordConfirmation) {
      newErrors.password = "Las contraseñas deben coincidir";
      newErrors.passwordConfirmation = "Las contraseñas deben coincidir";
    }

    setError(newErrors);

    if (Object.values(newErrors).every(error => error === "")) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Usuario registrado:", userCredential.user);
          signOut(auth).then(() => {
            Alert.alert(
                "Registro Exitoso",
                "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
                [{ text: "OK", onPress: backtoLogin }]
            );
          });
        })
        .catch((error) => {
          console.log("Error de registro:", error.message);
          setError(prev => ({ ...prev, email: "Error al crear la cuenta" }));
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/pfp.jpg')} style={{ width: 100, height: 100}} />
      <Input
        placeholder="Email"
        label="Email"
        keyboardType="email-address"
        inputContainerStyle={{ width: "100%" }}
        onChange={({ nativeEvent: { text } }) => setEmail(text)}
        errorMessage={error.email}
      />
      <Input
        placeholder="Password"
        label="Password"
        inputContainerStyle={{ width: '100%' }}
        secureTextEntry={showPassword}
        onChange={({ nativeEvent: { text } }) => setPassword(text)}
        errorMessage={error.password}
        rightIcon={
          <Icon
            onPress={() => setShowPassword(!showPassword)}
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
          />
        }
      />
      <Input
        placeholder="Confirm Password"
        label="Confirm Password"
        inputContainerStyle={{ width: '100%' }}
        secureTextEntry={showPasswordConfirmation}
        onChange={({ nativeEvent: { text } }) => setPasswordConfirmation(text)}
        errorMessage={error.passwordConfirmation}
        rightIcon={
          <Icon
            onPress={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
            type="material-community"
            name={showPasswordConfirmation ? "eye-outline" : "eye-off-outline"}
          />
        }
      />
      <Button title="Sign up" onPress={handleRegister} />
      <Button type="clear" title="Login" onPress={backtoLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});