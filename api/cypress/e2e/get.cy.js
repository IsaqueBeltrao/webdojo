describe('GET /api/users', () => {

    const heroes = [
        {
            name: "Clark Kent",
            email: "clark.kent@dailyplanet.com",
            password: "123456"
        },
        {
            name: "Bruce Wayne",
            email: "bruce.wayne@wayneenterprises.com",
            password: "123456"
        },
        {
            name: "Diana Prince",
            email: "diana.prince@themyscira.com",
            password: "123456"
        },
        {
            name: "Barry Allen",
            email: "barry.allen@ccpd.com",
            password: "123456"
        },
        {
            name: "Arthur Curry",
            email: "arthur.curry@atlantis.com",
            password: "123456"
        }
    ];

    before(() => {
        heroes.forEach((hero) => {
            cy.postUser(hero)
        })

    })

    it('Deve retornar uma lista de usuários', () => {
        cy.getUsers().then((response) => {
            expect(response.status).to.eq(200)

            heroes.forEach((hero) => {
                const fund = response.body.find((user) => user.email === hero.email)
                expect(fund.name).to.eq(hero.name)
                expect(fund.email).to.eq(hero.email)
                expect(fund).to.have.property('id')
            })
        })
    })
})