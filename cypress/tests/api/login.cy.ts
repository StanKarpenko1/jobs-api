import { faker } from "@faker-js/faker";


const generateRandomUser = () => {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
};

let accessToken: string

describe("Authentication - login - register", () => {
  
  const testUser = generateRandomUser()
  
  before(() => {
    cy.task("connectToDb");
  });
  
  context(`LOGIN - /auth/login endpoint tests`, () => {
    it("LOGIN - valid creds - success", () => {

      // SEED USER
      //@ts-ignore
      cy.seedUser(testUser).then((userId) => {
        cy.log(`User ID__: ${userId}`);
        cy.wrap(userId).as('userId')
      })
  
  
      // TEST BODY
      cy.request({
        method: "POST",
        url: "/auth/login",
        body: {
          name: testUser.name,
          email: testUser.email,
          password: testUser.password,
        },
      }).then((response) => {
  
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("user");
        expect(response.body.user).to.have.property("name", testUser.name);
        expect(response.body).to.have.property("token");
  
        accessToken = response.body.token;
        cy.wrap(accessToken, { log: false }).as('accessToken')
  
      });
  
  
      // AFTER TEST CLEAN-UP
      cy.get('@userId').then((userId: any) => {
        //@ts-ignore
        cy.deleteUser(userId);
        cy.task("findUserById", userId).then((user) => {
          expect(user).to.be.null; // User should not exist after deletion
        });
  
      })
    });
    it("LOGIN - valid creds, no name provided - success", () => {
      // SEED USER
      //@ts-ignore
      cy.seedUser(testUser).then((userId) => {
        cy.log(`Seeded User ID: ${userId}`);
        cy.wrap(userId).as("userId");
      });
    
      // TEST BODY WITHOUT NAME
      cy.request({
        method: "POST",
        url: "/auth/login",
        body: {
          email: testUser.email, // Correct email
          password: testUser.password, // Correct password
          // Name is not included in the request body
        },
      }).then((response) => {
        expect(response.status).to.eq(200); // Expect success
        expect(response.body).to.have.property("user");
        expect(response.body.user).to.have.property("name", testUser.name);
        expect(response.body).to.have.property("token");
    
        const accessToken = response.body.token;
        cy.wrap(accessToken, { log: false }).as("accessToken");
      });
    
      // AFTER TEST CLEAN-UP
      cy.get("@userId").then((userId: any) => {
        //@ts-ignore
        cy.deleteUser(userId);
        cy.task("findUserById", userId).then((user) => {
          expect(user).to.be.null; // User should not exist after deletion
        });
      });
    });
    it ("LOGIN - invalid creds, email and/or pass, - assert error", () => {
      const wrongEmail = 'wrongemail@example.com"'
      const wrongPass = 'WrongPassword123'
      // SEED USER
      //@ts-ignore
      cy.seedUser(testUser).then((userId) => {
        cy.log(`Seeded User ID: ${userId}`);
        cy.wrap(userId).as("userId");
      });
  
      // TEST WRONG EMAIL
      cy.request({
        method: "POST",
        url: "/auth/login",
        body: {
          email: wrongEmail, 
          password: testUser.password,
        },
        failOnStatusCode: false, // Allow handling 401 errors
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property("msg", "ERROR: CustomError: Invalid credentials...");
      });
  
      // TEST WRONG PASSWORD
      cy.request({
        method: "POST",
        url: "/auth/login",
        body: {
          email: testUser.email,
          password: wrongPass, 
        },
        failOnStatusCode: false, // Allow handling 401 errors
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property("msg", "ERROR: CustomError: Invalid credentials...");
      });

      cy.request({
        method: "POST",
        url: "/auth/login",
        body: {
          email: wrongEmail,
          password: wrongPass, 
        },
        failOnStatusCode: false, // Allow handling 401 errors
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property("msg", "ERROR: CustomError: Invalid credentials...");
      });
  
      // CLEAN UP
      cy.get("@userId").then((userId: any) => {
        //@ts-ignore
        cy.deleteUser(userId);
  
        cy.task("findUserById", userId).then((user) => {
          expect(user).to.be.null; // User should not exist after deletion
        });
      });
      
      
    });
    it("LOGIN - invalid creds, email or pass not provided - assert error", () => {
      // SEED USER
      //@ts-ignore
      cy.seedUser(testUser).then((userId) => {
        cy.log(`Seeded User ID: ${userId}`);
        cy.wrap(userId).as("userId");
      });
    
      // TEST MISSING EMAIL
      cy.request({
        method: "POST",
        url: "/auth/login",
        body: {
          password: testUser.password, // No email provided
        },
        failOnStatusCode: false, // Allow handling 400 errors
      }).then((response) => {
        expect(response.status).to.eq(400); // Bad Request
        expect(response.body).to.have.property("msg", "ERROR: CustomError: Provide Email and Password");
      });
    
      // TEST MISSING PASSWORD
      cy.request({
        method: "POST",
        url: "/auth/login",
        body: {
          email: testUser.email, // No password provided
        },
        failOnStatusCode: false, // Allow handling 400 errors
      }).then((response) => {
        expect(response.status).to.eq(400); // Bad Request
        expect(response.body).to.have.property("msg", "ERROR: CustomError: Provide Email and Password");
      });
    
      // CLEAN UP
      cy.get("@userId").then((userId: any) => {
        //@ts-ignore
        cy.deleteUser(userId);
    
        cy.task("findUserById", userId).then((user) => {
          expect(user).to.be.null; // User should not exist after deletion
        });
      });
    });
  })

  context(`REGISTER - /auth/register endpoint tests`, () => {
    it (`some test `, () => {
      
    })
  })

  
});
