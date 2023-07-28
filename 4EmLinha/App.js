import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen';
import HistoryScreen from './HistoryScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [historico, setHistorico] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game">
          {props => <GameScreen {...props} historico={historico} setHistorico={setHistorico} />}
        </Stack.Screen>
        <Stack.Screen name="History">
          {props => <HistoryScreen {...props} historico={historico} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
