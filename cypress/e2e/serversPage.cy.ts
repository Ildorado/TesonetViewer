describe("Severs Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login({ username: "tesonet", password: "partyanimal" });
  });

  it("should be able to access website data on correct authorisation data", () => {
    cy.getBySel("table").should("exist");
  });

  it("should be able to sort the table by distance", () => {
    cy.getBySel("table").should("exist");

    cy.getBySel("table-header-column").should("have.length", 2);
    cy.getBySel("table-header-column").eq(0).contains("name");

    cy.getBySel("table-header-column").eq(1).contains("distance").click();

    cy.getBySel("table-distance-cell")
      .first()
      .then((value) => {
        const firstElementDistanceDescending = Number(value.text());

        cy.getBySel("table-distance-cell")
          .last()
          .then((value2) => {
            const lastElementDistanceDesdending = Number(value2.text());

            cy.getBySel("table-header-column")
              .eq(1)
              .contains("distance")
              .click();

            cy.getBySel("table-distance-cell")
              .first()
              .then((value3) => {
                const firstElementDistanceAscdending = Number(value3.text());

                cy.getBySel("table-distance-cell")
                  .last()
                  .then((value4) => {
                    const lastElementDistanceAscending = Number(value4.text());

                    expect(firstElementDistanceDescending).equal(
                      lastElementDistanceAscending
                    );
                    expect(lastElementDistanceDesdending).equal(
                      firstElementDistanceAscdending
                    );
                  });
              });
          });
      });

    cy.getBySel("table-header-column").eq(1).click();
  });
});
