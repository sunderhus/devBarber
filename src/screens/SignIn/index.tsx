import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import SignInput from '../../components/SignInput';
import { SignInParams, SignInResponse } from '../../services/authentication';
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
  authenticate(
    params: SignInParams
  ): Promise<SignInResponse>
}

const SignIn = ({ authenticate }: Props) => {
  const navigation = useNavigation();
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignIn = async () => {
    if (emailField === '' || passwordField === '') {
      Alert.alert('Preencha os campos!');
      return;
    }

    const response = await authenticate({
      email: emailField,
      password: passwordField
    });

    if (!response.token) {
      Alert.alert('Email e/ou senha errados');
      return;
    }

    await AsyncStorage.setItem('@DevBarber_token', response.token);
    navigation.reset({
      routes: [{ name: 'MainTab' }]
    });
  };

  const handleMessageButtonCLick = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu email"
          value={emailField}
          onChangeText={(text: string) => setEmailField(text)}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={(text: string) => setPasswordField(text)}
          password
        />
        <CustomButton onPress={handleSignIn}>
          <CustomButtonText>Login</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonCLick}>
        <SignMessageButtonText>
          Ainda não possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};

export default SignIn;
