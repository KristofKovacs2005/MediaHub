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
  let badToken: string = ""
  beforeEach(() => {
    
    cy.login("f3@email.com", "password123").then(
      response => {
        token = response.body.token
      }
    )
    
    cy.login("f1@email.com", "password123").then(
      response => {
        badToken = response.body.token
      }
    )
  })
  it("POST /items sikeres létrehozás", () => {
    cy.fixture("test.jpg", "base64").then((base64) => {
      const blob = Cypress.Blob.base64StringToBlob(base64, "image/jpg");
  
      const formData = new FormData();
      formData.append("i_name", "Teszt Könyv");
      formData.append("author", "Teszt író");
      formData.append("i_description", "Teszt leírás");
      formData.append("file", blob, "test.jpg");
      formData.append("tags", "1,2,3");
  
      cy.request({
        method: "POST",
        url: "http://localhost:3000/items",
        body: formData,
        headers: {
          "x-access-token": token,
        },
      }).then((response) => {
        expect(response.status).to.eq(201)
      })
    })
  })


  it("POST /items token nélkül sikertelen", () => {
    cy.fixture("test.jpg", "base64").then((base64) => {
      const blob = Cypress.Blob.base64StringToBlob(base64, "image/jpg");
  
      const formData = new FormData();
      formData.append("i_name", "Teszt Könyv");
      formData.append("author", "Teszt író");
      formData.append("i_description", "Teszt leírás");
      formData.append("file", blob, "test.jpg");
      formData.append("tags", "1,2,3");
  
      cy.request({
        method: "POST",
        url: "http://localhost:3000/items",
        body: formData,
        headers: {
          "x-access-token": "rossz token",
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

  it("POST /items nem megfelelő felhasználóval sikertelen", () => {
    cy.fixture("test.jpg", "base64").then((base64) => {
      const blob = Cypress.Blob.base64StringToBlob(base64, "image/jpg");
  
      const formData = new FormData();
      formData.append("i_name", "Teszt Könyv");
      formData.append("author", "Teszt író");
      formData.append("i_description", "Teszt leírás");
      formData.append("file", blob, "test.jpg");
      formData.append("tags", "1,2,3");
  
      cy.request({
        method: "POST",
        url: "http://localhost:3000/items",
        body: formData,
        headers: {
          "x-access-token": badToken,
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

  it("POST /items hiányos adatokkal", () => {
    cy.fixture("test.jpg", "base64").then((base64) => {
      const blob = Cypress.Blob.base64StringToBlob(base64, "image/jpg");
      const formData = new FormData();
      formData.append("i_name", "Teszt Könyv");
      formData.append("i_description", "Teszt leírás");
      formData.append("file", blob, "test.jpg");

  
      cy.request({
        method: "POST",
        url: "http://localhost:3000/items",
        body: formData,
        headers: {
          "x-access-token": token,
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })
  })

  it("POST /items kép nélkül", () => {
    

  
      cy.request({
        method: "POST",
        url: "http://localhost:3000/items",
        body: {
          i_name: "ads",
          i_description: "ads",
          author: "ads",
          tags: "1,2,3"
        },
        headers: {
          "x-access-token": token,
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })
  
  
})

describe("PATCH /items tesztek", () => {
  let token: string = ""
  let badToken: string = ""
  beforeEach(() => {
    
    cy.login("f3@email.com", "password123").then(
      response => {
        token = response.body.token
      }
    )
    
    cy.login("f1@email.com", "password123").then(
      response => {
        badToken = response.body.token
      }
    )
  })
  
  it("PATCH /items részleges módosítás", () => {
    cy.request({
      url: "http://localhost:3000/items/3",
      method: "PATCH",
      body: {
        i_name: "valami",
        i_description: "más"
      },
      headers: {
        "x-access-token": token
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })

  it("PATCH /items teljes módosítás", () => {
    cy.fixture("test.jpg", "base64").then((base64) => {
      const blob = Cypress.Blob.base64StringToBlob(base64, "image/jpg");
      const formData = new FormData();
      formData.append("i_name", "Teszt Könyv");
      formData.append("i_description", "Teszt leírás");
      formData.append("author", "Teszt leírás");
      formData.append("amount", "3");
      formData.append("file", blob, "test.jpg");
 
  
      cy.request({
        method: "PATCH",
        url: "http://localhost:3000/items/4",
        body: formData,
        headers: {
          "x-access-token": token,
        },
      }).then((response) => {
        expect(response.status).to.eq(201)
      })
    })
  
  })

  it("PATCH /items rossz tokennel", () => {
    cy.request({
      url: "http://localhost:3000/items/3",
      method: "PATCH",
      body: {
        i_name: "valami",
        i_description: "más"
      },
      headers: {
        "x-access-token": "token"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it("PATCH /items rossz felhasználóval", () => {
    cy.request({
      url: "http://localhost:3000/items/3",
      method: "PATCH",
      body: {
        i_name: "valami",
        i_description: "más"
      },
      headers: {
        "x-access-token": badToken
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  

})

describe("DELETE /items törlések", () => {
  let token: string = ""
  let badToken: string = ""
  beforeEach(() => {
    
    cy.login("f3@email.com", "password123").then(
      response => {
        token = response.body.token
      }
    )
    
    cy.login("f1@email.com", "password123").then(
      response => {
        badToken = response.body.token
      }
    )
  })

  it("DELETE /items/:id can delete successfully", () => {
    cy.request({
      url:`http://localhost:3000/items/5`,
      method: "DELETE",
      headers: {
        "x-access-token": token
      }
    }).then(response => {
      expect(response.status).to.eq(204)
    })
  })

  it("DELETE /items/:id wont work with bad token", () => {
    cy.request({
      url:`http://localhost:3000/items/5`,
      method: "DELETE",
      headers: {
        "x-access-token": "token"
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(401)
    })
  })

  it("DELETE /items/:id wont work with bad user", () => {
    cy.request({
      url:`http://localhost:3000/items/5`,
      method: "DELETE",
      headers: {
        "x-access-token": badToken
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(401)
    })
  })

  it("DELETE /items/:id wont work with missing id", () => {
    cy.request({
      url:`http://localhost:3000/items/-1`,
      method: "DELETE",
      headers: {
        "x-access-token": token
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(404)
    })
  })

  it("DELETE /items/:id wont work with bad id", () => {
    cy.request({
      url:`http://localhost:3000/items/asd`,
      method: "DELETE",
      headers: {
        "x-access-token": token
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(400)
    })
  })

  
  
})

