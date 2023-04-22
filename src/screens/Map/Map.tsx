import { View } from "react-native";
import React , {useState} from "react";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

type Icoordinate = {
  latitude : number ,
  longitude : number
}

export default function Map() {
  const [coordinate , setCoordinate] = useState<Icoordinate>({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const { push } = useNavigation();
  return (
    <View className="flex-1 mt-4 flex-row flex-wrap">
      <MapView
        className="w-96 h-48"
        onPress={(e) => setCoordinate(e.nativeEvent.coordinate) }
        initialRegion={{
          ...coordinate,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={coordinate}
          title={"Test"}
        />
      </MapView>
    </View>
  );
}
