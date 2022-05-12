import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { CurrentLocationModel, RestaurantDataModel } from './Home';
import { COLORS, icons, GOOGLE_API_KEY, SIZES, FONTS } from '../constants';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';

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
  const [region, setRegion] = React.useState<any>()
  const [street, setStreet] = React.useState<string>()
  const [duration, setDuration] = React.useState<number>(0)
  const [isReady, setIsReady] = React.useState<boolean>(false)
  const [angle, setAngle] = React.useState<number>(0)

  const mapView = React.useRef()

  const navigation = useNavigation();

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


  function zoomIn() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2
    }

    setRegion(newRegion)
    //@ts-ignore
    mapView.current.animateToRegion(newRegion, 200)
  }

  function zoomOut() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2
    }

    setRegion(newRegion)
    //@ts-ignore
    mapView.current.animateToRegion(newRegion, 200)
  }

  function calculateAngle(coordinates: any) {
    let startLat = coordinates[0]["latitude"]
    let startLng = coordinates[0]["longitude"]
    let endLat = coordinates[1]["latitude"]
    let endLng = coordinates[1]["longitude"]
    let dx = endLat - startLat
    let dy = endLng - startLng

    return Math.atan2(dy, dx) * 180 / Math.PI
  }

  return (
    <View style={styles.container}>
      <MapView
        //@ts-ignore
        ref={mapView}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        cacheEnabled={false}
      >
        <MapViewDirections
          origin={fromLocation}
          destination={toLocation}
          apikey={GOOGLE_API_KEY}
          strokeWidth={5}
          strokeColor={COLORS.primary}
          optimizeWaypoints={true}
          onReady={result => {
            setDuration(result.duration)

            if (!isReady) {
              // Fit route into maps
              //@ts-ignore
              mapView.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (SIZES.width / 20),
                  bottom: (SIZES.height / 4),
                  left: (SIZES.width / 20),
                  top: (SIZES.height / 8)
                }
              })

              // Reposition the car
              let nextLoc = {
                latitude: result.coordinates[0]["latitude"],
                longitude: result.coordinates[0]["longitude"]
              }

              if (result.coordinates.length >= 2) {
                let angle = calculateAngle(result.coordinates)
                setAngle(angle)
              }

              setFromLocation(nextLoc)
              setIsReady(true)
            }
          }}
        />

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
          flat={true}
          rotation={angle}
        >
          <Image source={icons.car} style={styles.car} />
        </Marker>
      </MapView>

      <View
        style={styles.headerSection}
      >
        <View
          style={styles.header}
        >
          <Image
            source={icons.red_pin}
            style={styles.redPin}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ ...FONTS.body3 }}>Street name</Text>
          </View>

          <Text style={{ ...FONTS.body3 }}>{Math.ceil(duration)} mins</Text>
        </View>
      </View>

      <View
        style={styles.orderSection}
      >
        <View
          style={styles.order}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Avatar */}
            <Image
              source={restaurant?.courier.avatar}
              style={styles.courierAvatar}
            />

            <View style={{ flex: 1, marginLeft: SIZES.padding }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...FONTS.h4 }}>{restaurant?.courier.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={icons.star}
                    style={{ width: 18, height: 18, tintColor: COLORS.primary, marginRight: SIZES.padding }}
                  />
                  <Text style={{ ...FONTS.body3 }}>{restaurant?.rating}</Text>
                </View>
              </View>
              <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{restaurant?.name}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding * 2,
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              style={styles.callButton}
              //@ts-ignore
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>Cancel</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

      {/* Zoom Buttons */}
      <View style={styles.zoomButtonsSection}>
        {/* Zoom in */}
        <TouchableOpacity style={styles.zoomButton} onPress={() => zoomIn()}>
          <Text style={FONTS.body1}>+</Text>
        </TouchableOpacity>
        {/* Zoom out */}
        <TouchableOpacity style={styles.zoomButton} onPress={() => zoomOut()}>
          <Text style={FONTS.body1}>-</Text>
        </TouchableOpacity>
      </View>
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
  car: {
    width: 25,
    height: 25,
  },
  headerSection: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width * 0.9,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white
  },
  redPin: {
    width: 30,
    height: 30,
    marginRight: SIZES.padding
  },
  orderSection: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  courierAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  order: {
    width: SIZES.width * 0.9,
    paddingVertical: SIZES.padding * 3,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white
  },
  callButton: {
    flex: 1,
    height: 50,
    marginRight: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  cancelButton: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  zoomButtonsSection: {
    height: 130,
    width: 60,
    position: 'absolute',
    bottom: SIZES.height * 0.35,
    right: SIZES.padding * 2,
    justifyContent: 'space-between'
  },
  zoomButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
