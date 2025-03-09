// App.tsx
import React from 'react';
import NotesScreen from './screens/NotesScreen';
import EditNoteScreen from './screens/EditNoteScreen';
import { NotesProvider } from "../src/hooks/NotesContext"; 

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider} from "react-native-popup-menu";


console.log('App Loaded');
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <MenuProvider>
      <NotesProvider>
        <Stack.Navigator>
          <Stack.Screen name="Notes" component={NotesScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="EditNote" component={EditNoteScreen} />
        </Stack.Navigator>
      </NotesProvider>
    </MenuProvider>
  );
};

export default App;