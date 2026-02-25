/// <reference types="cypress" />

describe('GET review testek', () => {
  it('GET /reviews tesztek', () => {
    cy.request("http://localhost:3000/reviews").then(res=>{
      expect(res.status).to.eq(200)
      expect(res.body).to.be.an("array")
      expect(res.body[0]).to.have.property("r_id")
    })
  })
})

describe("GET /review/flagged tesztek", () => {
  let userToken: string = ""
  let modToken: string = ""
  beforeEach(() => {
    cy.login("f1@email.com", "password123").then( (response: any) => {
      userToken = response.body.token
    } )
    cy.login("f4@email.com", "password123").then( (response: any) => {
      modToken = response.body.token
    } )
  })

  it("GET /reviews flagged kiadja a megfelelő reviewokat", () => {
    cy.request({
      method: "GET", 
      url: "http://localhost:3000/reviews/flagged",
      headers: {
        "x-access-token": modToken
      }
    }).then(res => {
      expect(res.status).to.eq(200)
      expect(res.body).to.be.an("array")
      expect(res.body[0]).to.have.property("flagged", 1)
    })
  })

  it("GET /reviews flagged rossz tokennel", () => {
    cy.request({
      method: "GET", 
      url: "http://localhost:3000/reviews/flagged",
      headers: {
        "x-access-token": "modToken"
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(401)
    
    })
  })

  it("GET /reviews flagged rossz user", () => {
    cy.request({
      method: "GET", 
      url: "http://localhost:3000/reviews/flagged",
      headers: {
        "x-access-token": userToken
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(401)
    
    })
  })
})

describe("DELETE /review/:id tesztek", () => {
  let userToken: string = ""
  let modToken: string = ""
  beforeEach(() => {
    cy.login("f1@email.com", "password123").then( (response: any) => {
      userToken = response.body.token
    } )
    cy.login("f4@email.com", "password123").then( (response: any) => {
      modToken = response.body.token
    } )
  })

  it("DELETE /review töröl", () => {
    cy.request({
      method: "DELETE", 
      url: "http://localhost:3000/reviews/1",
      headers: {
        "x-access-token": modToken
      }
    }).then(res => {
      expect(res.status).to.eq(204)
    })
  })

  it("DELETE /review rossz token", () => {
    cy.request({
      method: "DELETE", 
      url: "http://localhost:3000/reviews/1",
      headers: {
        "x-access-token": "modToken"
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(401)
    })
  })

  it("DELETE /review rossz user", () => {
    cy.request({
      method: "DELETE", 
      url: "http://localhost:3000/reviews/1",
      headers: {
        "x-access-token": userToken
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(401)
    })
  })

  it("DELETE /review nem létező id", () => {
    cy.request({
      method: "DELETE", 
      url: "http://localhost:3000/reviews/-1",
      headers: {
        "x-access-token": modToken
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(404)
    })
  })

  it("DELETE /review rossz típusú id", () => {
    cy.request({
      method: "DELETE", 
      url: "http://localhost:3000/reviews/asd",
      headers: {
        "x-access-token": modToken
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(400)
    })
  })

})

describe("POST /reviews tesztek", () => {

  let modToken: string = ""
  beforeEach(() => {

    cy.login("f4@email.com", "password123").then( (response: any) => {
      modToken = response.body.token
    } )
  })

 it("POST /reviews sikeres komment nélkül", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/reviews",
    headers: {
      "x-access-token": modToken
    },
    body: {
      i_id: 1,
      stars: 5
    }
  }).then(res => {
    expect(res.status).to.eq(201)
    const createdId = res.body.id

    cy.request("http://localhost:3000/reviews")
      .its("body")
      .should((reviews: any[]) => {
        const review = reviews.find(r => r.r_id === createdId)
        expect(review.stars).to.eq(5)
        expect(review.i_id).to.eq(1)
        expect(review.comment).to.eq(null)
      })
  })
})

it("POST /reviews sikeres kommenttel", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/reviews",
    headers: {
      "x-access-token": modToken
    },
    body: {
      i_id: 1,
      stars: 4,
      comment: "valami"
    }
  }).then(res => {
    expect(res.status).to.eq(201)
    const createdId = res.body.id

    cy.request("http://localhost:3000/reviews")
      .its("body")
      .should((reviews: any[]) => {
        const review = reviews.find(r => r.r_id === createdId)
        expect(review.stars).to.eq(4)
        expect(review.i_id).to.eq(1)
        expect(review.comment).to.eq("valami")
      })
  })
})

it("POST /reviews sikertelen rossz stars", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/reviews",
    headers: {
      "x-access-token": modToken
    },
    body: {
      i_id: 1,
      stars: 6,
      comment: "valami"
    },
    failOnStatusCode: false
  }).then(res => {
    expect(res.status).to.eq(400)
   
  })
})

it("POST /reviews sikertelen body nélkül", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/reviews",
    headers: {
      "x-access-token": modToken
    },
    
    failOnStatusCode: false
  }).then(res => {
    expect(res.status).to.eq(400)


   
  })
})
it("POST /reviews sikertelen rossz token ", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/reviews",
    headers: {
      "x-access-token": "modToken"
    },
    body: {
      i_id: 1,
      stars: 4,
      comment: "valami"
    },
    
    failOnStatusCode: false
  }).then(res => {
    expect(res.status).to.eq(401)


   
  })
})





})

describe("PATCH /reviews tesztek", () => {
  
  let modToken: string = ""
  beforeEach(() => {

    cy.login("f4@email.com", "password123").then( (response: any) => {
      modToken = response.body.token
    } )
  })

  it("PATCH /reviews sikeres", () => {
    cy.request({
      method: "PATCH",
      url: "http://localhost:3000/reviews/2",
      headers: {
        "x-access-token": modToken
      },
      body: {
        flagged: 1,
        reason: "valami"
      }
    }).then(r => {
      expect(r.status).to.eq(201)
      cy.request("http://localhost:3000/reviews")
      .its("body")
      .should((reviews: any[]) => {
        const review = reviews.find(r => r.r_id == 2)

        expect(review.flagged).to.eq(1)
        expect(review.reason).to.eq("valami")
      })
    })
  })

  it("PATCH /reviews üres body", () => {
    cy.request({
      method: "PATCH",
      url: "http://localhost:3000/reviews/2",
      headers: {
        "x-access-token": modToken
      },
      failOnStatusCode: false
    }).then(r => {
      expect(r.status).to.eq(400)
      
    })
  })

   it("PATCH /reviews rossz stars", () => {
    cy.request({
      method: "PATCH",
      url: "http://localhost:3000/reviews/2",
      headers: {
        "x-access-token": modToken
      },
      body: {
        stars: 6
      },
      failOnStatusCode: false
    }).then(r => {
      expect(r.status).to.eq(400)
      
    })
  })

   it("PATCH /reviews rossz token", () => {
    cy.request({
      method: "PATCH",
      url: "http://localhost:3000/reviews/2",
      headers: {
        "x-access-token": "modToken"
      },
      body: {
        stars: 6
      },
      failOnStatusCode: false
    }).then(r => {
      expect(r.status).to.eq(401)
      
    })
  })
})