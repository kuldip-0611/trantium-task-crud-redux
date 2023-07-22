import { Toaster } from 'react-hot-toast';
import { ChakraProvider } from '@chakra-ui/react';
import PrivateRoutes from './protected/PrivateRoutes';
import './App.css';
function App() {
  return (
    <div>
      <Toaster />
      <ChakraProvider>
       <PrivateRoutes />
      </ChakraProvider>
    </div>
  );
}

export default App;
