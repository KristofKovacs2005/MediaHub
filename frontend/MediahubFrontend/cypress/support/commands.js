// ***********************************************
// Cypress custom commands for MediaHub frontend
// ***********************************************

// Login via the UI modal
Cypress.Commands.add("login", (email, password) => {
  cy.contains("Bejelentkezés").first().click();
  cy.get("#logInUser").type(email);
  cy.get("#logInPassword").type(password);
  cy.get('.modalForm button[type="submit"]').click();
});

// Login via API (faster, for tests that need auth but don't test the login flow)
Cypress.Commands.add("loginAPI", (email, password) => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/users/login",
    body: { email, password },
  }).then((res) => {
    const { token, username, status, expiration } = res.body;
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("status", status);
    localStorage.setItem(
      "expiration",
      expiration || new Date(Date.now() + 3600000).toISOString()
    );
  });
});

// Logout by clearing localStorage
Cypress.Commands.add("logout", () => {
  localStorage.clear();
  cy.visit("/");
});
