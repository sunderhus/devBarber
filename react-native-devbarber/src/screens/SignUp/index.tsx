import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import ProfileIcon from '../../assets/person.svg';
import SignInput from '../../components/SignInput';
import { RegisterAccountParams, RegisterAccountResponse } from '../../services/registerAccount';
import {
  Container,
  CustomButton,
  CustomButtonText,
  InputArea,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold
} from './styles';


type Props = {
  register(params: RegisterAccountParams): Promise<RegisterAccountResponse>
}

const SignUp = ({register}:Props) => {
  const navigation = useNavigation();
  const [emailField, setEmailField] = useState('' as string);
  const [passwordField, setPasswordField] = useState('');
  const [nameField, setNameField] = useState('');

  const handleSignUp = async () => {
    const isMissingFields = !nameField || !emailField || !passwordField;
    if (isMissingFields) {
      Alert.alert('Prencha todos os campos para cadastrar uma nova conta.');
      return;
    }

    const response = await register({
      name: nameField,
      email: emailField,
      password: passwordField
    });

    if (response.error) {
      Alert.alert(response.error);
      return;
    }

    await AsyncStorage.setItem('@DevBarber_token', response.token);

    navigation.reset({
      routes: [{ name: 'MainTab' }]
    });
  };

  const handleRedirectToSignIn = () => {
    navigation.reset({
      routes: [{ name: 'SignIn' }]
    });
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={ProfileIcon}
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={text => setNameField(text)}
        />
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu email"
          value={emailField}
          onChangeText={text => setEmailField(text)}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={text => setPasswordField(text)}
          password
        />
        <CustomButton onPress={handleSignUp}>
          <CustomButtonText>Cadastrar</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleRedirectToSignIn}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};

export default SignUp;
