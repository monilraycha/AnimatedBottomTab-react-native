import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Image, Text, View, StyleSheet } from 'react-native';

function CustomDrawerContent(props) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props} style={styles.drawerScrollView}>
      <View style={styles.headerContainer}>
        <View style={styles.closeButtonContainer}>
          <Text style={styles.closeButtonText} onPress={() => navigation.closeDrawer()}>
            Close
          </Text>
        </View>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Monil Raycha</Text>
      </View>

      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate('Home')}
        icon={() => <Image source={require('../assets/home.png')} style={styles.icon} />}
        labelStyle={styles.labelStyle}
      />

      <DrawerItem
        label="Setting"
        onPress={() => navigation.navigate('Settings')}
        icon={() => <Image source={require('../assets/setting.png')} style={styles.icon} />}
        labelStyle={styles.labelStyle}
      />
      <DrawerItem
        label="Find"
        onPress={() => navigation.navigate('Find')}
        icon={() => <Image source={require('../Icons/search.png')} style={styles.icon} />}
        labelStyle={styles.labelStyle}
      />
      <DrawerItem
        label="Chat"
        onPress={() => navigation.navigate('Chat')}
        icon={() => <Image source={require('../assets/search.png')} style={styles.icon} />}
        labelStyle={styles.labelStyle}
      />


    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerScrollView: {
    backgroundColor: '#535C68',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  closeButtonContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileName: {
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
  },
  labelStyle: {
    fontSize: 16,
    color: '#f0f0f0',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
