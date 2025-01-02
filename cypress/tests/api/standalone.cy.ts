describe("Database Interaction Test", () => {
    before(() => {
      // Connect to the database before running the tests
      cy.task("connectToDb");
    });
  
    it("should find a user by email in the database", () => {
      const testEmail = "Tomasa72@hotmail.com"; 
  
      cy.task("findUserByEmail", testEmail).then((user) => {
        if (user) {
          expect(user).to.have.property("email", testEmail);
          cy.log("User found:", user);
        } else {
          cy.log("No user found with email:", testEmail);
        }
      });
    });
  });
  