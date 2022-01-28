import React from 'react';
import axios from "axios";
import GuessesForm from "./guessesForm";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "",
            attempts: 0,
            didWin: false
        };
        this.getRandomWord = this.getRandomWord.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkGuess = this.checkGuess.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.checkGuess(event.target.elements[0].value);
    }

    getRandomWord(){
        let options = {
            method: 'GET',
            url: 'https://wordsapiv1.p.rapidapi.com/words/',
            params: {
                letters: '5',
                random: 'true'
            },
            headers: {
                'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
                'x-rapidapi-key': '15cd39e3d7mshb952ccd1d7ec421p1f15d8jsne8063d05b66d'
            }
        };
       return axios.request(options)
            .then(res => {
                this.setState({
                    word: res.data.word,
                    attempts: 0,
                    didWin: false
                });
                console.log(this.state.word)
            });

    }

    checkGuess(guess){
        let word = this.state.word.toLowerCase();
        let playerGuess = guess.toLowerCase();

        if(word === playerGuess){
            this.setState(() => { return {attempts: 0, didWin: true}})

            return true;
        }
        this.setState((state) => { return { attempts: state.attempts + 1, didWin: false}})
        return false;
    }

    componentDidMount() {
        this.getRandomWord();
    }

    render() {
        return(
            <div>
                <h2 data-testid="win-status">Win Status: { this.state.didWin ? "You Won!" : "Guess Again"}</h2>
                <h3>Number of Attempts: {this.state.attempts}</h3>
                <GuessesForm onSubmitGuess={this.handleSubmit}/>
            </div>
        );
    }
}
export default Game;