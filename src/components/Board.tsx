import { useState, useRef, type MouseEvent } from "react";

const winnningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Board() {
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const [winner, setWinner] = useState("");
  const statusRef = useRef(null);

  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const getButtonsUsingForLoop = (num: number) => {
    const array = [];

    for (var i = 1; i <= num; i++) {
      array.push(
        <button
          key={i}
          value={i - 1}
          className="square"
          onClick={handlePlayersMove}
          disabled={board[i - 1] !== "" || winner ? true : undefined}
        >
          {board[i - 1]}
        </button>,
      );
    }

    return array;
  };

  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setWinner("");
    setCurrentPlayer(true);
  };

  const checkWinner = (newBoard: string[]) => {
    const players = ["X", "O"];
    for (let i = 0; i < winnningConditions.length; i++) {
      const [a, b, c] = winnningConditions[i];
      if (
        newBoard[a] === players[0] &&
        newBoard[b] === players[0] &&
        newBoard[c] === players[0]
      ) {
        return players[0];
      } else if (
        newBoard[a] === players[1] &&
        newBoard[b] === players[1] &&
        newBoard[c] === players[1]
      ) {
        return players[1];
      }
    }
    if (!newBoard.includes("")) {
      return "draw";
    } else return "";
  };

  const handlePlayersMove = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const playerChar = currentPlayer ? "X" : "O";
    const newBoard = [...board];
    newBoard[Number(target.value)] = playerChar;
    setBoard(newBoard);
    console.log(board);
    if (checkWinner(newBoard) != "") {
      setWinner(checkWinner(newBoard));
    }

    setCurrentPlayer((prev) => !prev);
  };

  return (
    <div className="wrapper">
      <h1>Tic-Tac-Toe</h1>
      {winner ? (
        <p>{winner === "draw" ? "It's A Draw!" : `Winner: ${winner}`}</p>
      ) : (
        <p ref={statusRef}>
          Next Player:<span> {currentPlayer ? "X" : "O"}</span>
        </p>
      )}
      <div className="grid">{getButtonsUsingForLoop(9)}</div>
      <button id="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}
