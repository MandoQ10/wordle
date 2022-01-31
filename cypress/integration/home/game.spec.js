describe("Wordle game play", () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })

    it('should successfully takes in guess and increments attempt counter', () =>{
        cy.get('#guessInput').type('Guess')
        cy.get('form').submit()

        cy.contains("Attempts Remaining: 5")
    })

    it('should display "Invalid Guess: word must be 5 characters exactly"', () =>{
        cy.get('#guessInput').type('Guesses')
        cy.get('form').submit()

        cy.contains("Attempts Remaining: 6")
        cy.contains("Invalid Guess: word must be 5 characters exactly")
    })

    it('after 6 successful attempts, the game should display the user has lost', () =>{
        let formSubmits = 0

        while(formSubmits < 7){
            cy.get('#guessInput').type('Guess')
            cy.get('form').submit()
            formSubmits++
        }
        cy.contains("Win Status: You Lost!")
    })

    it('after no attempts remain, attempt counter should not go below 0', () =>{
        let formSubmits = 0

        while(formSubmits < 10){
            cy.get('#guessInput').type('Guess')
            cy.get('form').submit()
            formSubmits++
        }

        cy.contains("Attempts Remaining: 0")
    })

    it('with no attempts remaining, if a guess is submitted, an error message should be displayed', () =>{
        let formSubmits = 0

        while(formSubmits < 10){
            cy.get('#guessInput').type('Guess')
            cy.get('form').submit()
            formSubmits++
        }

        cy.contains("You have no attempts remaining")
    })

})
