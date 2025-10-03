describe('Gerenciamento de perfis no gitHub', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo perfil do gitHub', () => {
        cy.get('#name').type('Isaque Franca de Oliveira Beltrao')
        cy.get('#username').type('IsaqueFranca')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.get('#name').type('Isaque Franca de Oliveira Beltrao')
        cy.get('#username').type('IsaqueBeltrao')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', 'IsaqueBeltrao')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('td', 'Isaque Franca de Oliveira Beltrao')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('td', 'QA')
            .should('be.visible')


    })
    it('Deve conseguir remover um perfil do gitHub', () => {
        const profile = {
            name: 'isaque França',
            username: 'isaque Beltrão',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')
        cy.get('@trProfile').find('button[title="Remover perfil"]').click()

        cy.contains('table tbody', profile.username)
            .should('not.exist')
    })
        it.only('Deve validar o link do  gitHub', () => {
        const profile = {
            name: 'isaque França',
            username: 'isaqueBeltrao',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')
        cy.get('@trProfile').find('a')
            .should('have.attr', 'href', 'https://github.com/'+ profile.username)
            .and('have.attr', 'target', '_blank')
    })
})