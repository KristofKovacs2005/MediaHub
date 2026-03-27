describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open the login modal", () => {
    cy.contains("Bejelentkezés").first().click();
    cy.get("#logInUser").should("be.visible");
    cy.get("#logInPassword").should("be.visible");
  });

  it("should login as a regular user", () => {
    cy.login("f1@email.com", "password123");
    cy.contains("vki", { timeout: 10000 }).should("be.visible");
  });

  it("should persist login in localStorage", () => {
    cy.login("f1@email.com", "password123");
    cy.contains("vki", { timeout: 10000 }).should("be.visible").then(() => {
      expect(localStorage.getItem("authToken")).to.not.be.null;
      expect(localStorage.getItem("username")).to.eq("vki");
      expect(localStorage.getItem("status")).to.eq("1");
    });
  });

  it("should logout successfully", () => {
    cy.loginAPI("f1@email.com", "password123");
    cy.visit("/");
    cy.contains("vki", { timeout: 10000 }).should("be.visible");
    cy.contains("Kilépés").click({ force: true });
    cy.contains("Bejelentkezés", { timeout: 10000 }).should("be.visible");
  });

  it("should open the registration modal", () => {
    cy.contains("Regisztráció").first().click();
    cy.get("#username").should("be.visible");
    cy.get("#email").should("be.visible");
    cy.get("#password").should("be.visible");
    cy.get("#confirmPassword").should("be.visible");
  });

  it("should login as librarian and see management links", () => {
    cy.login("f3@email.com", "password123");
    cy.contains("konyv", { timeout: 10000 }).should("be.visible");
    cy.contains("Termékek kezelése").should("be.visible");
    cy.contains("Kölcsönzések").should("be.visible");
  });

  it("should login as admin and see admin links", () => {
    cy.login("f4@email.com", "password123");
    cy.contains("mod", { timeout: 10000 }).should("be.visible");
    cy.contains("Felhasználók").should("be.visible");
    cy.contains("Bejelentések").should("be.visible");
  });
});
