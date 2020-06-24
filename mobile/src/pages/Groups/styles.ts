import styled from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';

export const Container = styled.View`
  flex: 1;
  padding: 0 32px;
  padding-top: 64px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Ubuntu_700Bold';
  margin-top: 24px;
  color: #fff;
`;

export const Description = styled.Text`
  color: #6c6c6c;
  font-size: 16px;
  margin-top: 4px;
  font-family: 'Saira_400Regular';
`;

export const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const MapMarker = styled(Marker)`
  width: 90px;
  height: 80px;
`;

export const MapMarkerContainer = styled.View`
  width: 90px;
  height: 70px;
  background-color: #000;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
`;

export const Triangle = styled.View`
  transform: rotate(180deg);
  width: 0;
  height: 0;
  margin: 0 auto;
  background-color: transparent;
  border-style: solid;
  border-left-width: 7px;
  border-right-width: 7px;
  border-bottom-width: 7px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: #000;
`;

export const MapMarkerTitle = styled.Text`
  flex: 1;
  font-family: 'Saira_400Regular';
  color: #fff;
  text-align: center;
  font-size: 13px;
  line-height: 23px;
`;

export const ActivitiesContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const Activity = styled.TouchableOpacity`
  background-color: #171717;
  border: 2px;
  border-color: #171717;
  height: 120px;
  width: 120px;
  border-radius: 8px;
  padding: 0 16px;
  padding-top: 20px;
  padding-bottom: 16px;
  margin-right: 8px;
  align-items: center;
  justify-content: space-between;

  text-align: center;
`;

export const ActivityTitle = styled.Text`
  font-family: 'Saira_400Regular';
  text-align: center;
  font-size: 13px;
  color: #fff;
`;
