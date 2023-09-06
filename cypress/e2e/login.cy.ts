describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should not access website data on wrong authorisation data", () => {
    cy.login({ username: "wrongUsername", password: "wrongPassword" });

    cy.getBySel("table").should("not.exist");
  });

  it("should be able to access website data on correct authorisation data", () => {
    cy.login({ username: "tesonet", password: "partyanimal" });

    cy.getBySel("table").should("exist");
  });
});
