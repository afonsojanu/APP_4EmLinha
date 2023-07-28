import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ROWS = 6;
const COLS = 7;
const WINNING_LENGTH = 4;

const GameScreen = ({ route, historico, setHistorico }) => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    checkForWinner();
    checkForDraw();
  }, [board]);

  function createEmptyBoard() {
    return Array(ROWS).fill(Array(COLS).fill(''));
  }

  function checkForWinner() {
    // Check for a horizontal win
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col <= COLS - WINNING_LENGTH; col++) {
        if (
          board[row][col] !== '' &&
          board[row][col] === board[row][col + 1] &&
          board[row][col] === board[row][col + 2] &&
          board[row][col] === board[row][col + 3]
        ) {
          setWinner(board[row][col]);
          return true;
        }
      }
    }

    // Check for a vertical win
    for (let row = 0; row <= ROWS - WINNING_LENGTH; row++) {
      for (let col = 0; col < COLS; col++) {
        if (
          board[row][col] !== '' &&
          board[row][col] === board[row + 1][col] &&
          board[row][col] === board[row + 2][col] &&
          board[row][col] === board[row + 3][col]
        ) {
          setWinner(board[row][col]);
          return true;
        }
      }
    }

    // Check for a diagonal win (top-left to bottom-right)
    for (let row = 0; row <= ROWS - WINNING_LENGTH; row++) {
      for (let col = 0; col <= COLS - WINNING_LENGTH; col++) {
        if (
          board[row][col] !== '' &&
          board[row][col] === board[row + 1][col + 1] &&
          board[row][col] === board[row + 2][col + 2] &&
          board[row][col] === board[row + 3][col + 3]
        ) {
          setWinner(board[row][col]);
          return true;
        }
      }
    }

    // Check for a diagonal win (top-right to bottom-left)
    for (let row = 0; row <= ROWS - WINNING_LENGTH; row++) {
      for (let col = WINNING_LENGTH - 1; col < COLS; col++) {
        if (
          board[row][col] !== '' &&
          board[row][col] === board[row + 1][col - 1] &&
          board[row][col] === board[row + 2][col - 2] &&
          board[row][col] === board[row + 3][col - 3]
        ) {
          setWinner(board[row][col]);
          return true;
        }
      }
    }

    return false;
  }

  function checkForDraw() {
    const isBoardFull = board.every((row) => row.every((cell) => cell !== ''));
    if (isBoardFull && !winner) {
      setWinner('draw');
      salvarHistoricoJogo('draw');
    }
  }

  function handlePlacePiece(row, col) {
    if (board[row][col] === '' && !winner) {
      let placedRow = ROWS - 1; // Começar pela última linha

      while (placedRow >= 0) {
        if (board[placedRow][col] === '') {
          break; // Encontrou a primeira posição vazia na coluna
        }
        placedRow--;
      }

      if (placedRow >= 0) {
        const newBoard = board.map((rowArray, rowIndex) =>
          rowArray.map((cell, colIndex) =>
            rowIndex === placedRow && colIndex === col ? currentPlayer : cell
          )
        );
        setBoard(newBoard);

        if (checkForWinner()) {
          setHistorico((historicoAntigo) => [...historicoAntigo, { vencedor: currentPlayer }]);
        } else {
          setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
      }
    }
  }

  function resetGame() {
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
    setWinner(null);
  }

  function renderBoard() {
    return board.map((rowArray, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {rowArray.map((cell, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            style={styles.cell}
            onPress={() => handlePlacePiece(rowIndex, colIndex)}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  }

  function renderResultMessage() {
    if (winner === 'draw') {
      return <Text style={styles.resultMessage}>Empate!</Text>;
    } else if (winner) {
      return <Text style={styles.resultMessage}>Vencedor: {winner}</Text>;
    } else {
      return <Text style={styles.currentPlayerMessage}>Jogador Atual: {currentPlayer}</Text>;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo 4 em linha</Text>
      {renderResultMessage()}
      <View style={styles.board}>{renderBoard()}</View>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Reiniciar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('History', { historico })}
      >
        <Text style={styles.buttonText}>Histórico</Text>
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
  currentPlayerMessage: {
    fontSize: 20,
    marginBottom: 10,
  },
  resultMessage: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  board: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  cellText: {
    fontSize: 24,
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

export default GameScreen;
