import { useEffect, useState } from 'react';
import Board from './components/Board.tsx';

export default function TicTacToe() {
  const boardSize = 3;
  const [history, setHistory] = useState([{ squares: Array(boardSize * boardSize).fill(null), location: [0, 0] }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAscending, setIsAscending] = useState(true);
  const [squares, setSquares] = useState(Array(boardSize * boardSize).fill(null));
  const [currentSquare, setCurrentSquare] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const handleClick = (i: number) => {
    const historyUpToCurrent = history.slice(0, stepNumber + 1);
    const current = historyUpToCurrent[historyUpToCurrent.length - 1];
    const squares = current.squares.slice();
    if (squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyUpToCurrent.concat([{ squares: squares, location: [i % boardSize, Math.floor(i / boardSize)] }])); // Ensure location uses number types
    setStepNumber(historyUpToCurrent.length);
    setSquares(squares);
    setXIsNext(!xIsNext);
    setCurrentSquare(i);
  };
  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    const location = history[step].location;
    setCurrentSquare(location[1] * boardSize + location[0]);
    setHistory(history.slice(0, step + 1));
    setSquares(history[step].squares);
  };

  const toggleSort = () => {
    setIsAscending(!isAscending);
  };

  const calculateWinner = (squares: string[], boardSize: number) => {
    // Check rows
    for (let row = 0; row < boardSize; row++) {
      const start = row * boardSize;
      const line = squares.slice(start, start + boardSize);
      if (line.every(square => square && square === line[0])) {
        return { winner: line[0], line: Array.from({ length: boardSize }, (_, i) => start + i) };
      }
    }

    // Check columns
    for (let col = 0; col < boardSize; col++) {
      const line: string[] = [];
      for (let row = 0; row < boardSize; row++) {
        line.push(squares[row * boardSize + col]);
      }
      if (line.every(square => square && square === line[0])) {
        return { winner: line[0], line: Array.from({ length: boardSize }, (_, i) => i * boardSize + col) };
      }
    }

    // Check diagonals
    const diagonal1: string[] = [];
    const diagonal2: string[] = [];
    for (let i = 0; i < boardSize; i++) {
      diagonal1.push(squares[i * boardSize + i]);
      diagonal2.push(squares[i * boardSize + (boardSize - i - 1)]);
    }
    if (diagonal1.every(square => square && square === diagonal1[0])) {
      return { winner: diagonal1[0], line: Array.from({ length: boardSize }, (_, i) => i * boardSize + i) };
    }
    if (diagonal2.every(square => square && square === diagonal2[0])) {
      return { winner: diagonal2[0], line: Array.from({ length: boardSize }, (_, i) => i * boardSize + (boardSize - i - 1)) };
    }

    return null;
  };

  const restartGame = () => {
    setHistory([{ squares: Array(boardSize * boardSize).fill(null), location: [0, 0] }]);
    setStepNumber(0);
    setXIsNext(true);
    setSquares(Array(boardSize * boardSize).fill(null));
    setCurrentSquare(null);
    setIsGameOver(false);
  };

  useEffect(() => {
    const current = history[stepNumber];
    const result = calculateWinner(current.squares, boardSize);
    if (result || stepNumber === boardSize * boardSize) {
      setIsGameOver(true);
    }
  }, [history, stepNumber]);

  const current = history[stepNumber];
  const result = calculateWinner(current.squares, boardSize);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.line : null;
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move} (${step.location[1] + 1}, ${step.location[0] + 1})` : 'Go to game start';
    return (
      <li key={move}>
        {move === stepNumber ? (
          <div>
            You are at move #{move} ({step.location[1] + 1}, {step.location[0] + 1})
          </div>
        ) : (
          <button className="history-button" onClick={() => jumpTo(move)}>
            {desc}
          </button>
        )}
      </li>
    );
  });

  if (!isAscending) moves.reverse();
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    if (stepNumber === boardSize * boardSize) {
      status = 'It is a draw!';
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  }
  return (
    <>
      <div className="game-container">
        <div className="board-container">
          <Board squares={squares} onClick={handleClick} size={3} winningLine={winningLine} currentSquare={currentSquare} winner={winner} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div className="button-container">
            <button className="sort-button" onClick={toggleSort}>
              Sort moves
            </button>
            {isGameOver && (
              <button className="restart-button" onClick={restartGame}>
                Restart game
              </button>
            )}
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
