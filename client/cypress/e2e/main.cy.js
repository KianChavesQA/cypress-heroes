import userData from "../fixtures/userData.json";
import loginPage from "../pageObjects/loginPage.js";
import heroesPage from "../pageObjects/heroesPage.js";
import editPage from "../pageObjects/editPage.js";
import Chance from "chance";

var chance = new Chance();

describe("Heroes App E2E Tests", () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it("TC-USER-001: Autenticação com usuário comum", () => {
    loginPage.login(userData.userCommon.email, userData.userCommon.password);
    heroesPage.verifyOnHeroesPage();
  });

  it("TC-USER-002: Curtida com usuário comum", () => {
    loginPage.login(userData.userCommon.email, userData.userCommon.password);
    heroesPage.verifyOnHeroesPage();
    heroesPage.likeFirstHeroAndVerifyFansIncrease();
  });

  it("TC-USER-003: Contratar hero com usuario comum", () => {
    loginPage.login(userData.userCommon.email, userData.userCommon.password);
    heroesPage.verifyOnHeroesPage();
    heroesPage.hireFirstHeroAndVerifySavesIncrease();
  });

  it("TC-ADMIN-001: Autenticação com usuário Admin", () => {
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    heroesPage.checkAdminPrivileges();
  });

  it("TC-ADMIN-002: Curtida com usuário admin", () => {
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    heroesPage.checkAdminPrivileges();
    heroesPage.likeFirstHeroAndVerifyFansIncrease();
  });

  it("TC-ADMIN-003: Contratar hero com usuário admin", () => {
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    heroesPage.checkAdminPrivileges;
    heroesPage.hireFirstHeroAndVerifySavesIncrease();
  });
  it("TC-ADMIN-004: Editar todos os campos do primeiro hero com usuário admin", () => {
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    heroesPage.checkAdminPrivileges();
    heroesPage.clickEditFirstHero();
    editPage.editFirstHeroAndVerifyChanges(
      chance.name(),
      chance.integer({ min: 1, max: 100 }),
      chance.integer({ min: 1, max: 100 }),
      chance.integer({ min: 1, max: 100 })
    );
  });

  it("TC-ADMIN-005: Deletar o último hero com usuário admin", () => {
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    heroesPage.checkAdminPrivileges();
    heroesPage.clickDeleteLastHero();
    heroesPage.checkDeletedMessage();
  });
  it("TC-ADMIN-006: Criar um novo hero com usuário admin", () => {
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    heroesPage.checkAdminPrivileges();

    heroesPage.createNewHero(
      chance.name(),
      chance.integer({ min: 1, max: 100 }),
      chance.integer({ min: 1, max: 100 }),
      chance.integer({ min: 1, max: 100 })
    );
  });

  it("TC-ADMIN-007: Não permitir criação de Hero com nome duplicado", () => {
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    heroesPage.checkAdminPrivileges();
    heroesPage.createNewHeroWithSameFirstHeroName();
  });
});
