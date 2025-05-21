import React from 'react';
import { Stack } from 'expo-router';
import { GlobalProvider } from '@/Context/ContextoGlobal';
import { ExerciciosProvider } from '@/Context/ExercícioGlobal';

export default function RootLayout() {
  return (
    <GlobalProvider>
        <ExerciciosProvider>
            <Stack screenOptions={{ headerShown: false }}/>
        </ExerciciosProvider> 
    </GlobalProvider>  
  );
}
