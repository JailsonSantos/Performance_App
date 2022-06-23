import React, { useState, useCallback } from 'react';
import { Button, Text, TextInput, View, StyleSheet, ScrollView } from 'react-native';

import { FriendList } from '../components/FriendList';

interface DataProps {
  id: string
  name: string;
  likes: number;
}

export function Home() {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([]);

  async function handleSearch() {
    const response = await fetch(`http://192.168.0.114:3333/friends/?q=${name}`);
    const data = await response.json();

    const formattedData = data.map((item: DataProps) => {
      return {
        id: item.id,
        name: item.name,
        likes: item.likes,
        online: `${new Date().getHours()}:${new Date().getMinutes()}`
      }
    });

    setFriends(formattedData);

  }

  // A função useCallback memoriza a função em um espaço da memoria,
  // para que não seja realocada na memoria novamente, evitando
  // renderizações desnecessárias passadas pelos propsDream (pai, filho, outro filho, etc.)
  // Pois a a função continua sendo a mesma
  const handleFollow = useCallback(() => {
    console.log('Follow user');

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>
      <TextInput
        placeholder="Nome do cliente"
        onChangeText={setName}
        style={styles.input}
      />

      <Button
        title="Buscar"
        onPress={handleSearch}
      />

      <FriendList
        data={friends}
        follow={handleFollow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginVertical: 10,
  },
  list: {
    marginTop: 20,
  }
})