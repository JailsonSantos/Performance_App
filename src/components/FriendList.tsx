import React, { useMemo } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Friend } from './Friend';

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
    online: string;
  }[];
  follow: () => void;
}

export function FriendList({ data, follow }: Props) {

  // O useMemo é recomendado para memorizar calculos grandes;
  // O useMemo usar igualdade referencial, para fazer os calculos na memória; Memoriza o valor
  // O useCallback; Memoriza a função
  const totalLikes = useMemo(() => {
    return data.reduce((acumulate, item) => {
      return acumulate + item.likes
    }, 0);
  }, [data])

  return (
    <View>
      <Text>Total de Likes: {totalLikes}</Text>
      {/* USAR O (data.map) APENAS QUANDO FORM RENDERIZAR POUCOS ELEMENTOS */}

      {/* USAR FLATLIST PARA GRANDES QUANTIDADES DE LISTA, PELO GANHO DE PERFORMANCE */}
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Friend
            key={String(item.id)}
            data={item}
            follow={follow}
          />
        )}
      />

    </View>
  );
}