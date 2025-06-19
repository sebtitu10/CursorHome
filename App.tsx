import "nativewind/tailwind.css";
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useState } from 'react';

/// <reference types="nativewind/types" />

function Anuncios() {
  return (
    <View className="bg-[#F5F8FA] rounded-xl p-3 mx-4 mt-4 mb-2 shadow-md">
      <Text className="font-bold text-base mb-2 text-center">Anuncios</Text>
      <View className="flex-row justify-between mb-1">
        <Text className="text-gray-700">Conferencia de IA en el Salón Principal</Text>
        <Text className="text-gray-500 font-bold">Mañana</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-gray-700">Próximo Feriado 24 de Mayo</Text>
        <Text className="text-gray-500 font-bold">Faltan 18 días</Text>
      </View>
      <Text className="text-center text-gray-400 mt-1">▼</Text>
    </View>
  );
}

function PerfilCard() {
  return (
    <View className="border border-[#0077C8] rounded-xl mx-4 mb-3 p-3 bg-white flex-row items-center justify-between shadow-sm">
      <View>
        <Text className="font-bold text-[15px]">Jefferson Rolando Jacome Sandoya</Text>
        <Text className="text-gray-500 text-xs">Estudiante de Ingeniería Sistemas de Información</Text>
      </View>
      <Text className="text-2xl">▦</Text>
    </View>
  );
}

interface CardProps {
  title: string;
  icon: string;
}

function HomeCard({ title, icon }: CardProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[{ flex: 1, margin: 8 }, animatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.85}
        className="bg-white rounded-2xl shadow-lg items-center justify-center h-[120px] relative"
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
      >
        <Text className="text-3xl text-[#B89C2C] mb-1">{icon}</Text>
        <Text className="font-bold text-gray-800 text-base">{title}</Text>
        <View className="absolute bottom-0 right-0 w-[60px] h-[30px] bg-[#0077C8] rounded-br-2xl rounded-tl-2xl" />
      </TouchableOpacity>
    </Animated.View>
  );
}

function HomeMenu() {
  return (
    <View className="flex-row flex-wrap justify-between mx-4">
      <HomeCard title="Parqueaderos" icon="🅿️" />
      <HomeCard title="Grabar Clase" icon="🎤" />
      <HomeCard title="Mis Apuntes" icon="📒" />
      <HomeCard title="Materias" icon="📚" />
    </View>
  );
}

function BottomTab() {
  return (
    <View className="flex-row h-[54px] border-t border-gray-200 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-[#B89C2C] text-xl">⬛</Text>
        <Text className="text-[#B89C2C] text-xs">Inicio</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-[#0077C8] text-xl">📰</Text>
        <Text className="text-[#0077C8] text-xs">Noticias</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-[#0077C8] text-xl">💬</Text>
        <Text className="text-[#0077C8] text-xs">Chat</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-[#0077C8] text-xl">📅</Text>
        <Text className="text-[#0077C8] text-xs">Calendario</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-[#0077C8] text-xl">👤</Text>
        <Text className="text-[#0077C8] text-xs">Perfil</Text>
      </View>
    </View>
  );
}

export default function App() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <SafeAreaView className={colorScheme === 'dark' ? 'flex-1 bg-[#222]' : 'flex-1 bg-[#F5F8FA]'}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-row items-center mx-4 mt-4 mb-0">
            <Image source={require('./assets/icon.png')} style={{ width: 60, height: 40, resizeMode: 'contain' }} />
            <View className="flex-1" />
            <Text className="text-2xl text-[#0077C8]">🔔</Text>
          </View>
          <Anuncios />
          <PerfilCard />
          <View className="flex-row justify-end mx-4 mb-2">
            <Text className="text-[#0077C8] font-bold">Ver Más</Text>
          </View>
          <HomeMenu />
        </ScrollView>
        <BottomTab />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
