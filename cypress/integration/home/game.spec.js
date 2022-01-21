describe("Wordle game play", () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })
    it('contains the title "Coming Soon..."', () =>{
        cy.contains('Coming Soon...')
    })
})
