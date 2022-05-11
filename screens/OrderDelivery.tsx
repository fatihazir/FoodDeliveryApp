import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { AnimatedRegion, LatLng, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { CurrentLocationModel, RestaurantDataModel } from './Home';
import { COLORS, icons } from '../constants';

interface OrderDeliveryPropsModel {
  route: {
    params: {
      currentLocation: CurrentLocationModel
      restaurant: RestaurantDataModel
    }
  }
}

export default function OrderDelivery(props: OrderDeliveryPropsModel) {
  const [restaurant, setRestaurant] = React.useState<RestaurantDataModel>()
  const [currentLocation, setCurrentLocation] = React.useState<CurrentLocationModel>()
  const [fromLocation, setFromLocation] = React.useState<LatLng>()
  const [toLocation, setToLocation] = React.useState<LatLng>()
  const [region, setRegion] = React.useState<Region>()
  const [street, setStreet] = React.useState<string>()

  React.useEffect(() => {
    let { currentLocation, restaurant } = props.route.params
    let fromLoc = currentLocation.gps
    let toLoc = restaurant.location
    let street = currentLocation.streetName

    let mapRegion: Region = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
    }

    setRestaurant(restaurant)
    setStreet(street)
    setFromLocation(fromLoc)
    setToLocation(toLoc)
    setRegion(mapRegion)
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        cacheEnabled={false}
      >

        <Marker
          //@ts-ignore
          coordinate={toLocation}>
          <View style={styles.toLocationMarker}>
            <View style={styles.toLocationInside}>
              <Image source={icons.pin} style={styles.pin} />
            </View>
          </View>
        </Marker>

        <Marker
          //@ts-ignore
          coordinate={fromLocation}
          anchor={{ x: 0.5, y: 0.5 }}
          flat={true}>
          <Image source={icons.car} style={styles.car}/>
        </Marker>
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toLocationMarker: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white
  },
  toLocationInside: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary
  },
  pin: {
    width: 25,
    height: 25,
    tintColor: COLORS.white
  },
  car:{
    width: 25,
    height: 25,
  }
})
 