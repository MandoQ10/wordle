import React from 'react';
import axios from "axios";
import GuessesForm from "./guessesForm";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "",
            attempts: 6,
            didWin: false,
            errorMessage: ""
        };
        this.getRandomWord = this.getRandomWord.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkGuess = this.checkGuess.bind(this);
        this.getWinStatus = this.getWinStatus.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.checkGuess(event.target.elements[0].value);
        event.target.elements[0].value = "";
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
                    attempts: 6,
                    didWin: false
                });
                console.log(this.state.word)
            });
    }

    checkGuess(guess){
        let word = this.state.word.toLowerCase();
        let playerGuess = guess.toLowerCase();

        if(playerGuess.length !== 5 && this.state.attempts > 0){
            this.setState(() => { return { errorMessage: "Invalid Guess: word must be 5 characters exactly" }})
            return;
        }else if(this.state.attempts === 0){
            this.setState(() => { return { errorMessage: "You have no attempts remaining"} })
            return;
        }
        else{
            this.setState(() => { return { errorMessage: "" }})
        }

        if(word === playerGuess && this.state.attempts > 0){
            this.setState(() => { return { didWin: true }})
            return;
        }

        this.setState((state) => { return { attempts: state.attempts - 1, didWin: false}})
    }

    getWinStatus(){
        if(this.state.attempts === 6 && !this.state.didWin){
            return "Begin Guessing!";
        }

        if(this.state.didWin){
            return "You Won!";
        }else if(!this.state.didWin && this.state.attempts > 0){
            return "Guess Again";
        }else{
            return "You Lost!"
        }
    }

    componentDidMount() {
        this.getRandomWord();
    }

    render() {
        return(
            <div>
                <h2 data-testid="win-status">Win Status: { this.getWinStatus()}</h2>
                <h3>Attempts Remaining: {this.state.attempts}</h3>
                <h3 data-testid="error-label">{this.state.errorMessage}</h3>
                <GuessesForm onSubmitGuess={this.handleSubmit}/>
            </div>
        );
    }
}
export default Game;