/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
export {};
declare global {
  namespace Cypress {
    interface Chainable {
      getBySel: typeof getBySel;
      getBySelLike: typeof getBySelLike;
      login: typeof login;
      validateSnapshot: (title: string) => void;
    }
  }
}

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

const getBySel = (selector: string, ...args: any[]) => {
  return cy.get(`[data-test=${selector}]`, ...args);
};

const getBySelLike = (selector: string, ...args: any[]) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
};

export const login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  cy.getBySel("login-username").type(username);
  cy.getBySel("login-password").type(password);

  cy.getBySel("login-submit").click();
};

Cypress.Commands.add("getBySel", getBySel);
Cypress.Commands.add("getBySelLike", getBySelLike);
Cypress.Commands.add("login", login);
