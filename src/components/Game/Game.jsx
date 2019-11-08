import React from 'react';
import Board from '../Board/Board';
import Button from '../Button/Button';
import './Game.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlayerX: true,
            history: [{
                squares: Array(9).fill('')
            }],
            endGame: false,
        };

        this.squareGotAndChangePlayer = this.squareGotAndChangePlayer.bind(this);
        this.gameStart = this.gameStart.bind(this);
    }

    gameStart(index) {
        this.setState({
            isPlayerX: (index % 2) === 0 ? true : false,
            history: this.state.history.slice(0, index + 1),
            endGame: false,
        });
    }

    gameSetCheck(currentSituation) {
        let winner;
        const gameSetPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4,6]];
        gameSetPattern.forEach(pattern => {
            const result = pattern.map(point => currentSituation[point]);
            if (result[0] && result[0] === result[1] && result[1] === result[2]) {
                winner = result[0];
                return;
            }
        });
        return winner;
    }

    squareGotAndChangePlayer(index) {
        const history = this.state.history;
        const squares = history[history.length -1].squares.slice();
        if (squares[index] || this.state.endGame) {
            return;
        }
        squares[index] = this.state.isPlayerX ? 'X' : 'O';
        const winner = this.gameSetCheck(squares);
        this.setState({
            history: history.concat({squares: squares}),
            isPlayerX: winner ? this.state.isPlayerX : !this.state.isPlayerX,
            endGame: winner ? true : false,
        });
    }

    render() {
        let message = 'Player: ' + (this.state.isPlayerX ? 'X' : 'O');
        if (this.state.endGame) {
            message = 'Winner: ' + (this.state.isPlayerX ? 'X' : 'O') + '!!';
        }

        const buttonRender = this.state.history.map((_, index) => {
            const desc = index ? 'Go to #' + index : 'ReStart';
            return (
                <Button key={index} onClickHandler={() => this.gameStart(index)}>{desc}</Button>
            );
        });

        return (
            <div className="game">
                <div className="field">
                    <h1 className="message">{message}</h1>
                    <Board
                        history={this.state.history[this.state.history.length - 1].squares}
                        isPlayerX={this.state.isPlayerX}
                        endGame={this.state.endGame}
                        gameStart={this.gameStart}
                        squareGotAndChangePlayer={this.squareGotAndChangePlayer}
                    />
                </div>
                <div className="btnContainer">
                    {buttonRender}
                </div>
            </div>
        );
    }
}

export default Game;


// 履歴内のそれぞれの着手の位置を (col, row) というフォーマットで表示する。
// 着手履歴のリスト中で現在選択されているアイテムをボールドにする。
// Board でマス目を並べる部分を、ハードコーディングではなく 2 つのループを使用するように書き換える。
// 着手履歴のリストを昇順・降順いずれでも並べかえられるよう、トグルボタンを追加する。
// どちらかが勝利した際に、勝利につながった 3 つのマス目をハイライトする。
// どちらも勝利しなかった場合、結果が引き分けになったというメッセージを表示する。