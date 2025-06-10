import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from 'lucide-react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <User color="#60A5FA" size={32} />
        <Text style={styles.title}>Dashboard Pessoal</Text>
      </View>
      <Text style={styles.subtitle}>
        Bem-vindo à sua academia virtual personalizada!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#1E293B', // Base slate-800
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // Android shadow
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)', // indigo-500/30
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    color: '#BFDBFE', // blue-200
    marginTop: 8,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Header;
