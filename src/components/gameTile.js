import Item from "@mui/material/Stack";
import "../style/gameTile.css";

function GameTile(props) {
    return (
        <Item className="game-tile">{props.char.toString().toUpperCase()}</Item>
    );
}
export default GameTile;