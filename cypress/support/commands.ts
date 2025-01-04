/// <reference types="cypress" />

Cypress.Commands.add("seedUser", (userData) => {
    return cy.task("seedUser", userData).then(({ user, token } : any) => {
        expect(user).to.have.property("email", userData.email);
        expect(user).to.have.property("name", userData.name);
        expect(user).to.have.property("_id");

        cy.wrap(user).as("user");
        cy.wrap(token).as("token");

        return cy.wrap(user._id).as("userId").then(() => user._id);
    });
  });
  
  Cypress.Commands.add("deleteUser", (userId) => {
    return cy.task("deleteTestingUser", userId).then((result) => {
      expect(result).to.have.property("success", true);
      expect(result).to.have.property("userId", userId);

    });
  });

declare namespace Cypress {
	interface Chainable<Subject = any> {
        seedUser: (userData: any) => Chainable<any>
        deleteUser: (userId: string) => Chainable<any>
	}
}