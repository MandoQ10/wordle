import React from 'react';
import axios from "axios";
import '../style/game.css'
import GuessesForm from "./guessesForm";
import Instructions from "./instructions";
import GameRow from "./gameRow";
import Header from "./header";
import EmptyRow from "./emptyRow";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "",
            playerGuesses: [],
            emptyRows: Array(6).fill(" "),
            attempts: 6,
            didWin: false,
            errorMessage: "",
            didOpenInstructions: false
        };
        this.getRandomWord = this.getRandomWord.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkGuess = this.checkGuess.bind(this);
        this.getWinStatus = this.getWinStatus.bind(this);
        this.toggleInstructions = this.toggleInstructions.bind(this);
        this.removeEmptyRow = this.removeEmptyRow.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.checkGuess(event.target.elements[0].value);
        event.target.elements[0].value = "";
    }

    toggleInstructions(){
        this.setState((prevState) => { return { didOpenInstructions: !prevState.didOpenInstructions }})
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
            this.removeEmptyRow();
            this.setState((prevState) => { return { attempts: prevState.attempts - 1, didWin: true, playerGuesses: [...prevState.playerGuesses, playerGuess] }})
            return;
        }

        this.removeEmptyRow();
        this.setState((prevState) => { return { attempts: prevState.attempts - 1, didWin: false, playerGuesses: [...prevState.playerGuesses, playerGuess]}})

    }

    removeEmptyRow(){
        const currentEmptyRows = this.state.emptyRows;
        currentEmptyRows.pop();
        this.setState({emptyRows: currentEmptyRows});
    }

    getWinStatus(){
        if(this.state.didWin){
            return "You Won!";
        }else{
            return "You Lost!"
        }
    }

    componentDidMount() {
        this.getRandomWord();
    }

    render() {

        return(
            <div id="game-container">
                <Header toggleInstructions={this.toggleInstructions}/>

                {this.state.didOpenInstructions ? <Instructions closeInstructions={this.toggleInstructions}/> : null}

                <h3 data-testid="win-status">Win Status: {this.getWinStatus()}</h3>
                <h3>Attempts Remaining: {this.state.attempts}</h3>
                <h3 data-testid="error-label">{this.state.errorMessage}</h3>
                <GuessesForm onSubmitGuess={this.handleSubmit}/>


                {this.state.playerGuesses.map((guess) => {
                    return  <GameRow playerGuess={guess}/>
                })}

                { this.state.emptyRows.map((_ => {
                    return <EmptyRow />
                }))
                }


            </div>
        );
    }
}
export default Game;