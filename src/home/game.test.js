import {render, screen, fireEvent, getByText, getByRole, waitFor} from '@testing-library/react';
import Game from '../home/game';
import axiosMock from "axios";

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
    render(<Game />)

    const input = screen.getByPlaceholderText(/Enter Guess/i)
    const submitButton = screen.getByText(/Submit/i)
    const winStatusText = screen.getByRole('heading', { name: /Win Status: Guess Again/i })

    const wordText = await waitFor( () => screen.getByTestId("word"))

    fireEvent.change(input, {target: {value: 'Mocks'}})
    fireEvent.click(submitButton)

    expect(wordText).toHaveTextContent("Mocks")
    // expect(winStatusText.textContent).toBe("Win Status: You Won!")
});
