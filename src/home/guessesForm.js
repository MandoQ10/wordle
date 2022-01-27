import React, {useState} from "react";

function GuessesForm(props) {
    return (
        <div>
            <form onSubmit={props.onSubmitGuess}>
                <label>
                    Guess A 5 Letter Word:
                    <input placeholder={"Enter Guess"} type="text" name="guess"/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default GuessesForm;