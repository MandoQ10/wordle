import Card from 'react-bootstrap/Card';
import React from 'react';

function Instructions(props){
    return(
            <Card style={{backgroundColor: '#121213', color: 'white', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                <button onClick={props.closeInstructions}>X</button>
                <Card.Body>
                    <Card.Title>Welcome To Wordle</Card.Title>
                    <Card.Subtitle>How To Play</Card.Subtitle>
                    <Card.Text>
                        Each guess must be a valid 5 letter word. Hit the enter button to submit.
                    </Card.Text>
                    <Card.Text>After each guess, the color of the tiles will change to show how close your guess was to the word.</Card.Text>
                </Card.Body>
            </Card>
    );
}
export default Instructions;