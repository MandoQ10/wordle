import Stack from '@mui/material/Stack';
import GameTile from "./gameTile";
import "../style/emptyRow.css";

function EmptyRow() {
    const emptyCells = Array.from(Array(5));

    return (
        <Stack className="game-row"
               direction="row"
               spacing={2}
        >

            {emptyCells.map((_, i) => {
                return <GameTile key={i} char={" "}/>
            })}

        </Stack>
    );
}
export default EmptyRow;