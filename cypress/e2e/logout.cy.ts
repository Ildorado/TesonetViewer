describe("Logout", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login({ username: "tesonet", password: "partyanimal" });
  });

  it("should logout correctly ", () => {
    cy.getBySel("login-page").should("not.exist");
    cy.getBySel("table").should("exist");

    cy.getBySel("logout").click();

    cy.getBySel("login-page").should("exist");
  });
});
