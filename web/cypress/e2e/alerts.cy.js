describe('Validações de alertas em javaScript', () => {
    beforeEach(() => {
        cy.login();
        cy.goTo('Alertas JS', 'JavaScript Alerts');

    })

    it('Deve validar a mensagem de alerta', () => {
        cy.log('todo')

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')
        })
        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um dialogo e validar a resposta positiva', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return true; // simula o click no botão ok 
        })
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()

    })
    it('Deve cancelar um dialogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return false; // simula o click no botão Cancelar
        })
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()

    })
    it('Deve validar o texto do prompt', () => {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('IsaqueQA')
        })
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá IsaqueQA! Boas-vindas ao WebDojo!')
        })
        cy.contains('button', 'Mostrar Prompt').click()
    })
})