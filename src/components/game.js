// React component 3 of 3: The parent component.

import React from 'react';
import Board from './board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        squareLocation: {
          row: 0,
          col: 0,
        }
      }],
      stepNumber: 0,
      xIsNext: true,
      movesAscending: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // This is the history of the game from the empty board to the latest step number, accounting for the possibility that a player has clicked on one of the buttons that wind the game back to a previous step. 
    const current = history[history.length - 1]; // The latest iteration of history, reflecting the move just prior to the latest move/click.
    const squares = current.squares.slice(); // A copy of the lastest squares array.

    let row;
    let col;

    if (i <= 2) row = 1;
    else if (i > 2 && i <= 5) row = 2;
    else row = 3;

    if (i === 0 || i === 3 || i === 6) col = 1;
    else if (i === 1 || i === 4 || i === 7) col = 2;
    else col = 3;

    if (this.calculateWinner(squares) || squares[i])
      return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares,
        squareLocation: {
          row: row,
          col: col
        }
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  toggleOrder() {
    this.state.movesAscending === true ? this.setState({ movesAscending: !true }) : this.setState({ movesAscending: true });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], [a, b, c]];
      }
    }
    return null;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares;
    const winner = this.calculateWinner(squares);
    const order = this.state.movesAscending;

    const moves = history.map((step, move) => {
      let desc;
      const squareDetails = history[history.length - move];

      if (order) {
        desc = move ? `Move # ${move}: row ${step.squareLocation.row}, col ${step.squareLocation.col}` : 'Game start';
      } else {
        desc = move ? `Move # ${history.length - move}: row ${squareDetails.squareLocation.row}, col ${squareDetails.squareLocation.col}` : 'Game start';
      }

      return (
        <li key={move} className="list">
          {order ?
            <button className="history" onClick={() => this.jumpTo(move)}>{desc}</button>
            :
            <button className="history" onClick={() => this.jumpTo(history.length - move)}>{desc}</button>
          }
        </li>
      );
    });

    let status;
    if (winner) status = 'Winner: ' + winner[0];
    else if (!winner && this.state.stepNumber >= 9) status = 'SCRATCH!';
    else status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    let toggle;
    if (order) toggle = 'History of Moves: Ascending';
    else toggle = 'History of Moves: Descending';

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winner={winner}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          {status !== 'SCRATCH!' && !winner ?
            <div className="status">{status}</div>
            :
            status === 'SCRATCH!' ? 
              <div className="scratch">{status}</div>
            : 
            <div className="winner">{status}</div>
          }
          <button
            className="button"
            onClick={() => this.toggleOrder()}
          >
            {toggle}
          </button>
          <div className="history">{moves}</div>
        </div>
      </div>
    );
  }
}
