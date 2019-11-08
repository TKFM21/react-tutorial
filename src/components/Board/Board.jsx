import React from 'react';
import Square from '../Square/Square';
import './Board.css';

class Board extends React.Component {
    createSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.history[i]}
                squareGotAndChangePlayer={() => this.props.squareGotAndChangePlayer(i)}
            />
        );
    }

    render() {
        const board = [];
        for (let i = 0; i < 3; i++) {
            const row = [];
            for (let j = 0; j < 3; j++) {
                row.push(this.createSquare(3 * i + j));
            }
            board.push(<div key={i} className="squareWrap">{row}</div>);
        }

        return (
            <div className="board">
                {board}
            </div>
        );
    }
}

export default Board;