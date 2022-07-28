

describe('GET /characters', function () {

    const characters = [
        {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['x-men'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['x-men'],
            active: true
        },
        {
            name: 'Peter Parker',
            alias: 'Spider-Man',
            team: ['New Avengers'],
            active: true
        }
    ];

    before(function () {
        cy.populateCharacters(characters);
    });

    it('deve retornar uma lista de personagens', function () {
        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200);
            expect(response.body).to.be.a('array');
            expect(response.body.length).greaterThan(0);
        });
    });

    it('deve buscar personagem por nome', function () {
        cy.searchCharacter('Logan').then(function(response) {
            expect(response.status).to.eql(200);
            expect(response.body.length).to.eql(1);
            expect(response.body[0].alias).to.eql('Wolverine');
            expect(response.body[0].team).to.eql(['x-men']);
            expect(response.body[0].active).to.eql(true);
        });
    });
});

describe('GET /characters/id', function () {

    const tonyStark = {
        name: "Anthony Stark",
        alias: "Iron Man",
        team: [
            "Avengers"
        ],
        active: true
    }
    
    context('quando tenho um personagem cadastrado', function () {

        before(function () {
            cy.postCharacter(tonyStark)
                .then(function(response) {
                    Cypress.env('characterId', response.body.character_id);
                });
        });

        it('deve buscar o personagem pelo ID', function () {
            const id = Cypress.env('characterId');
            cy.getCharacterById(id).then(function(response) {
                expect(response.status).to.eql(200);
                expect(response.body.alias).to.eql('Iron Man');
                expect(response.body.team).to.eql(['Avengers']);
                expect(response.body.active).to.eql(true);
            });
        });
    });

    it('deve retornar 404 ao buscar por id não cadastrado', function () {
        const id = '62e12f276fa498bee20a6582';
        cy.getCharacterById(id).then(function(response) {
            expect(response.status).to.eql(404);
        });
    });
});