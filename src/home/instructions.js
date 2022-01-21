import Card from 'react-bootstrap/Card';
import React from 'react';

function Instructions(){
    return(
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>Welcome To Wordle</Card.Title>
                    <Card.Subtitle>How To Play</Card.Subtitle>
                    <Card.Text>
                        Each guess must be a valid 5 letter word. Hit the enter button to submit.
                    </Card.Text>
                    <Card.Text>After each guess, the color of the tiles will change to show how close your guess was to the word.</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
export default Instructions;