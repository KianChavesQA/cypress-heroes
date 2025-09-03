class HeroesPage {
  // Retorna um objeto com todos os seletores usados na página de heróis
  selectorList() {
    const selectors = {
      name: '[data-cy="name"]',
      fans: '[data-cy="fans"]',
      like: '[data-cy="like"]',
      saves: '[data-cy="saves"]',
      money: '[data-cy="money"]',
      editButton: '[data-cy="pencil"]',
      deleteButton: '[data-cy="trash"]',
      nameInput: '[data-cy="nameInput"]',
      priceInput: '[data-cy="priceInput"]',
      fansInput: '[data-cy="fansInput"]',
      savesInput: '[data-cy="savesInput"]',
      submitButton: 'button:contains("Submit")',
      powersSelect: '[data-cy="powersSelect"]',
      avatarInput: '[data-cy="avatarFile"]',
      createNewHeroButton: "[href='/heroes/new']",
    };
    return selectors;
  }

  verifyOnHeroesPage() {
    cy.url().should("include", "/heroes");
  }
  likeFirstHeroAndVerifyFansIncrease() {
    cy.get(this.selectorList().fans)
      .first()
      .invoke("text")
      .then((fansBefore) => {
        cy.get(this.selectorList().like).first().click();
        cy.get(this.selectorList().fans)
          .first()
          .should((fansAfter) => {
            expect(Number(fansAfter.text())).to.eq(Number(fansBefore) + 1);
          });
      });
  }

  hireFirstHeroAndVerifySavesIncrease() {
    cy.get('[data-cy="saves"]')
      .first()
      .invoke("text")
      .then((savesBefore) => {
        cy.get(this.selectorList().money).first().click();
        cy.get("button").contains("Yes").click();
        cy.get(this.selectorList().saves)
          .first()
          .should((savesAfter) => {
            expect(Number(savesAfter.text())).to.eq(Number(savesBefore) + 1);
          });
      });
  }

  // Verifica se o botão de criar novo herói está visível (privilégios de admin)
  checkAdminPrivileges() {
    cy.contains("Create New Hero").should("exist");
  }

  // Clica no botão de editar do primeiro herói
  clickEditFirstHero() {
    cy.get(this.selectorList().editButton).first().click();
  }

  // Clica no botão de deletar do último herói e confirma a exclusão
  clickDeleteLastHero() {
    cy.get(this.selectorList().deleteButton).last().click();
    cy.get("button").contains("Yes").click();
  }

  checkDeletedMessage() {
    cy.contains("Hero deletado com Sucesso").should("exist");
  }

  // Cria um novo herói preenchendo os campos e selecionando opções aleatórias
  createNewHero(name, fans, saves, money) {
    cy.get(this.selectorList().createNewHeroButton).click();
    cy.get(this.selectorList().nameInput).type(name);
    cy.get(this.selectorList().fansInput).type(fans);
    cy.get(this.selectorList().savesInput).type(saves);
    cy.get(this.selectorList().priceInput).type(money);
    // Seleciona um poder aleatório para o herói
    cy.get(this.selectorList().powersSelect).then(($select) => {
      const options = $select.find("option");
      const randomIndex = Math.floor(Math.random() * options.length);
      const randomValue = options.eq(randomIndex).val();
      cy.wrap($select).select(randomValue);
    });
    // Seleciona um arquivo de avatar para o herói
    cy.get(this.selectorList().avatarInput).selectFile(
      "cypress/fixtures/avatar.jpg"
    );
    cy.get("button").contains("Submit").click();
  }

  // Tenta criar um novo herói com o mesmo nome do primeiro herói e verifica mensagem de erro
  createNewHeroWithSameFirstHeroName() {
    const selectors = this.selectorList();
    const heroFirst = {};

    // Captura o nome do primeiro herói
    cy.get(selectors.name)
      .first()
      .invoke("text")
      .then((text) => {
        heroFirst.name = String(text).trim();

        cy.get(selectors.createNewHeroButton).click();
        cy.get(selectors.nameInput).type(heroFirst.name);
      });
    cy.get(selectors.fansInput).type(10);
    cy.get(selectors.savesInput).type(10);
    cy.get(selectors.priceInput).type(10);
    cy.get(selectors.powersSelect).then(($select) => {
      const options = $select.find("option");
      const randomIndex = Math.floor(Math.random() * options.length);
      const randomValue = options.eq(randomIndex).val();
      cy.wrap($select).select(randomValue);
    });
    cy.get(selectors.avatarInput).selectFile("cypress/fixtures/avatar.jpg");
    cy.get("button").contains("Submit").click();
    cy.contains("Já existe um heró com esse nome").should("exist");
  }

  saveFirstHero() {
    const selectors = this.selectorList();

    // Objeto para armazenar valores antes da edição
    const heroBefore = {};

    // Captura todos os valores iniciais
    cy.get(selectors.nameInput)
      .invoke("text")
      .then((text) => (heroBefore.name = text));
    cy.get(selectors.priceInput)
      .invoke("text")
      .then((text) => (heroBefore.price = text));
    cy.get(selectors.fansInput)
      .invoke("text")
      .then((text) => (heroBefore.fans = text));
    cy.get(selectors.savesInput)
      .invoke("text")
      .then((text) => (heroBefore.saves = text));
  }
}

export default new HeroesPage();
