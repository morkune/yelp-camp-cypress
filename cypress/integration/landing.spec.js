/// <reference types="cypress" />

import { removeCampgroundIfExists, addCampground } from "../utils/campgrounds";

const campground = {
  name: "Cypress",
  price: "5.60",
  description: "Hello World",
  image: "fakeImage",
};

describe("Landing page", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.visit("/");
  });

  after(() => {
    removeCampgroundIfExists(campground.name);
  })

  it("checking the text of the elements", () => {
    cy.contains("[data-cy=landing-header]", "Welcome to YelpCamp!");
    cy.contains("[data-cy=link-to-campgrounds]", "View All Campgrounds");
  });

  it("go to all campgrounds page", () => {
    cy.get("[data-cy=link-to-campgrounds]").click();

    cy.url().should("include", "/campgrounds");
  });

  it("search with invalid input", () => {
    cy.get("[data-cy=search]").type("nothing").should("have.value", "nothing");
    cy.get("[data-cy=submit]").click();
    cy.url().should("include", "/campgrounds?search=nothing");
    cy.contains(
      "h3",
      'No campgrounds match "nothing" query, please try again.'
    );

    cy.get(".navbar-brand").click();
    cy.get("[data-cy=search]").type("123+*").should("have.value", "123+*");
    cy.get("[data-cy=submit]").click();
    cy.contains("h3", 'No campgrounds match "123+*" query, please try again.');

    cy.get(".navbar-brand").click();
    cy.get("[data-cy=search]").type("forestt").should("have.value", "forestt");
    cy.get("[data-cy=submit]").click();
    cy.contains(
      "h3",
      'No campgrounds match "forestt" query, please try again.'
    );
  });

  it("search with valid input", () => {
    removeCampgroundIfExists(campground.name);
    addCampground(campground);

    cy.get("[data-cy=search]").type(campground.name).should("have.value", campground.name);
    cy.get("[data-cy=submit]").click();
    cy.url().should("include", `/campgrounds?search=${campground.name}`);
    cy.contains(".card-title", campground.name);
  });
});
