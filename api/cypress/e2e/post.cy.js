

describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: 'Wolverine',
      email: 'logan@xmen.com',
      password: '123456'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      // basic contract checks
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('createdAt')
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

      expect(response.body.message).to.eq('User registered successfully.')
      expect(response.body.user.id).to.match(/^-?\d+$/)
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)

      // security: password should not be returned in the response
      expect(response.body.user).to.not.have.property('password')

      expect(response.body.createdAt).to.match(isoDateRegex)
    })
  })

  it('Não deve cadastrar com email duplicado', () => {

    const user = {
      name: 'cyclops',
      email: 'scott@xmen.com',
      password: '123456'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.error).to.eq('Email already exists in the database.')

    })

  })

  it('O campo name deve ser obrigatório', () => {
    const user = {
      email: 'storm@men.com',
      password: '123456',
    }
    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('Name field is required.')

    })
  })
  it('O campo email deve ser obrigatório', () => {
    const user = {
      name: 'Jean Grey',
      password: '123456',
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('Email field is required.')

    })
  })

  it('O campo senha deve ser obrigatório', () => {
    const user = {
      name: 'Charles Xavier',
      email: 'xavier@xmen.com',
    }

    cy.postUser(user).then((response) => {
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

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('Invalid JSON format')

    })
  })

})

