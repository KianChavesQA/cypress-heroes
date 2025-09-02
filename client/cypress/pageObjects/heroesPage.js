class HeroesPage {
  selectorList() {
    const selectors = {
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

  checkAdminPrivileges() {
    cy.contains("Create New Hero").should("exist");
  }

  clickEditFirstHero() {
    cy.get(this.selectorList().editButton).first().click();
  }
  clickDeleteLastHero() {
    cy.get(this.selectorList().deleteButton).last().click();
    cy.get("button").contains("Yes").click();
  }
  createNewHero(name, fans, saves, money) {
    cy.get("button").contains("Create New Hero").click();
    cy.get(this.selectorList().nameInput).type(name);
    cy.get(this.selectorList().fansInput).type(fans);
    cy.get(this.selectorList().savesInput).type(saves);
    cy.get(this.selectorList().priceInput).type(money);
    cy.get(this.selectorList().powersSelect).then(($select) => {
      const options = $select.find("option");
      const randomIndex = Math.floor(Math.random() * options.length);
      const randomValue = options.eq(randomIndex).val();
      cy.wrap($select).select(randomValue);
    });
    cy.get(this.selectorList().avatarInput).selectFile(
      "cypress/fixtures/avatar.jpg"
    );
    cy.get("button").contains("Submit").click();
  }
}

export default new HeroesPage();
