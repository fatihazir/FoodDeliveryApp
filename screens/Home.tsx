import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { COLORS, FONTS, icons, images, Routes, SIZES } from '../constants'
import { useNavigation } from '@react-navigation/native';

//rnfs
interface CategoryDataModel {
    id: number,
    name: string,
    icon: any
}

export interface MenuDataModel {
    menuId: number,
    name?: string,
    photo?: any,
    description?: string,
    calories?: number,
    price: number
}

export interface RestaurantDataModel {
    id: number,
    name: string,
    rating: number,
    categories: Array<number>,
    priceRating: number,
    photo: any,
    duration: string,
    location: {
        latitude: number,
        longitude: number
    },
    courier: {
        avatar: any,
        name: string
    },
    menu: Array<MenuDataModel>
}

export interface CurrentLocationModel {
    streetName: string,
    gps: {
        latitude: number,
        longitude: number
    }
}

export default function Home() {

    // Dummy Datas

    const initialCurrentLocation = {
        streetName: "Kuching",
        gps: {
            latitude: 1.5496614931250685,
            longitude: 110.36381866919922
        }
    }

    const categoryData = [
        {
            id: 1,
            name: "Rice",
            icon: icons.rice_bowl,
        },
        {
            id: 2,
            name: "Noodles",
            icon: icons.noodle,
        },
        {
            id: 3,
            name: "Hot Dogs",
            icon: icons.hotdog,
        },
        {
            id: 4,
            name: "Salads",
            icon: icons.salad,
        },
        {
            id: 5,
            name: "Burgers",
            icon: icons.hamburger,
        },
        {
            id: 6,
            name: "Pizza",
            icon: icons.pizza,
        },
        {
            id: 7,
            name: "Snacks",
            icon: icons.fries,
        },
        {
            id: 8,
            name: "Sushi",
            icon: icons.sushi,
        },
        {
            id: 9,
            name: "Desserts",
            icon: icons.donut,
        },
        {
            id: 10,
            name: "Drinks",
            icon: icons.drink,
        },

    ]

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "ByProgrammers Burger",
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
            photo: images.burger_restaurant_1,
            duration: "30 - 45 min",
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            courier: {
                avatar: images.avatar_1,
                name: "Amy"
            },
            menu: [
                {
                    menuId: 1,
                    name: "Crispy Chicken Burger",
                    photo: images.crispy_chicken_burger,
                    description: "Burger with crispy chicken, cheese and lettuce",
                    calories: 200,
                    price: 10
                },
                {
                    menuId: 2,
                    name: "Crispy Chicken Burger with Honey Mustard",
                    photo: images.honey_mustard_chicken_burger,
                    description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 3,
                    name: "Crispy Baked French Fries",
                    photo: images.baked_fries,
                    description: "Crispy Baked French Fries",
                    calories: 194,
                    price: 8
                }
            ]
        },
        {
            id: 2,
            name: "ByProgrammers Pizza",
            rating: 4.8,
            categories: [2, 4, 6],
            priceRating: expensive,
            photo: images.pizza_restaurant,
            duration: "15 - 20 min",
            location: {
                latitude: 1.556306570595712,
                longitude: 110.35504616746915,
            },
            courier: {
                avatar: images.avatar_2,
                name: "Jackson"
            },
            menu: [
                {
                    menuId: 4,
                    name: "Hawaiian Pizza",
                    photo: images.hawaiian_pizza,
                    description: "Canadian bacon, homemade pizza crust, pizza sauce",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 5,
                    name: "Tomato & Basil Pizza",
                    photo: images.pizza,
                    description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                    calories: 250,
                    price: 20
                },
                {
                    menuId: 6,
                    name: "Tomato Pasta",
                    photo: images.tomato_pasta,
                    description: "Pasta with fresh tomatoes",
                    calories: 100,
                    price: 10
                },
                {
                    menuId: 7,
                    name: "Mediterranean Chopped Salad ",
                    photo: images.salad,
                    description: "Finely chopped lettuce, tomatoes, cucumbers",
                    calories: 100,
                    price: 10
                }
            ]
        },
        {
            id: 3,
            name: "ByProgrammers Hotdogs",
            rating: 4.8,
            categories: [3],
            priceRating: expensive,
            photo: images.hot_dog_restaurant,
            duration: "20 - 25 min",
            location: {
                latitude: 1.5238753474714375,
                longitude: 110.34261833833622,
            },
            courier: {
                avatar: images.avatar_3,
                name: "James"
            },
            menu: [
                {
                    menuId: 8,
                    name: "Chicago Style Hot Dog",
                    photo: images.chicago_hot_dog,
                    description: "Fresh tomatoes, all beef hot dogs",
                    calories: 100,
                    price: 20
                }
            ]
        },
        {
            id: 4,
            name: "ByProgrammers Sushi",
            rating: 4.8,
            categories: [8],
            priceRating: expensive,
            photo: images.japanese_restaurant,
            duration: "10 - 15 min",
            location: {
                latitude: 1.5578068150528928,
                longitude: 110.35482523764315,
            },
            courier: {
                avatar: images.avatar_4,
                name: "Ahmad"
            },
            menu: [
                {
                    menuId: 9,
                    name: "Sushi sets",
                    photo: images.sushi,
                    description: "Fresh salmon, sushi rice, fresh juicy avocado",
                    calories: 100,
                    price: 50
                }
            ]
        },
        {
            id: 5,
            name: "ByProgrammers Cuisine",
            rating: 4.8,
            categories: [1, 2],
            priceRating: affordable,
            photo: images.noodle_shop,
            duration: "15 - 20 min",
            location: {
                latitude: 1.558050496260768,
                longitude: 110.34743759630511,
            },
            courier: {
                avatar: images.avatar_4,
                name: "Muthu"
            },
            menu: [
                {
                    menuId: 10,
                    name: "Kolo Mee",
                    photo: images.kolo_mee,
                    description: "Noodles with char siu",
                    calories: 200,
                    price: 5
                },
                {
                    menuId: 11,
                    name: "Sarawak Laksa",
                    photo: images.sarawak_laksa,
                    description: "Vermicelli noodles, cooked prawns",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 12,
                    name: "Nasi Lemak",
                    photo: images.nasi_lemak,
                    description: "A traditional Malay rice dish",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 13,
                    name: "Nasi Briyani with Mutton",
                    photo: images.nasi_briyani_mutton,
                    description: "A traditional Indian rice dish with mutton",
                    calories: 300,
                    price: 8
                },

            ]
        },
        {

            id: 6,
            name: "ByProgrammers Dessets",
            rating: 4.9,
            categories: [9, 10],
            priceRating: affordable,
            photo: images.kek_lapis_shop,
            duration: "35 - 40 min",
            location: {
                latitude: 1.5573478487252896,
                longitude: 110.35568783282145,
            },
            courier: {
                avatar: images.avatar_1,
                name: "Jessie"
            },
            menu: [
                {
                    menuId: 12,
                    name: "Teh C Peng",
                    photo: images.teh_c_peng,
                    description: "Three Layer Teh C Peng",
                    calories: 100,
                    price: 2
                },
                {
                    menuId: 13,
                    name: "ABC Ice Kacang",
                    photo: images.ice_kacang,
                    description: "Shaved Ice with red beans",
                    calories: 100,
                    price: 3
                },
                {
                    menuId: 14,
                    name: "Kek Lapis",
                    photo: images.kek_lapis,
                    description: "Layer cakes",
                    calories: 300,
                    price: 20
                }
            ]

        }


    ]

    const [categories, setCategories] = React.useState<Array<CategoryDataModel>>(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState<CategoryDataModel>()
    const [restaurants, setRestaurants] = React.useState<Array<RestaurantDataModel>>(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState<CurrentLocationModel>(initialCurrentLocation)

    const navigation = useNavigation();

    function onSelectCategory(category: CategoryDataModel) {
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))
        setSelectedCategory(category)
        setRestaurants(restaurantList)
    }

    function getCategoryNameById(id: number) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }

    const renderItemForMainCategories = (props: { item: CategoryDataModel }) => {
        let { item } = props
        return (
            <TouchableOpacity style={[styles.mainCategoryTouchableOpacity, styles.shadow,
            selectedCategory?.id == item.id ? { backgroundColor: COLORS.primary } : { backgroundColor: COLORS.white }]}
                onPress={() => onSelectCategory(item)}>
                <View style={[styles.mainCategoryPhotoSection,
                selectedCategory?.id == item.id ? { backgroundColor: COLORS.white } : { backgroundColor: COLORS.lightGray }]}>
                    <Image source={item.icon} resizeMode="contain" style={styles.mainCategoriesPhoto} />
                </View>
                <Text style={[styles.mainCategoriestext,
                selectedCategory?.id == item.id ? { color: COLORS.white } : { color: COLORS.black }]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const renderItemForRestaurants = (props: { item: RestaurantDataModel }) => {
        let { item } = props
        return (
            <TouchableOpacity style={styles.restaurantsSectionTouchableOpacity}
                onPress={() => {
                    //@ts-ignore
                    navigation.navigate(Routes.Restaurant, { item, currentLocation })
                }}>
                <View style={styles.restaurantsSection}>
                    <Image source={item.photo} resizeMode="cover" style={styles.restaurantPhoto} />
                    <View style={[styles.durationSection, styles.shadow]}>
                        <Text style={FONTS.h4}>{item.duration}</Text>
                    </View>
                </View>
                <Text style={[FONTS.body2]}>{item.name}</Text>
                <View style={styles.restaurantInfoSection}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={icons.star} resizeMode="contain" style={styles.star} />
                        <Text style={FONTS.body3}>{item.rating}</Text>
                    </View>
                    <View style={styles.categorySection}>
                        {item.categories.map((catId, index) => {
                            return (
                                <View key={index} >
                                    <Text style={FONTS.body3}>- {getCategoryNameById(catId)}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <Text>{
                        [1, 2, 3].map((priceRating) => (
                            <Text key={priceRating}
                                style={[FONTS.body3, priceRating <= item.priceRating ? { color: COLORS.black } : { color: COLORS.darkgray }]}>$</Text>
                        ))
                    }</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>

            <View style={styles.headerSection}>
                <TouchableOpacity style={styles.headerLeftAndRightPart}>
                    <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={styles.headerImage}
                    />
                </TouchableOpacity>
                <View style={styles.headerMed}>
                    <View style={styles.headerMedBg}>
                        <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.headerLeftAndRightPart}>
                    <Image
                        source={icons.basket}
                        resizeMode="contain"
                        style={styles.headerImage}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.mainCategoriesSection}>
                <Text style={FONTS.h1}>Main</Text>
                <Text style={FONTS.h1}>Categories</Text>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItemForMainCategories}
                    contentContainerStyle={styles.mainCategoriesContentContainerStyle}
                />
            </View>


            <FlatList
                data={restaurants}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItemForRestaurants}
                contentContainerStyle={styles.restaurantsContentContainerStyle}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1
    },
    headerSection: {
        flexDirection: 'row',
        height: 50,
        paddingHorizontal: SIZES.padding * 2,
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
    },
    headerMedBg: {
        backgroundColor: COLORS.lightGray3,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: SIZES.width * 0.4,
        borderRadius: SIZES.radius
    },
    mainCategoriesSection: {
        padding: SIZES.padding * 2,
    },
    mainCategoriesContentContainerStyle: {
        paddingVertical: SIZES.padding * 2
    },
    restaurantsContentContainerStyle: {
        paddingHorizontal: SIZES.padding * 2,
        paddingBottom: 30
    },
    mainCategoryTouchableOpacity: {
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.padding
    },
    mainCategoryPhotoSection: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainCategoriesPhoto: {
        width: 30,
        height: 30
    },
    mainCategoriestext: {
        marginTop: SIZES.padding,
        ...FONTS.body5
    },
    restaurantsSection: {
        marginBottom: SIZES.padding
    },
    restaurantsSectionTouchableOpacity: {
        marginBottom: SIZES.padding * 2,
        flex: 1

    },
    restaurantPhoto: {
        width: '100%',
        height: 200,
        borderRadius: SIZES.radius
    },
    durationSection: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: SIZES.width * 0.3,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius
    },
    restaurantInfoSection: {
        marginTop: SIZES.padding,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    star: {
        height: 20,
        width: 20,
        tintColor: COLORS.primary,
        marginRight: 10
    },
    categorySection: {
    },
    categoryRenderSection: {
        flexDirection: 'row'
    }
})