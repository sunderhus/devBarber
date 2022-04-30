import styled from 'styled-components/native';


export const Container = styled.SafeAreaView`
  flex: 1;
  background: #63C2D1;
`;

export const LogoutButton = styled.TouchableOpacity`
  background: #4eadbe;
  padding: 15px;
  align-items: center;
  justify-content: center;
  margin: 32px 16px;
  border-radius: 10px;
  margin-top: auto;
`;

export const LogoutButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;


export const ProfileTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
`;

export const ProfileTopButton = styled.TouchableOpacity``;

export const ProfileTopText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #fff;
`;
