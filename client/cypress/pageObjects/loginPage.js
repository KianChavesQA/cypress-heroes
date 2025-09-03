







// PageObject responsável pelas ações de login na aplicação
class LoginPage {

  // Retorna os seletores utilizados na tela de login
  selectorList() {
    const selectors = {
      // Seletor do campo de email
      emailInput: 'input[name="email"]',
      // Seletor do campo de senha
      passwordInput: 'input[name="password"]',
      // Seletor do botão de login
      loginButton: 'button:contains("Sign in")',
    };
    return selectors;
  }

  // Acessa a página inicial e clica no botão de login
  visit() {
    cy.visit("http://localhost:3000/");
    cy.get('button').contains('Login').click();
  }

  // Preenche o campo de email com o valor fornecido
  fillEmail(email) {
    cy.get(this.selectorList().emailInput).clear().type(email);
  }

  // Preenche o campo de senha com o valor fornecido
  fillPassword(password) {
    cy.get(this.selectorList().passwordInput).clear().type(password);
  }

  // Clica no botão para submeter o login
  submit() {
    cy.get(this.selectorList().loginButton).click();
  }

  // Executa o fluxo completo de login: acessar página, preencher email/senha e submeter
  login(email, password) {
    this.visit();
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }
}

// Exporta uma instância do PageObject para uso nos testes
export default new LoginPage();
