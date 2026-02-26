/// <reference types="cypress" />

describe("GET /orders tesztek", () => {
  let userToken: string = ""
  let libToken: string = ""
  before(() => {
    cy.task("resetDb");
  })
  beforeEach(() => {



    cy.login("f1@email.com", "password123").then( (response: any) => {
      userToken = response.body.token
    } )
    cy.login("f3@email.com", "password123").then( (response: any) => {
      libToken = response.body.token
    } )
  })

  it("GET /orders sikeresen lekéri a rendeléseket", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/orders", 
      headers: {
        "x-access-token": libToken
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body[0]).to.have.property("o_id")
    })
  })

  it("GET /orders csak megfelelő felhasználóval", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/orders", 
      headers: {
        "x-access-token": userToken
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

   it("GET /orders rossz token", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/orders", 
      headers: {
        "x-access-token": "userToken"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

})

describe("GET /order tesztek", () => {
  let userToken: string = ""
  let libToken: string = ""
  before(() => {
    cy.task("resetDb");
  })
  beforeEach(() => {



    cy.login("f1@email.com", "password123").then( (response: any) => {
      userToken = response.body.token
    } )
    cy.login("f3@email.com", "password123").then( (response: any) => {
      libToken = response.body.token
    } )
  })

  it("GET /order sikeresen lekéri a rendeléseket", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/order", 
      headers: {
        "x-access-token": userToken
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body[0]).to.have.property("o_id")
    })
  })

  it("GET /order csak megfelelő felhasználóval", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/order", 
      headers: {
        "x-access-token": libToken
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

   it("GET /order rossz token", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/order", 
      headers: {
        "x-access-token": "userToken"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

})

describe("get /orders/active tesztek", () => {
  let userToken: string = ""
  let libToken: string = ""
  let otherUserToken: string = ""
  before(() => {
    cy.task("resetDb");
  })
  beforeEach(() => {



    cy.login("f1@email.com", "password123").then( (response: any) => {
      userToken = response.body.token
    } )
    cy.login("f3@email.com", "password123").then( (response: any) => {
      libToken = response.body.token
    } )
    cy.login("f2@email.com", "password123").then( (response: any) => {
      otherUserToken = response.body.token
    } )
  })

  it("GET /orders/active successfully gets all active orders", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/orders/active", 
      headers: {
        "x-access-token": userToken
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body[0]).to.have.property("os_name")
      expect(response.body[0].os_name).to.be.oneOf(['awaiting acceptance', 'accepted', 'late'])
    })
  })

  it("GET /orders/active nem talál aktív rendelésekete", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/orders/active", 
      headers: {
        "x-access-token": otherUserToken
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  it("GET /orders/active rossz token", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/orders/active", 
      headers: {
        "x-access-token": "otherUserToken"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it("GET /orders/active rossz felhasználó", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/orders/active", 
      headers: {
        "x-access-token": libToken
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })
  
})


describe("POST /orders tesztek", () => {
  let userToken: string = ""
  let libToken: string = ""
  before(() => {
    cy.task("resetDb");
  })
  beforeEach(() => {



    cy.login("f1@email.com", "password123").then( (response: any) => {
      userToken = response.body.token
    } )
    cy.login("f3@email.com", "password123").then( (response: any) => {
      libToken = response.body.token
    } )
  })

  it("POST /orders sikeresen hozzáad új elemet", () => {
    let num = 0
    cy.request(`http://localhost:3000/item/${6}`).then(respo => {
        num = respo.body[0].amount
      })
    cy.request({
      method: "POST",
      url: "http://localhost:3000/orders", 
      headers: {
        "x-access-token": userToken
      },
      body: {
        p_id: 6,
        date: new Date().toISOString().split("T")[0],
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]
      }
    }).then((response => {
      expect(response.status).to.eq(201)
      return response.body.id
    })).then(res => {
      cy.request(`http://localhost:3000/item/${6}`).then(resp => {
        expect(num - 1).to.eq(resp.body[0].amount)
      })
    })
  })

  it("POST /orders foglalt elem", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/orders", 
      headers: {
        "x-access-token": userToken
      },
      body: {
        p_id: 9,
        date: new Date().toISOString().split("T")[0],
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]
      },
      failOnStatusCode: false
    }).then((response => {
      expect(response.status).to.eq(400)

    }))
  })

  it("POST /orders hiányos", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/orders", 
      headers: {
        "x-access-token": userToken
      },
      body: {

        date: new Date().toISOString().split("T")[0],

      },
      failOnStatusCode: false
    }).then((response => {
      expect(response.status).to.eq(400)

    }))
  })

  it("POST /orders rossz dátum", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/orders", 
      headers: {
        "x-access-token": userToken
      },
      body: {
        p_id: 6,
        date: new Date().toISOString().split("T")[0],
        return_date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split("T")[0]

      },
      failOnStatusCode: false
    }).then((response => {
      expect(response.status).to.eq(400)

    }))
  })

  it("POST /orders nem létező termék", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/orders", 
      headers: {
        "x-access-token": userToken
      },
      body: {
        p_id: -1,
        date: new Date().toISOString().split("T")[0],
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]

      },
      failOnStatusCode: false
    }).then((response => {
      expect(response.status).to.eq(400)

    }))
  })

  it("POST /orders rossz user", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/orders", 
      headers: {
        "x-access-token": libToken
      },
      body: {
        p_id: 6,
        date: new Date().toISOString().split("T")[0],
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]

      },
      failOnStatusCode: false
    }).then((response => {
      expect(response.status).to.eq(401)

    }))
  })

  it("POST /orders rossz token", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/orders", 
      headers: {
        "x-access-token": "libToken"
      },
      body: {
        p_id: 6,
        date: new Date().toISOString().split("T")[0],
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0]

      },
      failOnStatusCode: false
    }).then((response => {
      expect(response.status).to.eq(401)

    }))
  })

})


describe("PATCH /orders tesztek", () => {
  let userToken: string = ""
  let libToken: string = ""
  before(() => {
    cy.task("resetDb");
  })
  beforeEach(() => {

   

    cy.login("f1@email.com", "password123").then( (response: any) => {
      userToken = response.body.token
    } )
    cy.login("f3@email.com", "password123").then( (response: any) => {
      libToken = response.body.token
    } )
  })

  it("PATCH /orders sikeres és item is frissül", () => {
    let num = 0
    cy.request(`http://localhost:3000/item/${3}`).then(respo => {
        num = respo.body[0].amount
      })
    cy.request({
    method: "PATCH",
    url: "http://localhost:3000/orders/1",
    headers: {
      "x-access-token": libToken
    },
    body: {
      s_id: 4
    }
  }).then((response) => {
    expect(response.status).to.eq(201)
  }).then(res => {
    cy.request("http://localhost:3000/item/3").then(r => {
      expect(r.body[0].amount).to.eq(num + 1)
    })
  })
  })


  it("PATCH /orders nem frissűl az item, ha nem kell", () => {
    let num = 0
    cy.request(`http://localhost:3000/item/${3}`).then(respo => {
        num = respo.body[0].amount
      })
    cy.request({
    method: "PATCH",
    url: "http://localhost:3000/orders/1",
    headers: {
      "x-access-token": libToken
    },
    body: {
      s_id: 6
    }
  }).then((response) => {
    expect(response.status).to.eq(201)
  }).then(res => {
    cy.request("http://localhost:3000/item/3").then(r => {
      expect(r.body[0].amount).to.eq(num)
    })
  })
  })

  it("PATCH /orders rossz token", () => {

    cy.request({
    method: "PATCH",
    url: "http://localhost:3000/orders/1",
    headers: {
      "x-access-token": "libToken"
    },
    body: {
      s_id: 6
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(401)
  })
  })

   it("PATCH /orders rossz user", () => {

    cy.request({
    method: "PATCH",
    url: "http://localhost:3000/orders/1",
    headers: {
      "x-access-token": userToken
    },
    body: {
      s_id: 6
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(401)
  })
  })

  it("PATCH /orders rossz id", () => {

    cy.request({
    method: "PATCH",
    url: "http://localhost:3000/orders/asd",
    headers: {
      "x-access-token": userToken
    },
    body: {
      s_id: 6
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(400)
  })
  })


  it("PATCH /orders nem létező id", () => {

    cy.request({
    method: "PATCH",
    url: "http://localhost:3000/orders/-1",
    headers: {
      "x-access-token": libToken
    },
    body: {
      s_id: 6
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(404)
  })
  })

    it("PATCH /orders nincs mit frissíteni", () => {

    cy.request({
    method: "PATCH",
    url: "http://localhost:3000/orders/-1",
    headers: {
      "x-access-token": libToken
    },
    body: {
    
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(400)
  })
  })
 
 

})