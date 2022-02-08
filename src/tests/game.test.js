import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Game from '../components/game';
import axios from 'axios';

const axiosResponse = {data: {word: "Mocks"}} ;
const sixAttemptsRemainingString = "Attempts Remaining: 6"

test('renders numbers of attempts out of 6 text', () => {
    render(<Game />);

    const attemptText = screen.getByRole('heading', { name: sixAttemptsRemainingString })

    expect(attemptText).toBeInTheDocument();
});

test('entering a guess should increase the attempt counter by 1', () => {
    render(<Game />);

    const input = screen.getByPlaceholderText(/Enter Guess/i)
    const submitButton = screen.getByText(/Submit/i)
    const attemptText = screen.getByRole('heading', { name: sixAttemptsRemainingString })

    fireEvent.change(input, {target: {value: 'guess'}})
    fireEvent.click(submitButton)

    expect(attemptText.textContent).toBe("Attempts Remaining: 5")
});

test('should not allow an invalid guess', () => {
    render(<Game />);

    const input = screen.getByPlaceholderText(/Enter Guess/i)
    const submitButton = screen.getByText(/Submit/i)
    const attemptText = screen.getByRole('heading', { name: sixAttemptsRemainingString })

    fireEvent.change(input, {target: {value: 'guesses'}})
    fireEvent.click(submitButton)

    expect(attemptText.textContent).toBe("Attempts Remaining: 6")
});

test('error label should be empty on loading game', () => {
    render(<Game />);

    const errorLabel = screen.getByTestId("error-label")

    expect(errorLabel.textContent).toBe("")
});

test('invalid guess length displays error message', () => {
    render(<Game />);

    const input = screen.getByPlaceholderText(/Enter Guess/i)
    const submitButton = screen.getByText(/Submit/i)
    const errorLabel = screen.getByTestId("error-label")

    fireEvent.change(input, {target: {value: 'guesses'}})
    fireEvent.click(submitButton)

    expect(errorLabel.textContent).toBe("Invalid Guess: word must be 5 characters exactly")
});

test('should display "You Lost" message after 6 unsuccessful attempts', async () => {
    render(<Game/>);

    const input = screen.getByPlaceholderText(/Enter Guess/i)
    const submitButton = screen.getByText(/Submit/i)

    let clicks = 1

    while (clicks <= 6){
        fireEvent.change(input, {target: {value: 'guess'}})
        fireEvent.click(submitButton)
        clicks++
    }

    const winStatus = await waitFor(() => { return screen.getByTestId('win-status') })
    expect(winStatus).toHaveTextContent("Win Status: You Lost")
});

test('a user should not be able to submit more than 6 attempts', async () => {
    render(<Game/>);

    const input = screen.getByPlaceholderText(/Enter Guess/i)
    const submitButton = screen.getByText(/Submit/i)
    const attemptText = screen.getByRole('heading', {name: sixAttemptsRemainingString})

    let clicks = 1

    while (clicks <= 10){
        fireEvent.change(input, {target: {value: 'guess'}})
        fireEvent.click(submitButton)
        clicks++
    }

    expect(attemptText.textContent).toBe("Attempts Remaining: 0")
});


test('if user enters correct word, the game is won', async() => {
    jest.spyOn(axios, 'request').mockResolvedValueOnce(axiosResponse);
    render(<Game />)

    await waitFor(() => expect(axios.request).toHaveBeenCalledTimes(1))
    const guessInput = screen.getByPlaceholderText(/Enter Guess/i)
    const submitButton = screen.getByText(/Submit/i)

    fireEvent.change(guessInput, {target: {value: 'Mocks'}})
    fireEvent.click(submitButton)

    const winStatus = await waitFor(() => { return screen.getByTestId('win-status')})
    expect(winStatus).toHaveTextContent("Win Status: You Won!")
});