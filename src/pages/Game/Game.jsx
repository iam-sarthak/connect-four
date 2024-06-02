import React, { useEffect, useState } from "react";
import Circle from "../../comp/Circle/Circle";
import "./Game.css";
import Popup from "../../comp/Popup/Popup";
const Game = () => {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]);
  const[crtPlayer, setCrtPlayer] = useState(1);
  const[optPlayer, setOptPlayer] = useState(2);
  const [gameOver,setGameOver] = useState(false);
  const [score,setScore] =useState([0,0]);
  const [winner, setWinner] = useState(null);


  const checkWin = (row, column, player) => {
    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal down-right
      [1, -1], // Diagonal down-left
    ];

    for (let [dx, dy] of directions) {
      let count = 1;

      // Check in one direction
      for (let step = 1; step < 4; step++) {
        const newRow = row + step * dx;
        const newCol = column + step * dy;
        if (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 6 && board[newRow][newCol] === player) {
          count++;
        } else {
          break;
        }
      }

      // Check in the opposite direction
      for (let step = 1; step < 4; step++) {
        const newRow = row - step * dx;
        const newCol = column - step * dy;
        if (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 6 && board[newRow][newCol] === player) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 4) {
        return true;
      }
    }

    return false;
  };

  const updateBoard = (row, column, player)=>{
    setBoard(prev => {
      const boardCopy = [...prev];
      boardCopy[row][column]=player;
      return boardCopy;
    });
    const status = checkWin(row,column,player);
    if (status) {
      setScore(prevScore => {
        const newScore = [...prevScore];
        newScore[player - 1]++;
        return newScore;
      });
      console.log("score"+score)
      // setGameOver(true);
    }
    
    return status;
  }
  const handleclick = e =>{
    if (gameOver) return;

    const column = parseInt(e.target.getAttribute('x'));
    if (isNaN(column)) return;

    let row = board.length - 1;
    while (row >= 0 && board[row][column] !== 0) {
      row--;
    }

    if (row < 0) return; // Column is full
    updateBoard(row, column, crtPlayer);
    setCrtPlayer(prev => (prev === 1 ? 2 : 1));
    console.log(board)
  }

  const resetGame = () => {
    setBoard([
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]);
    setCrtPlayer(1);
    setGameOver(false);
    setScore([0,0]);
    setWinner(null);
  };

  useEffect(() => {
    if (!gameOver) {
      const isFull = board.every(row => row.every(cell => cell !== 0));
      if (isFull) {
        setGameOver(true);
        setWinner(()=>{
          if (score[0]>score[1]) {
            return "Player 1";
          }else if(score[0]<score[1]){
            return"Player 2"
          }else{
            return null;
          }
        });
      }
    }
  }, [board, gameOver]);

  return (
    <>
    {gameOver && winner!=null && <Popup gameover={gameOver} winplayer={winner} reset={resetGame}/>}
    <div className="game">
        <div className="title">
            <h1>Connect Four Now!!!</h1>
        </div>
        <div className="reset">
            <button onClick={resetGame}>Reset</button>
        </div>
      <div className="board" id="board" onClick={gameOver?null:handleclick}>
        {board.map((row, i) => {
          return (
            <>
              <div className="row">
                {row.map((ch, j) => {
                  return <Circle ch={ch}  y={i} x={j}/>;
                })}
              </div>
            </>
          );
        })}
      </div>
      <div className="score">
        <div className="player1 score-box">
            <p className="score-text">Player 1</p>
            <p id="player1score" className="currentscore">{score[0]}</p>
        </div>
        {/* <div className="timer score-box">
        <p className="score-text">Timer</p>
            <p id="time" className="currenttimer">20s</p>
        </div> */}
        <div className="player2 score-box">
        <p className="score-text">Player 2</p>
            <p id="player2score" className="currentscore">{score[1]}</p>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default Game;
