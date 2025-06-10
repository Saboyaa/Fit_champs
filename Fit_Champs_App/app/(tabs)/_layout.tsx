import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { GlobalProvider } from '../../hooks/ContextoGlobal';

export default function TabsLayout() {
  return (
    <GlobalProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'skyblue',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: '#1e293b',
        },
      }}
    >
      <Tabs.Screen
        name="treinosSemanais"
        options={{
          title: 'Treinos',
          tabBarIcon: ({ color }) => <Text style={{ color }}>💪</Text>,
        }}
      />
      {/* outras abas podem ser adicionadas aqui */}
    </Tabs>
    </GlobalProvider>
  );
}
