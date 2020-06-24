import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 32px;
  padding-top: 64px;
`;

export const ClassImage = styled.Image`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  margin-top: 32px;
`;

export const ClassName = styled.Text`
  color: #fff;
  font-size: 30px;
  font-family: 'Ubuntu_700Bold';
  margin-top: 24px;
`;

export const ClassActivities = styled.Text`
  font-family: 'Saira_600SemiBold';
  font-size: 15px;
  line-height: 24px;
  margin-top: 8px;
  color: #50d06f;
`;

export const Address = styled.View`
  margin-top: 32px;
`;

export const AddressTitle = styled.Text`
  color: #fff;
  font-family: 'Ubuntu_700Bold';
  font-size: 16px;
`;

export const AddressContent = styled.Text`
  font-family: 'Saira_400Regular';
  line-height: 24px;
  margin-top: 8px;
  color: #6c6c6c;
`;

export const Footer = styled.View`
  border-top-width: ${StyleSheet.hairlineWidth}px;
  background-color: #171717;
  padding: 32px 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled(RectButton)`
  width: 48%;
  background-color: #50d06f;
  border-radius: 10px;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  margin-left: 8px;
  color: #fff;
  font-size: 16px;
  font-family: 'Saira_500Medium';
`;
