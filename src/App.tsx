import React from 'react';
import { Toaster } from "@/components/ui/sonner"
import AppRouter from './router';
import TanStackProvider from './providers/tanstack-provider';



const App: React.FC = () => {
  return (
    <>
      <TanStackProvider>
        <Toaster />
        <AppRouter />
      </TanStackProvider >
    </>
  );
};

export default App;
