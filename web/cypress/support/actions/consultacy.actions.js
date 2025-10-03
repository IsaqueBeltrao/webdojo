Cypress.Commands.add('fillConsultacyForm', (form) => {
       //Campo Nome Completo Selector CSS        
        cy.get('input[placeholder="Digite seu nome completo"]').type(form.name)
        //Campo Email - Selector CSS
        cy.get('input[placeholder="Digite seu email"]').type(form.email)
        // Campo Telefone - Selector CSS
        cy.get('input[placeholder="(00) 00000-0000"]').type(form.phone)
        //.should('have.value', "(11) 99999-1000")
        // Dropdown Select - Xpaht customizado vs Encademaneto funcional do Cypress
        cy.contains('label', 'Tipo de Consultoria')
            .parent()//elemento "Pai"
            .find('select')//"Encontrar"
            .select(form.consultacyType)
        // Button Radio Options - Xpaht customizado vs Encademaneto funcional do Cypress

        if (form.personType === 'CPF') {
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('not.be.checked')

        }

        if (form.personType === 'CNPJ') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('not.be.checked')

        }

        //Campo CPF - Xpaht customizado vs Encademaneto funcional do Cypress
        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(form.document)
        //.should('have.value', '112.893.950-98')

        //Interagindo com CheckBoxes e Selecionando tudo com forEach

        form.discoveryChannel.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')

        })
        // Interagindo com Upload de arquivos

        Cypress.on('uncaught:exception', (err, runnable) => {
            // Ignora erros não tratados da aplicação
            return false;
        });
        cy.get('input[type="file"]')
            .selectFile(form.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(form.describe)

        form.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        if (form.terms == true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }
})

Cypress.Commands.add('submitConsultacyForm', () => {
    cy.contains('button', 'Enviar formulário')
        .click()
})

Cypress.Commands.add('validadeConsultacyModal', () => {
    cy.get('.modal', { timeout: 10000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

})
