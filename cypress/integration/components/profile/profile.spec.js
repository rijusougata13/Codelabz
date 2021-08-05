/// <reference types="cypress" />

describe("Profile Page | CodeLabz", () => {
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
    cy.get(".email").type(this.credentials.email);
    cy.get(".password").type(this.credentials.password);
    cy.get(".loginButton").click();
    cy.wait(5000);
  });

  it("Check Profile Page Url", function () {
    cy.visit(`${this.base_url}profile`);
    cy.wait(5000);
    cy.location().should((loc) => {
      expect(loc.href).to.eq(`${this.base_url}profile`);
    });
  });

  it("Check for Other Component", function () {
    cy.visit(`${this.base_url}profile`);
    cy.get("#changeProfile").contains("Change Proifle Picture");
    cy.get(".MuiChip-labelSmall").contains("Email Verified");
    cy.get("#edit").contains("Edit Profile");
  });

  it("Change Profile Picture", function () {
    cy.visit(`${this.base_url}profile`);
    cy.get("#changeProfile").click();
    cy.get("#alert-dialog-title");
  });

  it("Check Profile Details Component", function () {
    cy.visit(`${this.base_url}profile`);
    cy.wait(5000);
    cy.get("#profileData");
  });

  it("Check Edit Profile Modal", function () {
    cy.visit(`${this.base_url}profile`);
    cy.wait(3000);
    cy.get("#edit").click({ force: true });
    cy.wait(3000);
    cy.get("#editProfileModal");
    // cy.get("#editModalBox").should("have.length");
    expect("#editModalBox").to.have.length.at.least(4);
  });

  it("check Edit profile works", function () {
    cy.visit(`${this.base_url}profile`);
    cy.wait(3000);
    cy.get("#edit").click({ force: true });
    cy.get("[data-testId=editProfileName] > div > input").clear();
    cy.get("[data-testId=editProfileName]").type("test name");
    cy.get("[data-testId=editProfileFacebook] > div > input").clear();
    cy.get("[data-testId=editProfileFacebook]").type(" facebook");
    cy.get("[data-testId=editProfileTwitter] > div > input").clear();
    cy.get("[data-testId=editProfileTwitter]").type(" twitter");
    cy.get("[data-testId=editProfileLinkedin] > div > input").clear();
    cy.get("[data-testId=editProfileLinkedin]").type(" linkedin");
    cy.get("[data-testId=editProfileGithub] > div > input").clear();
    cy.get("[data-testId=editProfileGithub]").type(" github");
    cy.get("[data-testId=editProfileWebsite] > div > input").clear();
    cy.get("[data-testId=editProfileWebsite]").type("https://test.org");
    cy.get("[data-testId=editProfileDescription] > div > textarea").clear({
      force: true,
    });
    cy.get("[data-testId=editProfileDescription]  > div > textarea")
      .first()
      .type("test Description", { force: true });
    cy.get("[data-testId=editProfileSave]").click();
    cy.wait(5000);
    cy.get("[data-testId=profileName]").contains("test name");
  });
});
