import Item from "@mui/material/Stack";
import Stack from "@mui/material/Stack";
import "../style/header.css";

function Header(props) {
    return (
        <Stack id="header">
            <Item><button onClick={props.toggleInstructions}>?</button></Item>
            <Item>Wordle</Item>
            <Item> </Item>
        </Stack>
    );
}
export default Header