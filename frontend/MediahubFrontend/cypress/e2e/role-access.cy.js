describe("Role-based access control", () => {
  it("should redirect guest from librarian page to home", () => {
    cy.visit("/termek_details");
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("should redirect guest from admin users page to home", () => {
    cy.visit("/felhasznalok");
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("should redirect regular user from librarian page", () => {
    cy.loginAPI("f1@email.com", "password123");
    cy.visit("/termek_details");
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("should allow librarian to access item management", () => {
    cy.loginAPI("f3@email.com", "password123");
    cy.visit("/termek_details");
    cy.url().should("include", "/termek_details");
  });

  it("should allow librarian to access orders page", () => {
    cy.loginAPI("f3@email.com", "password123");
    cy.visit("/kolcsonzesek");
    cy.url().should("include", "/kolcsonzesek");
  });

  it("should redirect librarian from admin users page", () => {
    cy.loginAPI("f3@email.com", "password123");
    cy.visit("/felhasznalok");
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("should allow admin to access users page", () => {
    cy.loginAPI("f4@email.com", "password123");
    cy.visit("/felhasznalok");
    cy.url().should("include", "/felhasznalok");
  });

  it("should allow admin to access flagged comments page", () => {
    cy.loginAPI("f4@email.com", "password123");
    cy.visit("/bejelentesek");
    cy.url().should("include", "/bejelentesek");
  });
});
