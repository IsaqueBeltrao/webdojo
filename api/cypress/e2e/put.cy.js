describe('PUT/api/users/:id', () => {

    context('Atualizacao', () => {
        let userId

        const originalUser = {
            name: 'Peter parker',
            email: 'parker@stark.com',
            password: '123456'
        }

        const updatedUser = {
            name: 'spiderman',
            email: 'spider@marvel.com',
            password: '654321'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updatedUser.email)

            cy.postUser(originalUser).then((response) => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })
        })

        it('Deve atualizar um usuário existente', () => {
            cy.putUser(userId, updatedUser).then((response) => {
                expect(response.status).to.eq(204)
            })
        })

        after(() => {
            cy.getUsers().then((response) => {
                const spider = response.body.find(user => user.id === userId)
                expect(spider).to.exist
                expect(spider.name).to.eq(updatedUser.name)
                expect(spider.email).to.eq(updatedUser.email)
            })
        })
    })
    context('Quando o id não existe', () => {

        let userId
        const originalUser = {
            name: 'Tony stark',
            email: 'tony@stark.com',
            password: '123456'
        }

        const updatedUser = {
            name: 'Iron man',
            email: 'ironman@marvel.com',
            password: '654321'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updatedUser.email)

            cy.postUser(originalUser).then((response) => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })

            cy.task('deleteUser', originalUser.email)
        })

        it('Deve retornar 404 user not found', () => {
            cy.api({
                method: 'PUT',
                url: 'http://localhost:3333/api/users/' + userId,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: updatedUser,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('User not found')
            })
        })

    })
    context('Campos obrigatórios', () => {
        it('O campo name deve ser obrigatório', () => {
            const user = {
                email: 'storm@men.com',
                password: '123456',
            }
            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('Name field is required.')

            })
        })
        it('O campo email deve ser obrigatório', () => {
            const user = {
                name: 'Jean Grey',
                password: '123456',
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('Email field is required.')

            })
        })

        it('O campo senha deve ser obrigatório', () => {
            const user = {
                name: 'Charles Xavier',
                email: 'xavier@xmen.com',
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('Password field is required.')

            })
        })

        it('Não deve passar quando o JSON esta mal formatado', () => {
            const user = `{
      name: 'Magneto',
      email: 'erik@xmen.com'
      password: '123456'
    }`

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('Invalid JSON format')

            })
        })
    })

})
