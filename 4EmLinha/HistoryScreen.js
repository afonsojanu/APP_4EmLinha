import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HistoryScreen = ({ route }) => {
  const { params } = route;
  const navigation = useNavigation();

  const historico = params?.historico || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Jogos</Text>
      {historico.length === 0 ? (
        <Text style={styles.noHistoryText}>Nenhum jogo foi jogado ainda.</Text>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.gameResultContainer}>
              <Text style={styles.gameResultText}>
                Vencedor: {item.vencedor === 'draw' ? 'Empate' : item.vencedor}
              </Text>
            </View>
          )}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  noHistoryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  gameResultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  gameResultText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default HistoryScreen;
