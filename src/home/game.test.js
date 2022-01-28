import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Game from '../home/game';
import axios from 'axios';

const axiosResponse = {data: {word: "Mocks"}} ;

test('renders numbers of attempts text', () => {
    render(<Game />);

    const attemptText = screen.getByRole('heading', { name: /Number of Attempts: 0/i })

    expect(attemptText).toBeInTheDocument();
});

test('entering a guess should increase the attempt counter by 1', () => {
    render(<Game />);

    const input = screen.getByPlaceholderText(/Enter Guess/i)
    const submitButton = screen.getByText(/Submit/i)
    const attemptText = screen.getByRole('heading', { name: /Number of Attempts: 0/i })

    fireEvent.change(input, {target: {value: 'guess'}})
    fireEvent.click(submitButton)

    expect(attemptText.textContent).toBe("Number of Attempts: 1")
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
test('if the user does not enter the correct word, they should guess again', async() => {
    jest.spyOn(axios, 'request').mockResolvedValueOnce(axiosResponse);
    render(<Game />)

    await waitFor(() => expect(axios.request).toHaveBeenCalledTimes(1))
    const guessInput = screen.getByPlaceholderText(/Enter Guess/i)
    const submitButton = screen.getByText(/Submit/i)

    fireEvent.change(guessInput, {target: {value: 'order'}})
    fireEvent.click(submitButton)

    const winStatus = await waitFor(() => { return screen.getByTestId('win-status')})
    expect(winStatus).toHaveTextContent("Win Status: Guess Again")
});