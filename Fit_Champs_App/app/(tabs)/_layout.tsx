import React from 'react'
import { Tabs } from 'expo-router'
import { GlobalProvider } from '../../hooks/ContextoGlobal'
import { Ionicons } from '@expo/vector-icons'

export default function TabsLayout() {
  return (
    <GlobalProvider>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: 'skyblue',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#0f172a',
            borderTopColor: '#1e293b',
          },
          tabBarIcon: ({ color, size }) => {
            let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'ellipse'

            switch (route.name) {
              case 'home':
                iconName = 'home-outline'
                break
              case 'GraficoDeEvolucao':
                iconName = 'stats-chart-outline'
                break
              case 'ListadeExercicios':
                iconName = 'barbell-outline'
                break
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
        })}
      >
        <Tabs.Screen
          name="home"
          options={{ title: 'Início' }}
        />
        <Tabs.Screen
          name="ListadeExercicios"
          options={{ title: 'Exercícios' }}
        />
        <Tabs.Screen
          name="GraficoDeEvolucao"
          options={{ title: 'Gráfico' }}
        />
      </Tabs>
    </GlobalProvider>
  )
}
