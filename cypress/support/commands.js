Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('/');
        cy.get('#strUsuario').type(username);
        cy.get('#strPassword').type(password);
        cy.get('#bt-enviar').contains('Ingresar').click();
        cy.url().should('contain', 'rei/aprendizaje');
        },
        {
            validate() {
                cy.request('/login').its('status').should('eq', 200);
            },
        }
    )
});