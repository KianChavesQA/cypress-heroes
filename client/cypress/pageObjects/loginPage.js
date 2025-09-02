class LoginPage {


  selectorList() {
    const selectors = {
      emailInput: 'input[name="email"]',
      passwordInput: 'input[name="password"]',
      loginButton: 'button:contains("Sign in")',
    };
    return selectors;
  }
  visit() {
    cy.visit("http://localhost:3000/");
    cy.get('button').contains('Login').click();
  }

  fillEmail(email) {
    cy.get(this.selectorList().emailInput).clear().type(email);
  }

  fillPassword(password) {
    cy.get(this.selectorList().passwordInput).clear().type(password);
  }

  submit() {
    cy.get(this.selectorList().loginButton).click();
  }

  login(email, password) {
    this.visit();
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }
}

export default new LoginPage();
