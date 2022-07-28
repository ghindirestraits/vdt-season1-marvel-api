

describe('DELETE /characters/id', function () {

    const johnnyStorm = {
        name: "Jonathan Storm",
        alias: "Human Torch",
        team: [
            "Fantastic Four"
        ],
        active: true
    }
    
    context('quando tenho um personagem cadastrado', function () {

        before(function () {
            cy.postCharacter(johnnyStorm).then(function(response) {
                Cypress.env('characterId', response.body.character_id);
            });
        });

        it('deve remover o personagem pelo ID', function () {
            const id = Cypress.env('characterId');
            cy.deleteCharacterById(id).then(function(response) {
                expect(response.status).to.eql(204);
            });
        });

        after(function () {
            const id = Cypress.env('characterId');
            cy.getCharacterById(id).then(function(response) {
                expect(response.status).to.eql(404);
            });
        });
    });

    it('deve retornar 404 ao remover por id não cadastrado', function () {
        const id = '62e12f276fa498bee20a6582';
        cy.deleteCharacterById(id).then(function(response) {
            expect(response.status).to.eql(404);
        });
    });
});