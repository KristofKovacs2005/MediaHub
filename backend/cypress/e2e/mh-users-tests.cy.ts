/// <reference types="cypress" />

describe('POST /users/login tesztek', () => {
  before(() => {
    cy.task("resetDb");
  })
  it('POST /users/login sikeresen bejelentkezteti a felhasználót', () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/users/login",
      body: {
        email: "f1@email.com",
        password: "password123"
      }
    }).then(res => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property("token")
    })
  })
  it('POST /users/login rossz adatokkal nem lehet bejelentkezni', () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/users/login",
      body: {
        email: "rossz",
        password: "password123"
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(401)
      expect(res.body.message).to.eq("email or password is incorrect")
  
    })
  })
  it('POST /users/login hiányos adatokkal nem lehet bejelentkezni', () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/users/login",
      body: {

        password: "password123"
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(400)
      expect(res.body.message).to.eq("Bad request")
  
    })
  })
})

describe("POST /users tesztek", () => {
  let libToken: string = ""
  before(() => {
    cy.task("resetDb");
    cy.login("f3@email.com", "password123").then( (response: any) => {
      libToken = response.body.token
    } )
  })
  it("POST /users létrehoz egy felhasználót", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/users",
      body: {
        username: "teszt",
        email: "teszt@email.com",
        password: "teszt123",
        status: 1
      }
    }).then(res => {
      expect(res.status).to.eq(201)
      cy.request({
        method: "GET",
        url: `http://localhost:3000/users/${res.body.id}`,
        headers: {
          "x-access-token": libToken
        }
      }).then(resp => {
        expect(resp.status).to.eq(200)
        expect(resp.body[0]).to.have.property("username", "teszt")
      })
    })
  })
  it("POST /users hiányos adatokkal", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/users",
      body: {
        username: "asd"
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(400)
    })
  })

  it("POST /users duplikált adatokkal", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/users",
      body: {
        username: "teszt",
        email: "teszt@email.com",
        password: "teszt123",
        status: 1
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(409)
    })
  })

 
})

describe("GET /users tesztek", () => {
  let libToken: string = ""
  let modToken: string = ""
  let userToken: string = ""
  before(() => {
    cy.task("resetDb");
    cy.login("f3@email.com", "password123").then( (response: any) => {
      libToken = response.body.token
    } )
    cy.login("f4@email.com", "password123").then( (response: any) => {
      modToken = response.body.token
    } )
    cy.login("f1@email.com", "password123").then( (response: any) => {
      userToken = response.body.token
    } )
  })
  it("GET /users can see all the users", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/users",
      headers: {
        "x-access-token": modToken
      }
    }).then(res => {
      expect(res.status).to.eq(200)
      expect(res.body[0]).to.have.property("username")
    })
  })
  it("GET /users/:id can see the users", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/users/1",
      headers: {
        "x-access-token": modToken
      }
    }).then(res => {
      expect(res.status).to.eq(200)
      expect(res.body[0]).to.have.property("username")
    })
  })

  it("GET /users bad token", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/users",
      headers: {
        "x-access-token": "modToken"
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(401)

    })
  })
  it("GET /users bad user", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/users",
      headers: {
        "x-access-token": userToken
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(401)

    })
  })

  it("GET /users/:id bad token", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/users/1",
      headers: {
        "x-access-token": "modToken"
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(401)

    })
  })
  it("GET /users/:id bad user", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/users/1",
      headers: {
        "x-access-token": userToken
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(401)

    })
  })

  it("GET /users/:id non existant id", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/users/-1",
      headers: {
        "x-access-token": modToken
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(404)

    })
  })

  it("GET /users/:id non bad id", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/users/asd",
      headers: {
        "x-access-token": modToken
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(400)

    })
  })
})


describe("PATCH /users tesztek", () => {
  let modToken: string = ""
  let userToken: string = ""
  before(() => {
    cy.task("resetDb");
    cy.login("f4@email.com", "password123").then( (response: any) => {
      modToken = response.body.token
    } )
    cy.login("f1@email.com", "password123").then( (response: any) => {
      userToken = response.body.token
    } )
  })
  it("PATCH /users sikeres módosítás", () => {
    cy.request({
      method: "PATCH",
      url: "http://localhost:3000/users/1",
      headers: {
        "x-access-token": modToken
      },
      body: {
        status: 3
      }
    }).then(res => {
      expect(res.status).to.eq(201)
      cy.request({
        method: "GET",
        url: `http://localhost:3000/users/1`,
        headers: {
          "x-access-token": modToken
        }
      }).then(resp => {
        expect(resp.status).to.eq(200)
        expect(resp.body[0]).to.have.property("status", 3)
      })
    })
  })
  it("PATCH /users üres body", () => {
    cy.request({
      method: "PATCH",
      url: "http://localhost:3000/users/1",
      headers: {
        "x-access-token": modToken
      },
      body: {

      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(400)
    })
  })

  it("PATCH /users rossz id", () => {
    cy.request({
      method: "PATCH",
      url: "http://localhost:3000/users/asd",
      headers: {
        "x-access-token": modToken
      },
      body: {

      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(400)
    })
  })

  it("PATCH /users nem létező id", () => {
    cy.request({
      method: "PATCH",
      url: "http://localhost:3000/users/-1",
      headers: {
        "x-access-token": modToken
      },
      body: {
        username:"asd"
      },
      failOnStatusCode: false
    }).then(res => {
      expect(res.status).to.eq(404)
    })
  })
})