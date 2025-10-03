describe('Links abrindo nova guia/janelas', () => {

    beforeEach(() => {
        cy.login()
    })
    
    it('Validando o atributo do link do Instagram', () => {

        // Pode validar apenas os atributos sem necessáriamente validar a nova aba de uma outra aplicação ( links externos)
        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
            .and('have.attr', 'target', '_blank')

    })
    //Ou pode remover o atributo que altera para uma nova aba, e deixar com que ela seja aberta na mesma aba do projeto e assim validar 
    it('Acessando o link termo de uso e removendo o target blank', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.contains('Formulários').click()

        cy.contains('a', 'termos de uso')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso. Se você não concordar com algum aspecto destes termos, não utilize nossos serviços.')
            .should('be.visible')
    })
})