describe("Guest browsing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the guest homepage with MediaHub branding", () => {
    cy.contains("MediaHub").should("be.visible");
  });

  it("should show login and registration buttons in navbar", () => {
    cy.contains("Bejelentkezés").should("be.visible");
    cy.contains("Regisztráció").should("be.visible");
  });

  it("should navigate to the items page", () => {
    cy.visit("/termekek");
    cy.url().should("include", "/termekek");
  });

  it("should display items on the items page", () => {
    cy.visit("/termekek");
    cy.get(".termekDiv", { timeout: 15000 }).should(
      "have.length.greaterThan",
      0
    );
  });

  it("should navigate to an item detail page", () => {
    cy.visit("/termekek");
    cy.get(".termekDiv", { timeout: 15000 })
      .first()
      .click();
    cy.url().should("match", /\/termekek\/\d+/);
  });

  it("should show item details on the detail page", () => {
    cy.visit("/termekek/1");
    cy.get("h1, h2, h3", { timeout: 15000 }).should("have.length.greaterThan", 0);
  });
});
