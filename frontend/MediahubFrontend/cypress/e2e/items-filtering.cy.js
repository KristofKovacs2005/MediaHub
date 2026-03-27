describe("Items page filtering and search", () => {
  beforeEach(() => {
    cy.visit("/termekek");
    // Wait for items to load
    cy.get(".termekDiv", { timeout: 15000 }).should(
      "have.length.greaterThan",
      0
    );
  });

  it("should display a search input", () => {
    cy.get('input[type="text"], input[placeholder*="Keresés"], input[placeholder*="keresés"]').should("exist");
  });

  it("should filter items by search text", () => {
    cy.get('input[type="text"], input[placeholder*="Keresés"], input[placeholder*="keresés"]')
      .first()
      .type("test");
    cy.get('button[type="submit"], form').first().submit();
    // Page should still have the search term in the input
    cy.get('input[type="text"]').first().should("have.value", "test");
  });

  it("should have a sort dropdown", () => {
    cy.get("select").should("exist");
  });

  it("should change sort order", () => {
    cy.get("select").first().select(1); // select second option (Z-A)
  });
});
