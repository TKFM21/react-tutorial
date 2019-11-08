import React from 'react';
import PropTyeps from 'prop-types';
import './Square.css';

function Square(props) {
    return (
        <span onClick={props.squareGotAndChangePlayer}>{props.value}</span>
    );
}

Square.propTypes = {
    value: PropTyeps.string.isRequired,
    squareGotAndChangePlayer: PropTyeps.func.isRequired,
};

export default Square;