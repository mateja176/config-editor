import {
  ChakraProvider,
  ColorModeOptions,
  ColorModeProvider,
} from '@chakra-ui/react';
import React from 'react';
import './App.css';
import { apiTokenKey } from './config/config';
import { useLocalStorageItem } from './hooks/useLocalStorage';
import Configs from './pages/Configs/Configs';
import Login from './pages/Login/Login';

const colorModeOptions: ColorModeOptions = { initialColorMode: 'dark' };

function App() {
  const tokenItem = useLocalStorageItem<string>(apiTokenKey);

  return (
    <ChakraProvider>
      <ColorModeProvider options={colorModeOptions}>
        {tokenItem.item ? <Configs /> : <Login />}
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
