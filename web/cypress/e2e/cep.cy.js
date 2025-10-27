import andress from '../fixtures/cep.json'
describe('deve validar o campo de CEP', () => {
    beforeEach(() => {
        cy.login();
        cy.goTo('Integração', 'Consulta de CEP');
    })
    it('Deve conseguir validar a consulta de CEP', () => {

        cy.intercept('GET', `https://viacep.com.br/ws/${andress.cep}/json/`, {
            statusCode: 200,
            body: {
                logradouro: andress.street,
                bairro: andress.neighborhood,
                localidade: andress.city,
                uf: andress.state
            }
        }).as('getCep')

        cy.get('#cep').type(andress.cep)
        cy.contains('button', 'Buscar').click()

        cy.wait('@getCep')

        cy.get('#street').should('have.value', andress.street)
        cy.get('#neighborhood').should('have.value', andress.neighborhood)
        cy.get('#city').should('have.value', andress.city)
        cy.get('#state').should('have.value', andress.state)
    })
})