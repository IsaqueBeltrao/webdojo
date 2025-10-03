describe('Validações de alertas em javaScript', () => {
    beforeEach(() => {
        cy.login();
        cy.goTo('Alertas JS', 'JavaScript Alerts');

    })

    it('Deve validar a mensagem de alerta', () => {
        cy.log('todo')

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou uma Alert Box!')
        })
        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um dialogo e validar a resposta positiva', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperta um botão!')
            return true; // simula o click no botão ok 
        })
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()

    })
    it.only('Deve cancelar um dialogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperta um botão!')
            return false; // simula o click no botão Cancelar
        })
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()

    })

})