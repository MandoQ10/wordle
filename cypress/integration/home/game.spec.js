describe("Wordle game play", () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })

    it('should successfully takes in guess and increments attempt counter', () =>{
        cy.get('#guess').type('Guess')
        cy.get('form').submit()

        cy.contains("Number of Attempts: 1")
    })

    it('should successfully reset the game (attempts)', () =>{
        cy.get('#guess').type('Guess')
        cy.get('form').submit()

        cy.contains("Number of Attempts: 1")
    })
})
