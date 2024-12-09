
import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabContainer, 
        }}>
        {/* Home Screen */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconWrapper}>
                <Animated.Image
                  source={require('./assets/home.png')}
                  style={[
                    styles.imageContainer,
                    {
                      tintColor: focused ? '#8B78E6' : '#000',
                      transform: [{scale: focused ? 1.3 : 1}],
                    },
                  ]}
                />
                {focused && <Text style={styles.tabLabel}>Home</Text>}
              </View>
            ),
          }}
          listeners={() => ({
            tabPress: () => animateTab(tabOffsetValue, 0),
          })}
        />

        {/* Notifications Screen */}
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconWrapper}>
                <Animated.Image
                  source={require('./assets/notification.png')}
                  style={[
                    styles.imageContainer,
                    {
                      tintColor: focused ? '#FFD700' : '#000',
                      transform: [{scale: focused ? 1.3 : 1}],
                    },
                  ]}
                />
                {focused && <Text style={styles.tabLabel} numberOfLines={1}>Notifications</Text>}
              </View>
            ),
          }}
          listeners={() => ({
            tabPress: () => animateTab(tabOffsetValue, getWidth()),
          })}
        />

        {/* Action Button */}
        <Tab.Screen
          name="ActionButton"
          component={EmptyScreen}
          options={{
            tabBarIcon: () => (
              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require('./assets/plusone.png')}
                  style={styles.actionButtonIcon}
                />
              </TouchableOpacity>
            ),
          }}
        />

        {/* Search Screen */}
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconWrapper}>
                <Animated.Image
                  source={require('./assets/search.png')}
                  style={[
                    styles.imageContainer,
                    {
                      tintColor: focused ? '#32CD32' : '#000',
                      transform: [{scale: focused ? 1.3 : 1}],
                    },
                  ]}
                />
                {focused && <Text style={styles.tabLabel}>Search</Text>}
              </View>
            ),
          }}
          listeners={() => ({
            tabPress: () => animateTab(tabOffsetValue, getWidth() * 3),
          })}
        />

        {/* Settings Screen */}
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.iconWrapper}>
                <Animated.Image
                  source={require('./assets/setting.png')}
                  style={[
                    styles.imageContainer,
                    {
                      tintColor: focused ? '#30336B' : '#000',
                      transform: [{scale: focused ? 1.3 : 1}],
                    },
                  ]}
                />
                {focused && <Text style={styles.tabLabel}>Settings</Text>}
              </View>
            ),
          }}
          listeners={() => ({
            tabPress: () => animateTab(tabOffsetValue, getWidth() * 4),
          })}
        />
      </Tab.Navigator>

      {/* Tab Indicator */}
      <Animated.View
        style={[
          styles.tabIndicator,
          {
            transform: [{translateX: tabOffsetValue}],
          },
        ]}
      />
    </NavigationContainer>
  );
}

function getWidth() {
  let width = Dimensions.get('window').width;
  return (width - 40) / 5;
}

function animateTab(tabOffsetValue, toValue) {
  Animated.spring(tabOffsetValue, {
    toValue,
    friction: 8,
    tension: 80,
    useNativeDriver: true,
  }).start();
}


// Placeholder Screens
function EmptyScreen() {
  return <View style={styles.centerScreen}></View>;
}

function HomeScreen() {
  return (
    <View style={styles.centerScreen}>
      <Text>Home!</Text>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={styles.centerScreen}>
      <Text>Notifications!</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={styles.centerScreen}>
      <Text>Search!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.centerScreen}>
      <Text>Settings!</Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  tabContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 70,
    borderRadius: 20,
    paddingHorizontal: 20,
    shadowColor: '#30336B',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: 30,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginTop:25
  },
  tabLabel: {
    fontSize: 10,
    color: '#1287A5',
    marginTop: 5,
    fontWeight: 'bold',
    flexShrink: 1, // Prevents wrapping
    marginHorizontal: 5, // Adds spacing for long text
    flexShrink:1,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonIcon: {
    width: 60,
    height: 60,
    marginBottom: 28,
    resizeMode: 'cover',
    backgroundColor: '#1287A5', // Primary color for the button
    borderRadius: 30, // Fully rounded for a circular button
    borderWidth: 2, // Highlight with a white border
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Add a shadow for depth
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, // Android shadow
  },
  
  tabIndicator: {
    width: getWidth() - 20,
    height: 2,
    backgroundColor: '#1287A5',
    position: 'absolute',
    bottom: 99,
    left: 25,
  },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



// import React, {useRef} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Animated,
//   Dimensions,
// } from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   // Animated Tab Indicator
//   const tabOffsetValue = useRef(new Animated.Value(0)).current;

//   // Interpolated color for tab indicator
//   const tabIndicatorColor = tabOffsetValue.interpolate({
//     inputRange: [0, getWidth(), getWidth() * 2, getWidth() * 3, getWidth() * 4],
//     outputRange: ['#FF6347', '#67E6DC', '#FFD700', '#32CD32', '#30336B'],
//   });

//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarShowLabel: false,
//           tabBarStyle: {
//             alignContent: 'center',
//             justifyContent: 'center',
//             backgroundColor: '#67E6DC',
//             height: 70,
//             borderRadius: 20,
//             shadowColor: '#30336B',
//             shadowOffset: {width: 0, height: 2},
//             shadowOpacity: 0.4,
//             shadowRadius: 3.84,
//             elevation: 5,
//             position: 'absolute',
//             bottom: 30,
//           },
//         }}>
//         {/* Home Screen */}
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarIcon: ({focused}) => (
//               <View style={styles.iconWrapper}>
//                 <Animated.Image
//                   source={require('./assets/home.png')}
//                   style={[
//                     styles.imageContainer,
//                     {
//                       tintColor: focused ? '#FF6347' : '#000',
//                       transform: [{scale: focused ? 1.2 : 1}],
//                     },
//                   ]}
//                 />
//                 {focused && <Text style={styles.tabLabel}>Home</Text>}
//               </View>
//             ),
//           }}
//           listeners={() => ({
//             tabPress: () => {
//               animateTab(tabOffsetValue, 0);
//             },
//           })}
//         />

//         {/* Notifications Screen */}
//         <Tab.Screen
//           name="Notifications"
//           component={NotificationsScreen}
//           options={{
//             tabBarIcon: ({focused}) => (
//               <View style={styles.iconWrapper}>
//                 <Animated.Image
//                   source={require('./assets/chat.png')}
//                   style={[
//                     styles.imageContainer,
//                     {
//                       tintColor: focused ? '#FFD700' : '#000',
//                       transform: [{scale: focused ? 1.2 : 1}],
//                     },
//                   ]}
//                 />
//                 {focused && <Text style={styles.tabLabel}>Chat</Text>}
//               </View>
//             ),
//           }}
//           listeners={() => ({
//             tabPress: () => {
//               animateTab(tabOffsetValue, getWidth());
//             },
//           })}
//         />

//         {/* Action Button */}
//         <Tab.Screen
//           name="ActionButton"
//           component={EmptyScreen}
//           options={{
//             tabBarIcon: () => (
//               <TouchableOpacity
//                 style={{justifyContent: 'center', alignItems: 'center'}}
//                 onPress={() => {
//                   Animated.sequence([
//                     Animated.spring(tabOffsetValue, {
//                       toValue: 10,
//                       useNativeDriver: true,
//                     }),
//                     Animated.spring(tabOffsetValue, {
//                       toValue: 0,
//                       useNativeDriver: true,
//                     }),
//                   ]).start();
//                 }}>
//                 <Image
//                   source={require('./assets/plus.png')}
//                   style={styles.actionButtonIcon}
//                 />
//               </TouchableOpacity>
//             ),
//           }}
//         />

//         {/* Search Screen */}
//         <Tab.Screen
//           name="Search"
//           component={SearchScreen}
//           options={{
//             tabBarIcon: ({focused}) => (
//               <View style={styles.iconWrapper}>
//                 <Animated.Image
//                   source={require('./assets/search.png')}
//                   style={[
//                     styles.imageContainer,
//                     {
//                       tintColor: focused ? '#32CD32' : '#000',
//                       transform: [{scale: focused ? 1.2 : 1}],
//                     },
//                   ]}
//                 />
//                 {focused && <Text style={styles.tabLabel}>Search</Text>}
//               </View>
//             ),
//           }}
//           listeners={() => ({
//             tabPress: () => {
//               animateTab(tabOffsetValue, getWidth() * 3);
//             },
//           })}
//         />

//         {/* Settings Screen */}
//         <Tab.Screen
//           name="Settings"
//           component={SettingsScreen}
//           options={{
//             tabBarIcon: ({focused}) => (
//               <View style={styles.iconWrapper}>
//                 <Animated.Image
//                   source={require('./assets/setting.png')}
//                   style={[
//                     styles.imageContainer,
//                     {
//                       tintColor: focused ? '#30336B' : '#000',
//                       transform: [{scale: focused ? 1.2 : 1}],
//                     },
//                   ]}
//                 />
//                 {focused && <Text style={styles.tabLabel}>Settings</Text>}
//               </View>
//             ),
//           }}
//           listeners={() => ({
//             tabPress: () => {
//               animateTab(tabOffsetValue, getWidth() * 4);
//             },
//           })}
//         />
//       </Tab.Navigator>

//       {/* Tab Indicator */}
//       <Animated.View
//         style={{
//           width: getWidth() - 20,
//           height: 2,
//           backgroundColor: tabIndicatorColor,
//           position: 'absolute',
//           bottom: 99,
//           left: 35,
//           transform: [{translateX: tabOffsetValue}],
//         }}
//       />
//     </NavigationContainer>
//   );
// }

// // Helper Functions
// function getWidth() {
//   let width = Dimensions.get('window').width;
//   return (width - 60) / 5; // 5 tabs with padding
// }

// function animateTab(tabOffsetValue, toValue) {
//   Animated.spring(tabOffsetValue, {
//     toValue: toValue,
//     friction: 8,
//     tension: 80,
//     useNativeDriver: true,
//   }).start();
// }

// // Screen Components
// function EmptyScreen() {
//   return <View style={styles.emptyScreen}></View>;
// }

// function HomeScreen() {
//   return (
//     <View style={styles.centerScreen}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function NotificationsScreen() {
//   return (
//     <View style={styles.centerScreen}>
//       <Text>Notifications!</Text>
//     </View>
//   );
// }

// function SearchScreen() {
//   return (
//     <View style={styles.centerScreen}>
//       <Text>Search!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={styles.centerScreen}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   iconWrapper: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   imageContainer: {
//     width: 30,
//     height: 30,
//     resizeMode: 'contain',
//   },
//   tabLabel: {
//     fontSize: 12,
//     color: '#FF6347',
//     marginTop: 5,
//   },
//   actionButtonIcon: {
//     width: 50,
//     height: 50,
//     marginBottom: 28,
//   },
//   centerScreen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyScreen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
