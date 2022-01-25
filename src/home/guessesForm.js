import React, {useState} from "react";

function GuessesForm(props) {
    const [guess, setGuess] = useState("");

    return (
        <div>
            <form onSubmit={props.onSubmitGuess}>
                <label>
                    Guess A 5 Letter Word:
                    <input type="text" value={guess} name="guess" onChange={(e) => setGuess(e.target.value)}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}
export default GuessesForm;