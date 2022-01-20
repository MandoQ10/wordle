describe("Wordle Instructions", () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })
    it('contains the title "Welcome to Wordle"', () =>{
        cy.contains('Welcome To Wordle')
    })

    it("contains the correct instructions to play Wordle", () =>{
        cy.contains('How To Play')
        cy.contains('Each guess must be a valid 5 letter word. Hit the enter button to submit.')
        cy.contains('After each guess, the color of the tiles will change to show how close your guess was to the word.')
    })
})
