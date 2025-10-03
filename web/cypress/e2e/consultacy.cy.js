import { Company, Personal } from '../fixtures/consultacy.json'

describe('Formulario de consultoria', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })

    it('Deve solicitar consultoria individual', () => {
        cy.fillConsultacyForm(Personal)
        cy.submitConsultacyForm()
        cy.validadeConsultacyModal()
    })

    it('Deve solicitar consultoria In Company', () => {
        cy.fillConsultacyForm(Company)
        cy.submitConsultacyForm()
        cy.validadeConsultacyModal()
    })

    it('Deve verificar os campos obrigatórios', () => {
        cy.submitConsultacyForm()

        const requiredFilds = [
            { label: 'Nome Completo ', message: 'Campo obrigatório' },
            { label: 'Email ', message: 'Campo obrigatório' },
            { label: 'termos de uso', message: 'Você precisa aceitar os termos de uso' }
        ]
        requiredFilds.forEach(({label, message}) => {
            cy.contains('label', label)
                .parent()
                .find('p')
                .should('be.visible')
                .should('have.text', message)
                .and('have.class', 'text-red-400')
                .and('have.css', 'color', 'rgb(248, 113, 113)')
        })

    })

})


