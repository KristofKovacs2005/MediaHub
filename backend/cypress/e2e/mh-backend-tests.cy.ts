/// <reference types="cypress" />

describe('GET /items tesztek', () => {
  it('GET /items lekéri az összes elemeket és 200-val tér vissza', () => {
    cy.request("http://localhost:3000/items").then( (response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an("array")
      expect(response.body[0]).to.have.property("i_id")
    } )
  })

  it('GET /items tud helyesen névre keresni', () => {
    cy.request("http://localhost:3000/items?name=iljics").then( (response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an("array")
      expect(response.body[0]).to.have.property("i_name").that.includes("Iljics")
    } )
  })

  it('GET /items tud helyesen taggel keresni', () => {
    cy.request("http://localhost:3000/items?tags=book").then( (response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an("array")
      expect(response.body[0]).to.have.property("tagek").that.includes("book")
    } )
  })

  it('GET /items tud helyesen iróra keresni', () => {
    cy.request("http://localhost:3000/items?author=lev").then( (response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an("array")
      expect(response.body[0]).to.have.property("author").that.includes("Lev")
    } )
  })

  it('GET /items tud helyesen mindenre keresni', () => {
    cy.request("http://localhost:3000/items?name=ivan&tags=book&author=lev").then( (response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an("array")
      expect(response.body[0]).to.have.property("i_name").that.includes("Iljics")
      expect(response.body[0]).to.have.property("tagek").that.includes("book")
      expect(response.body[0]).to.have.property("author").that.includes("Lev")
    } )
  })

  it('GET /items helyesen kezeli, ha nincs találat', () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/items?name=nincsilyenelem",
      headers: {"Content-Type": "application/json"},
      failOnStatusCode: false
    }).then( (response) => {
      expect(response.status).to.eq(404)
    } )
  })
})

describe('GET /item tesztek', () => {
  

  it('GET /item tud lekérni egy specifikus elemet', () => {
    cy.request("http://localhost:3000/item/1").then( (response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an("array")
      expect(response.body[0]).to.have.property("i_id", 1)
    })
  })

  it('GET /item helyesen kezeli, ha nem létezik az elem', () => {
    cy.request({url:"http://localhost:3000/item/-1", failOnStatusCode: false}).then( (response) => {
      expect(response.status).to.eq(404)
    })
  })

  it('GET /item helyesen kezeli, ha rossz típusú az id', () => {
    cy.request({url:"http://localhost:3000/item/asd", failOnStatusCode: false}).then( (response) => {
      expect(response.status).to.eq(400)
    })
  })
})

describe('GET /item/:id/reviews tesztek', () => {
  it('GET /item/:id/reviews helyesen kéri le a review-okat', () => {
    cy.request({
      url:"http://localhost:3000/item/1/reviews"
    }).then( (response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an("array")
      expect(response.body[0]).to.have.property("r_id")
    })
  })

  it('GET /item/:id/reviews helyesen kezeli, ha nem létezik az elem', () => {
    cy.request({
      url:"http://localhost:3000/item/-1/reviews",
      failOnStatusCode: false
    }).then( (response) => {
      expect(response.status).to.eq(404)
    })
  })

  it('GET /item/:id/reviews helyesen kezeli, ha rossz típusú az id', () => {
    cy.request({
      url:"http://localhost:3000/item/asd/reviews",
      failOnStatusCode: false
    }).then( (response) => {
      expect(response.status).to.eq(400)
    })
  })
})

describe('GET /items/:id/tags tesztek', () => {

  it('GET /item/:id/tags helyesen kéri le a tageket', () => {
    cy.request({
      url:"http://localhost:3000/item/1/tags"
    }).then( (response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an("array")
      expect(response.body[0]).to.have.property("t_id")
    })
  })

  it('GET /item/:id/tags helyesen kezeli, ha nem létezik az elem', () => {
    cy.request({
      url:"http://localhost:3000/item/-1/tags",
      failOnStatusCode: false
    }).then( (response) => {
      expect(response.status).to.eq(404)
    })
  })

  it('GET /item/:id/tags helyesen kezeli, ha rossz típusú az id', () => {
    cy.request({
      url:"http://localhost:3000/item/asd/tags",
      failOnStatusCode: false
    }).then( (response) => {
      expect(response.status).to.eq(400)
    })
  })
})

describe('POST /items tesztek', () => {
  let token: string = ""
  beforeEach(() => {
    cy.request({
      url:"http://localhost:3000/users/login",
      method: "POST",
      body: {
        email: "f3@email.com",
        password: "password123"
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      token = response.body.token;
    })
  })
  it("POST /items sikeres létrehozás", () => {
    cy.request({
      url: "http://localhost:3000/items",
      method: "POST",
      body: {
        i_name: "Teszt Könyv",
        author: "Teszt író",
        i_description: "Teszt leírás"
      },
      headers: {
        "x-access-token": token
      }
    }).then( (response) => {
      expect(response.status).to.eq(201)
    })
  })
  
})