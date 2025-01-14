/// <reference types="cypress" />

describe("Login Test | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  it("Login Test - Passing", function () {
    cy.visit(`${this.base_url}login`);
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}dashboard/my_feed`);
    });
    cy.xpath('//*[(@id = "log-out")]').click({ force: true });
  });

  it("Login Test - Failing", () => {
    cy.get(".MuiButton-outlined > .MuiButton-label > a").click();
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type("123456789");
    cy.get(".loginButton").click();
    cy.get(".loginButton");
  });
});
