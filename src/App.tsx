import {
  ChakraProvider,
  ColorModeOptions,
  ColorModeProvider,
} from '@chakra-ui/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { apiTokenKey } from './config/config';
import { useLocalStorageItem } from './hooks/useLocalStorage';
import Auth from './pages/Auth/Auth';
import Configs from './pages/Configs/Configs';

const colorModeOptions: ColorModeOptions = { initialColorMode: 'dark' };

const queryClient = new QueryClient();

function App() {
  const tokenItem = useLocalStorageItem<string>(apiTokenKey);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ColorModeProvider options={colorModeOptions}>
          {tokenItem.item ? <Configs /> : <Auth />}
        </ColorModeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
