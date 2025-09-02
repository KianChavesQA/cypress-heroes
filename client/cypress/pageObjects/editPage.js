class EditPage {
  selectorList() {
    const selectors = {
      nameInput: '[data-cy="nameInput"]',
      priceInput: '[data-cy="priceInput"]',
      fansInput: '[data-cy="fansInput"]',
      savesInput: '[data-cy="savesInput"]',
      deleteButton: 'button:contains("Delete")',
      submitButton: 'button:contains("Submit")',
      powersSelect: '[data-cy="powersSelect"]',
      avatarInput: '[data-cy="avatarFile"]',
    };
    return selectors;
  }

  editFirstHeroAndVerifyChanges(name, price, fans, saves) {
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

    // Depois de capturar todos os valores, edita os campos
    cy.then(() => {
      // Log dos valores antes da edição
      cy.log(
        `Hero Info - Name: ${heroBefore.name}, Price: ${heroBefore.price}, Fans: ${heroBefore.fans}, Saves: ${heroBefore.saves}`
      );

      cy.get(selectors.nameInput).clear().type(name);
      cy.get(selectors.priceInput).clear().type(price);
      cy.get(selectors.fansInput).clear().type(fans);
      cy.get(selectors.savesInput).clear().type(saves);

      // Seleciona um poder aleatório
      cy.get(selectors.powersSelect).then(($select) => {
        const options = $select.find("option");
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomValue = options.eq(randomIndex).val();
        cy.wrap($select).select(randomValue);
      });

      // Faz o upload do avatar
      cy.get(this.selectorList().avatarInput).selectFile(
        "cypress/fixtures/avatar.jpg"
      );

      // Submete o formulário
      cy.get(selectors.submitButton).click();

      // Verifica se os valores foram alterados
      cy.get(selectors.nameInput).should("not.have.value", heroBefore.name);
      cy.get(selectors.priceInput).should("not.have.value", heroBefore.price);
      cy.get(selectors.fansInput).should("not.have.value", heroBefore.fans);
      cy.get(selectors.savesInput).should("not.have.value", heroBefore.saves);
    });
  }
}

export default new EditPage();
