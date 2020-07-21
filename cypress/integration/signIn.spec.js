/// <reference types="Cypress" />

const user = {
  username: "Test",
  password: "test123",
  firstName: "Jonas",
  lastName: "Jonaitis",
  email: "fake@email.com",
  avatar: "https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png",
};

function removeUserIfExists(username) {
  cy.request("GET", `/api/users?username=${username}`).then((response) => {
    if (response.body.length) {
      const user = response.body[0];
      cy.request("DELETE", `/api/users/${user._id}`);
    }
  });
}

function addUser(user) {
  cy.request("POST", "/api/users", user).then((response) => {
    expect(response.body).to.have.property("username", user.username);
  });
}

describe("Sign in page tests", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    removeUserIfExists(user.username);
    removeUserIfExists("Test");
  });

  after(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    removeUserIfExists(user.username);
  });

  it("submit a form with valid info", () => {
    cy.visit("/register");

    cy.url().should("include", "/register");
    cy.get("#username-input").type("Test");
    cy.get("#password-input").type("test123");
    cy.get("#firstName-input").type("Test");
    cy.get("#lastName-input").type("Testing");
    cy.get("#email-input")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
    cy.get("#avatar-input").type(
      "https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"
    );
    cy.contains("Sign Up!").click();
    cy.contains(
      ".alert.alert-success",
      "Successfully Signed Up! Nice to meet you Test"
    );
    cy.contains("My Profile").click();
    cy.contains(".profile-heading", "Test Testing");
    cy.contains(".caption a", "fake@email.com");
    cy.contains("Edit").click();
    cy.get("#firstName-input").clear().type("Jonas");
    cy.get("#lastName-input").clear().type("Jonaitis");
    cy.contains("Save").click();
    cy.contains(".profile-heading", "Jonas Jonaitis");
  });

  it("submit a form with already existing info", () => {
    addUser(user);
    cy.visit("/register");

    cy.url().should("include", "/register");
    cy.get("#username-input").type("Test");
    cy.get("#password-input").type("test123");
    cy.get("#firstName-input").type("Jonas");
    cy.get("#lastName-input").type("Jonaitis");
    cy.get("#email-input")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
    cy.get("#avatar-input").type(
      "https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"
    );
    cy.contains("Sign Up!").click();
    cy.contains(
      ".alert.alert-danger",
      "A user with the given username is already registered"
    );
  });
});
