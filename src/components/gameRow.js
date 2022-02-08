import Stack from '@mui/material/Stack';
import GameTile from "./gameTile";
import "../style/gameRow.css";

function GameRow(props) {
    const guessCharacters = props.playerGuess.split('')

    return (
        <Stack
            className="game-row"
            letters={props.playerGuess}
            direction="row"
            spacing={2}
        >
            {guessCharacters.map((character) => {
                return <GameTile char={character}/>
            })}

        </Stack>
    );
}
export default GameRow;