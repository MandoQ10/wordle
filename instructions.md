# Wordle

The goal of this project is to build a browser-based version of the (as of January 2022) popular game Wordle. In some ways, it will be a clone of [this](https://www.powerlanguage.co.uk/wordle/).

## How does the game work?
- Guess the WORDLE in 6 tries.
- Each guess must be a valid 5 letter word. Hit the enter button to submit.
- After each guess, the color of the tiles will change to show how close your guess was to the word. (added by me) Green indicates a correct letter in the correct spot. Yellow indicates a letter that is in the word, but in the wrong spot. Gray indicates a letter that is not in the word at all.

I highly recommend going to https://www.powerlanguage.co.uk/wordle/ and playing it for yourself to get a feel for it.

## Implementation requirements

- The game should be playable in any modern web browser. It should look and feel the same in Firefox, Chrome, Safari, Edge, etc.
- It should be mobile-friendly. In other words, you should be able to easily play it on a phone (no horizontal scrolling, text isn't too small, etc.)
- I'm going to be prescriptive and say use React.
- You can choose whatever test runner + test library(ies) you like, but I would recommend `jest` and `react-testing-library`.
- TDD all the things. Yes, it can be hard. Yes, it does get easier with practice. Yes, it is worth it. We expect to see a high level of test coverage. `jest` gives you test coverage out of the box :).
- "Deploy" the game to production via GitHub pages.

## Resources

- [Breaking down user stories into tasks](https://www.pluralsight.com/guides/break-down-agile-user-stories-into-tasks-and-estimate-level-of-effort)
- [Create React App](https://create-react-app.dev/)
- [React apps on GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages)
- [TDD in React - longer guide/reference](https://outsidein.dev/about-this-guide.html)
- [TDD in React - short guide](https://learntdd.in/react/#setup)