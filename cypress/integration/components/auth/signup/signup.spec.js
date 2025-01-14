/// <reference types="cypress" />

describe("SignUp Page | CodeLabz", () => {
  beforeEach(function () {
    cy.fixture("login").then(function (credentials) {
      this.credentials = credentials;
    });
    cy.fixture("base_url").then(function (data) {
      this.base_url = data.base_url;
      cy.visit(this.base_url);
    });
  });

  it("Login With Your Account", function () {
    cy.visit(`${this.base_url}login`);
    cy.wait(3000);
    if (cy.location() !== `${this.base_url}login`) {
      cy.xpath('//*[(@id = "log-out")]').click({ force: true });
    }
  });

  it("Check if SignUp card exist", function () {
    cy.visit(`${this.base_url}signup`);
    cy.get("[data-testid=signUp]").should("exist");
    cy.get("[data-testId=signUpHaveAccount").should("exist");
    cy.get("[data-testId=smButtons").should("exist");
  });

  it("Check empty email validation", function () {
    cy.visit(`${this.base_url}signup`);
    cy.get("[data-testId=signUpButton").click();
    cy.contains("Please Enter your Email!");
    cy.contains(
      "You have to agree to our terms and conditions in order to register"
    );
  });
  it("check there is atleast 1 way to signup other than email and password", function () {
    cy.visit(`${this.base_url}signup`);
    cy.wait(2000);
    cy.get("[data-testId=smButtons").should("have.length.at.least", 1);
  });
  it("check password and confirm password match", function () {
    cy.visit(`${this.base_url}signup`);
    cy.get("[data-testId=signUpEmail").type(this.credentials.email);
    cy.get("[data-testId=signUpPassword").type(this.credentials.password);
    cy.get("[data-testId=signUpConfirmPassword").type("1324");
    cy.get("[data-testId=signUpButton").click();
    cy.contains("The two passwords that you entered does not match!");
  });
});
