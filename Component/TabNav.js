import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from "./HomeScreen";
import PlanScreen from "./PlanScreen";
import Store from "./Store";
import More from "./More";
import { Text} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
const Tab  = createBottomTabNavigator();
 
const TabNav = ()=>{
    return (
 
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Plans') {
                iconName = focused ? 'arrow-up-circle' : 'arrow-up-circle-outline';
              } else if (route.name === 'More') {
                iconName = focused ? 'ellipsis-horizontal-circle-sharp' : 'ellipsis-horizontal-circle-outline';
              } else if (route.name === 'Store') {
                iconName = focused ? 'cart' : 'cart-outline';
              }
    
              return <Icon name={iconName} size={focused ? 30 : 25} color='black' />;
            },
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: focused ? 18 : 16,
                  color: 'black',
                  fontWeight: focused ? '700' : '500',
                  paddingBottom: 5,
                }}>
                {route.name}
              </Text>
            ),
            tabBarStyle: {
              height: 60,
            },
          })}>
          <Tab.Screen name='Home' component={HomeScreen} />
          <Tab.Screen name='Plans' component={PlanScreen} />
          <Tab.Screen name='Store' component={Store} options={{ tabBarBadge: '', tabBarBadgeStyle: { backgroundColor: 'red' } }} />
          <Tab.Screen name='More' component={More} />
        </Tab.Navigator>
        
      );
}
export default TabNav;