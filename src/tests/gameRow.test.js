import {render, screen, fireEvent} from '@testing-library/react';
import Game from '../components/game';

test('when entering a valid guess, the row container should have the guess in its attributes', () => {
    const { container } = render(<Game />)

    const input = screen.getByPlaceholderText(/Enter Guess/i)
    const submitButton = screen.getByText(/Submit/i)

    fireEvent.change(input, {target: {value: 'guess'}})
    fireEvent.click(submitButton)

    const guessRow = container.querySelector('[letters="guess"]')

    expect(guessRow).toBeInTheDocument()
});

test('when game begins, 6 empty guess rows should be present', async () => {
    const {container} = render(<Game/>)

    const guessRows = await container.getElementsByClassName("game-row")

    expect(guessRows).toHaveLength(6)
});

test('After a successful guess is submitted, there should still be 6 game rows present', async () => {
    const {container} = render(<Game/>)
    const input = screen.getByPlaceholderText(/Enter Guess/i)
    const submitButton = screen.getByText(/Submit/i)

    fireEvent.change(input, {target: {value: 'guess'}})
    fireEvent.click(submitButton)

    const guessRows = await container.getElementsByClassName("game-row")

    expect(guessRows).toHaveLength(6)
});


