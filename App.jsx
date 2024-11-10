import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/navigation/Routes';
import {UserProvider} from './src/content/UserContext';
import {TaskProvider} from './src/content/TaskContext';

const App = () => {
  return (
    <UserProvider>
      <TaskProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </TaskProvider>
    </UserProvider>
  );
};

export default App;
