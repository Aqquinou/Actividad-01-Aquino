import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Image, Input, Button } from '@rneui/base';
import { isEmpty } from "lodash";
import { Icon } from '@rneui/base';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CreateAccount from "./CreateAccount";

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = () => {
    if (isEmpty(email) || isEmpty(password)) {
      setError({
        email: "Email is required",
        password: "Password is required",
      });
    } else {
      setError({ email: "", password: "" });
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User logged in:", userCredential.user);
        })
        .catch((error) => {
          console.log("Login error:", error.message);
        });
    }
  };

  if (showRegister) return <CreateAccount backtoLogin={() => setShowRegister(false)} />;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/pfp.jpg')}
        style={{ width: 100, height: 100}}
      />

      <View style={{ margin: 16 }}>
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

        <Button title="Login" onPress={handleLogin} />

        <Button
          type="clear"
          title="Create account"
          onPress={() => setShowRegister(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});