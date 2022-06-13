import { useState, useEffect } from "react";

import { Row } from "./ui/atoms/Row";
import { Button } from "./ui/atoms/Button";

import gameWinAudioSource from "./assets/audios/game_win.mp3";
import switchAudioSource from "./assets/audios/switch.mp3";
const gameWinAudio = new Audio(gameWinAudioSource);
const switchAudio = new Audio(switchAudioSource);

import "./App.css";
import { ChangeDifficulty } from "./ui/atoms/ChangeDifficulty";

const PERCENT = 0.5;

function App() {
  const [board, setBoard] = useState([]);
  const [winner, setWinner] = useState(false);
  const [intents, setIntents] = useState(0);
  const [level, setLevel] = useState(3);

  useEffect(() => {
    createBoard(level);
  }, []);

  useEffect(() => {
    resetBoard();
  }, [level]);

  const createBoard = (size) => {
    let board = [];
    for (let y = 0; y < size; y++) {
      let rows = [];
      for (let x = 0; x < size; x++) {
        rows.push({
          position: { x, y },
          active: Math.random() <= PERCENT,
        });
      }
      board.push(rows);
    }
    setBoard(board);
  };

  const checkBoard = () => {
    return board.some((cols) => cols.some(({ active }) => active));
  };

  const toogleCol = ({ x, y }) => {
    const newBoard = [...board];

    //current col
    newBoard[y][x].active = !newBoard[y][x].active;

    if (y < level - 1) newBoard[y + 1][x].active = !newBoard[y + 1][x].active;
    if (y > 0) newBoard[y - 1][x].active = !newBoard[y - 1][x].active;
    if (x < level - 1) newBoard[y][x + 1].active = !newBoard[y][x + 1].active;
    if (x > 0) newBoard[y][x - 1].active = !newBoard[y][x - 1].active;

    setBoard(newBoard);
    if (checkBoard()) {
      switchAudio.play();
    } else {
      gameWinAudio.play();
    }
    setWinner(!checkBoard());
    setIntents(intents + 1);
  };

  const resetBoard = () => {
    setWinner(false);
    createBoard(level);
    setIntents(0);
  };

  const changeDifficulty = () => {
    setLevel((level) => {
      return level < 4 ? level + 1 : 2;
    });
  };

  return (
    <div className="App">
      <h1 className="title">
        <span>Lights</span> <span>Out</span>
      </h1>
      <h3 className="intents">Intents: {intents}</h3>
      {winner ? (
        <div className="you-win">
          <h3>You Win!</h3>
        </div>
      ) : (
        <table className="board">
          <tbody>
            {board.map((cols, y) => {
              return (
                <tr className="row" key={`row-${y}`}>
                  {cols.map((col, x) => {
                    return (
                      <Row
                        position={col.position}
                        key={`col-${x}`}
                        active={col.active}
                        toogleCol={toogleCol}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="actions">
        <Button onClick={resetBoard}>Reset lights</Button>
      </div>
      <ChangeDifficulty level={level} onClick={changeDifficulty} />
    </div>
  );
}

export default App;
