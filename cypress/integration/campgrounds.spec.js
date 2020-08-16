/// <reference types="Cypress" />

import { removeCampgroundIfExists, addCampground } from "../utils/campgrounds";

const campground = {
  name: "Cypress",
  price: "5.60",
  description: "Hello World",
  image: "fakeImage",
};

describe("Campground", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    removeCampgroundIfExists(campground.name);
    addCampground(campground);
    cy.visit("/campgrounds");
  });

  after(() => {
    removeCampgroundIfExists(campground.name);
  });

  it("editing a campground", () => {
    cy.contains(campground.name)
      .parentsUntil(".col-lg-3")
      .within(() => {
        cy.contains("More info").click();
      });
    cy.contains("Edit").click();
    cy.get("#price-input").clear().type("69");
    cy.get("input[type=file]").attachFile("campground.jpg");
    cy.get("#description-input").clear().type("Testing description.");
    cy.contains("Submit").click();
    cy.contains(".alert.alert-success", "Successfully Updated!");
    cy.contains(".float-right", "$ 69/night");
    cy.contains("Testing description.");
  });

  it("add new campground", () => {
    cy.contains("Add New Campground").click();
    cy.get("#name-input").type(campground.name);
    cy.get("#price-input").type(campground.price);
    cy.get("#image").attachFile("campground.jpg");
    cy.get("#description-input").type(campground.description);
    cy.contains("Submit").click();
  });

  it("delete campground", () => {
    cy.contains(campground.name)
      .parentsUntil(".col-lg-3")
      .within(() => {
        cy.contains("More info").click();
      });
    cy.get(".btn-danger").click();
    cy.contains(".alert.alert-success", "Campground deleted successfully!");
  });
});
