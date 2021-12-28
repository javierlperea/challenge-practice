import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
// import { Professionals } from './components/Professionals';
import 'antd/dist/antd.css'
import { Prueba } from './components/Prueba';

const queryClient = new QueryClient({
  defaultOptions: {
    queries : {
      retryDelay: 0
    }
  }
})

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
            <Prueba />
        </div>
      </QueryClientProvider>
  );
}

export default App;
