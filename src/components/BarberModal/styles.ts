import styled from 'styled-components/native';


export const Modal = styled.Modal``;

export const ModalArea = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalBody = styled.View`
  background: #83d6e3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 50%;
  padding: 10px 20px 40px 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

export const ModalItem = styled.View`
  background:  #fff;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`;

export const BarberInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BarberAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  margin-right: 15px;
`;

export const BarberName = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: bold;
`;

export const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const ServicePrice = styled(ServiceName)`
  font-size: 14px;
`;

export const FinishButton = styled.TouchableOpacity`
  background: #268596;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const FinishButtonText = styled.Text`
  color:  #fff;
  font-size: 17px;
  font-weight: bold;
`;

export const DateInfo = styled.View`
  flex-direction: row;
`;

export const DatePrevArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const DateTitleArea = styled.View`
  width: 140px;
  justify-content: center;
  align-items: center;
`;

export const DateTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #000;
`;

export const DateNextArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
`;

export const DateList = styled.ScrollView``;

export const DateItem = styled.TouchableOpacity`
  width: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px 0;
`;

export const DateItemDay = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const DateItemNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const HourItem = styled.TouchableOpacity`
  width: 75px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px 0;
`;

export const HourItemText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const HourList = styled.ScrollView``;
