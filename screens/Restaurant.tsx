import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { COLORS, FONTS, icons, images, Routes, SIZES } from '../constants'
import { CurrentLocationModel, RestaurantDataModel } from './Home'
import { useNavigation } from '@react-navigation/native';

interface RestaurantPropsModel {
  route: {
    params: {
      item: RestaurantDataModel,
      currentLocation: any
    }
  }
}

export default function Restaurant(props: RestaurantPropsModel) {
  const scrollX = new Animated.Value(0)
  const [restaurant, setRestaurant] = React.useState<RestaurantDataModel>()
  const [currentLocation, setCurrentLocation] = React.useState<CurrentLocationModel>()

  const navigation = useNavigation();

  React.useEffect(() => {
    const { currentLocation, item } = props.route.params
    setRestaurant(item)
    setCurrentLocation(currentLocation)
  }, [])

  function renderDots() {

    const dotPosition = Animated.divide(scrollX, SIZES.width)

    return (
      <View style={{ height: 30 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding
          }}
        >
          {restaurant?.menu.map((item, index) => {

            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp"
            })

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp"
            })

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: "clamp"
            })

            return (
              <Animated.View
                key={`dot-${index}`}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                  opacity: opacity
                }}
              />
            )
          })}
        </View>
      </View>
    )
  }


  return (
    <View style={styles.container}>

      <View style={styles.headerSection}>
        <TouchableOpacity style={styles.headerLeftAndRightPart} onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={styles.headerImage}
          />
        </TouchableOpacity>
        <View style={styles.headerMed}>
          <View style={styles.headerMedBg}>
            <Text style={{ ...FONTS.h4 }}>{restaurant?.name}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerLeftAndRightPart}>
          <Image
            source={icons.list}
            resizeMode="contain"
            style={styles.headerImage}
          />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } }
        ], { useNativeDriver: false })}
      >
        {restaurant?.menu.map((item, index) => (
          <View key={`menu-${index}`} style={styles.menuItemSection}>
            <View style={styles.menuItem}>
              <Image source={item.photo} resizeMode="cover" style={styles.menuPhoto} />

              <View style={styles.quantitySection}>
                <TouchableOpacity style={styles.decreaseButton}>
                  <Text style={FONTS.body1}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.quantityAmount, FONTS.h2]}>5</Text>
                <TouchableOpacity style={styles.increaseButton}>
                  <Text style={FONTS.body1}>+</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.nameAndDescriptionSection}>
                <Text style={styles.itemNameText}>{item.name} - {item.price.toFixed(2)}</Text>
                <Text style={styles.itemDescriptionText}>{item.description}</Text>
              </View>

              <View style={styles.calorieSection}>
                <Image source={icons.fire} style={styles.calorieFirePhoto} />
                <Text style={styles.calorieText}>{item.calories.toFixed(2)} cal</Text>
              </View>

            </View>
          </View>
        ))}
      </Animated.ScrollView>

      {renderDots()}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2
  },
  headerSection: {
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: SIZES.padding,
    justifyContent: 'space-between',
    marginTop: 8
  },
  headerLeftAndRightPart: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerImage: {
    width: 30,
    height: 30
  },
  headerMed: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  headerMedBg: {
    backgroundColor: COLORS.lightGray3,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding * 3,
    borderRadius: SIZES.radius
  },
  menuItemSection: {
    alignItems: 'center',
  },
  menuItem: {
    height: SIZES.height * 0.35,
  },
  menuPhoto: {
    width: SIZES.width,
    height: '100%'
  },
  quantitySection: {
    height: 50,
    width: SIZES.width,
    position: 'absolute',
    bottom: -20,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  decreaseButton: {
    width: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25
  },
  increaseButton: {
    width: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  },
  quantityAmount: {
    width: 50,
    backgroundColor: COLORS.white,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  nameAndDescriptionSection: {
    width: SIZES.width,
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: SIZES.padding * 2,
  },
  itemNameText: {
    marginVertical: 10,
    textAlign: 'center',
    ...FONTS.h2
  },
  itemDescriptionText: {
    ...FONTS.body3
  },
  calorieSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    height: 60,
  },
  calorieFirePhoto: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  calorieText: {
    color: COLORS.darkgray,
    ...FONTS.body3
  },
  dotsSection: {
    height: 30,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.padding
  }
})