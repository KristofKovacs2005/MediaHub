/// <reference types="cypress" />

describe('GET /tags működik', () => {
  before(() => {
    cy.task("resetDb");
  })
  it('GET /tags lekéri a tageket', () => {
    cy.request("http://localhost:3000/tags").then(res => {
      expect(res.status).to.eq(200)
      expect(res.body[0]).to.have.property("t_id")
      expect(res.body[0]).to.have.property("t_name")
    })
  })
})