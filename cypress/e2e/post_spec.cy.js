

describe('POST / characters', function () {

    before(function () {
        cy.back2ThePast();
        cy.setToken();
    });

    it('deve cadastrar um personagem', function () {

        const character = {
            name: 'Marc Spector',
            alias: 'Moon Knight',
            team: ['Midnight Mission'],
            active: true
        };

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201);
                expect(response.body.character_id.length).to.eql(24);
            });

    });

    context('quando o personagem já existe', function () {

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercury',
            team: [
                'West Coast Avengers',
                'Brotherhood of Evil Mutants'
            ],
            active: true
        };

        before(function () {

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(201);
                });

        }) 

        it('não deve cadastrar duplicado',  function () {

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400);
                    expect(response.body.error).to.eql('Duplicate character');
                });

        });

    });

});
