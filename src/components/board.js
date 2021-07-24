// React component 2 of 3
import React from 'react';
import Square from './square';

export default function Board(props) {
  const renderSquare = (idx) => {
    return (
      <Square
        value={props.squares[idx]}
        index={idx}
        winner={props.winner}
        onClick={() => props.onClick(idx)}
      />
    );
  }

  const gameBoard = [[], [], []];
  let value = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameBoard[i][j] = value++;
    }
  }

  return (
    gameBoard.map((row, idx) => (
      <div className="board-row" key={row[idx]}>
        <ul>{renderSquare(row[0])}</ul>
        <ul>{renderSquare(row[1])}</ul>
        <ul>{renderSquare(row[2])}</ul>
      </div>
    ))
  );
}
