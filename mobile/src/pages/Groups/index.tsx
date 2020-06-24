import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';
import api from '../../services/api';

import {
  Container,
  Title,
  Description,
  Map,
  MapContainer,
  MapMarker,
  MapMarkerContainer,
  MapMarkerTitle,
  ActivitiesContainer,
  Activity,
  ActivityTitle,
  Triangle,
} from './styles';

interface Activity {
  id: number;
  title: string;
  image_url: string;
}

interface Group {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface Params {
  uf: string;
  city: string;
}

const Groups: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
  const [initalPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  function handleNavigationBack(): void {
    navigation.goBack();
  }

  useEffect(() => {
    async function loadPosition(): Promise<void> {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Ops!',
          'Precisamos de sua permissão para obter a localização',
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    api.get('activities').then((response: any) => {
      setActivities(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get('classes', {
        params: {
          city: routeParams.city,
          uf: routeParams.uf,
          activities: selectedActivities,
        },
      })
      .then((response: any) => {
        setGroups(response.data);
      });
  }, [selectedActivities, routeParams.uf, routeParams.city]);

  function handleNavigationToDetail(id: number): void {
    navigation.navigate('Detail', { class_id: id });
  }

  function handleSelectedActivity(id: number): void {
    const alreadySelected = selectedActivities.findIndex(
      activity => activity === id,
    );

    if (alreadySelected >= 0) {
      const filteredActivitys = selectedActivities.filter(
        activity => activity !== id,
      );

      setSelectedActivities(filteredActivitys);
    } else {
      setSelectedActivities([...selectedActivities, id]);
    }
  }

  return (
    <>
      <Container>
        <TouchableOpacity onPress={handleNavigationBack}>
          <Icon name="arrow-left" size={24} color="#50D06F" />
        </TouchableOpacity>

        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa uma turma fitness!</Description>

        <MapContainer>
          {initalPosition[0] !== 0 && (
            <Map
              loadingEnabled={initalPosition[0] === 0}
              initialRegion={{
                latitude: initalPosition[0],
                longitude: initalPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {groups.map(group => (
                <MapMarker
                  key={String(group.id)}
                  onPress={() => handleNavigationToDetail(group.id)}
                  coordinate={{
                    latitude: group.latitude,
                    longitude: group.longitude,
                  }}
                >
                  <MapMarkerContainer>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{ uri: group.image_url }}
                    />
                    <MapMarkerTitle>{group.name}</MapMarkerTitle>
                  </MapMarkerContainer>
                  <Triangle />
                </MapMarker>
              ))}
            </Map>
          )}
        </MapContainer>
      </Container>
      <ActivitiesContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {activities.map(activity => (
            <Activity
              style={[
                selectedActivities.includes(activity.id)
                  ? styles.selectedItem
                  : {},
              ]}
              key={String(activity.id)}
              onPress={() => handleSelectedActivity(activity.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={activity.image_url} />
              <ActivityTitle>{activity.title}</ActivityTitle>
            </Activity>
          ))}
        </ScrollView>
      </ActivitiesContainer>
    </>
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    borderColor: '#50d06f',
    borderWidth: 2,
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },
});

export default Groups;
