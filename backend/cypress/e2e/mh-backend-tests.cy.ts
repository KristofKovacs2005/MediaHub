/// <reference types="cypress" />

describe('item tesztek', () => {
  it('GET /items lekéri az összes elemeket és 200-val tér vissza', () => {
    cy.request("http://localhost:3000/items").then( (response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an("array")
      expect(response.body[0]).to.have.property("i_id")
    } )
  })
})