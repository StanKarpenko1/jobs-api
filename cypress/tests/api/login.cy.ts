import { User } from "../../../src/models/User";
import { faker } from "@faker-js/faker";



const generateRandomUser = () => {
    return {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
};

    let accessToken: string

describe("Login Tests", () => {

    
    const testUser = generateRandomUser()
  
    before(() => {
        cy.task("connectToDb");
      });
  
    
  
    it("should successfully log in with valid credentials", () => {
        
        // seeding user
        cy.seedUser(testUser).then((userId) => {
            cy.log(`User ID__: ${userId}`);
            cy.wrap(userId).as('userId')
        })
        
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

            cy.wrap(accessToken).as('accessToken')

          });

            cy.get('@userId').then((userId: any) => {
                cy.deleteUser(userId)
            })
    });
  });
  