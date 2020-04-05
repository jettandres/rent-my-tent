import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const data = [
  {
    name: 'Tent Boss',
    user: 'Tom Shelby',
    description: 'This tent stands out in public and screams who\'s boss',
    displayPrice: '5cUSD',
    image: 'https://contents.mediadecathlon.com/p1097535/k$543f3710dcd7146380b29753dbd9cba7/camping-tent-2-seconds-2-people-green.jpg?&f=800x800',
  },
  {
    name: 'Family Tent',
    user: 'Grace Shelby',
    description: 'Tent is extra durable and can fit 3-5 people',
    displayPrice: '12cUSD',
    image: 'https://q-cf.bstatic.com/images/hotel/max1024x768/184/184808466.jpg',
  },
  {
    name: 'Solo Tent',
    user: 'Arthur Shelby',
    description: 'Tent is a rare find that can fit 1-2 person',
    displayPrice: '15cUSD',
    image: 'https://i.ebayimg.com/images/g/uYEAAMXQEgpTDBNG/s-l500.jpg',
  },
  {
    name: 'Rainbow Tent',
    user: 'John Shelby',
    description: 'Colorful tent for any festival that can endure immense heat.',
    displayPrice: '2cUSD',
    image: 'https://d10b75yp86lc36.cloudfront.net/Monotaro3/pi/full/mono21440536-160210-02.jpg',
  },
  {
    name: 'Tent of the Stars',
    user: 'Alfie Solomons',
    description: 'Tent is extra durable and can fit 3-5 people',
    displayPrice: '12cUSD',
    subDisplay: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6AhUzewqD1RGvD11xmHRVcqsm0x0BUmwBKpD8YNp_fio5JoM0&usqp=CAU',
  },
  {
    name: 'Forgot Tent',
    user: 'Billy Kimber',
    description: 'Tent is a rare find that can fit 1-2 person',
    displayPrice: '15cUSD',
    image: 'https://cdn2.bigcommerce.com/server3700/cd338/products/1729/images/6307/Snugpak_Ionosphere_1_Person_Tent_Tactical_Asia_10__43963.1416036169.1280.1280.jpg?c=2',
  },
]

const renderItem = (item, onPress) => {
  const {
    name,
    user,
    description,
    displayPrice,
    image,
  } = item
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.itemImage} />
      <View style={styles.itemInfoContainer}>
        <View style={[styles.itemInfoSubContainer, { alignItems: 'center' }]}>
          <Text style={styles.itemInfoName}>{name}</Text>
        </View>
        <View style={styles.itemInfoSubContainer}>
          <Text style={styles.itemInfoUser}>{user}</Text>
          <Text style={styles.itemInfoDisplayPrice}>{displayPrice}</Text>
        </View>
        <View style={styles.itemInfoSubContainer}>
          <Text style={styles.itemInfoDescription}>{description}</Text>
          <Text style={styles.itemInfoSubDisplay}>per week</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Home = (props) => {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <FlatList
        style={{ height: '100%', width: '100%' }}
        data={data}
        renderItem={({ item }) => renderItem(item, () => navigation.navigate('RentTent', { tent: item }))}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('PostTent')}>
        <AntDesign name='plus' size={30} color='white' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#84b4c8',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#eeeeee',
    width: '90%',
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  itemImage: {
    height: 70,
    width: 70,
    marginRight: 16,
    borderRadius: 6,
  },
  itemInfoContainer: {
    height: '100%',
    flex: 1,
  },
  itemInfoSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemInfoTypeContainer: {
    padding: 4,
    borderRadius: 4,
  },
  itemInfoType: {
    fontSize: 12,
    color: '#ffffff',
  },
  itemInfoUser: {
    fontSize: 14,
    color: '#84b4c8',
  },
  itemInfoDisplayPrice: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemInfoDescription: {
    fontSize: 12,
    color: '#757575',
    width: '60%',
  },
  itemInfoSubDisplay: {
    fontSize: 12,
  },
})

export { renderItem as TentListing }

export default Home
