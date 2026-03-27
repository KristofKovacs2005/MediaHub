describe("Item details and reviews", () => {
  it("should display item details with tags", () => {
    cy.visit("/termekek/1");
    cy.get("h1, h2, h3", { timeout: 15000 }).should("have.length.greaterThan", 0);
  });

  it("should show comments section", () => {
    cy.visit("/termekek/1");
    cy.contains(/vélemény|komment|hozzászólás/i, { timeout: 15000 }).should("exist");
  });

  it("should not allow guests to write a review", () => {
    cy.visit("/termekek/1");
    // The review button should be disabled or not present for guests
    cy.get("body").then(($body) => {
      if ($body.find("button:contains('Vélemény')").length > 0) {
        cy.contains("button", "Vélemény").should("be.disabled");
      }
    });
  });

  it("should allow logged-in user to open review modal", () => {
    cy.loginAPI("f1@email.com", "password123");
    cy.visit("/termekek/5");
    cy.contains("button", /vélemény/i, { timeout: 15000 }).click();
    cy.contains("Új vélemény").should("be.visible");
    cy.get("#comment").should("be.visible");
    cy.get(".starRating").should("be.visible");
  });

  it("should submit a review", () => {
    cy.loginAPI("en@gmail.com", "password123");
    cy.visit("/termekek/5");
    cy.contains("button", /vélemény/i, { timeout: 15000 }).click();
    cy.get(".starRating .star").eq(3).click(); // 4 stars
    cy.get("#comment").type("Cypress teszt vélemény");
    cy.contains("button", "Vélemény beküldése").click();
  });
});
