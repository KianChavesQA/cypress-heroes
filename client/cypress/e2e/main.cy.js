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


// Importa dados de usuário para os testes
import userData from "../fixtures/userData.json";
// Importa o pageObject responsável pelo login
import loginPage from "../pageObjects/loginPage.js";
// Importa o pageObject responsável pela página de heróis
import heroesPage from "../pageObjects/heroesPage.js";
// Importa o pageObject responsável pela edição de heróis
import editPage from "../pageObjects/editPage.js";
// Importa a biblioteca Chance para gerar dados aleatórios
import Chance from "chance";

// Instancia o objeto Chance para uso nos testes
var chance = new Chance();

// Descreve o conjunto de testes E2E da aplicação Heroes
describe("Heroes App E2E Tests", () => {
  // Executa antes de cada teste: acessa a página de login
  beforeEach(() => {
    loginPage.visit();
  });

  // Testa autenticação com usuário comum
  it("TC-USER-001: Autenticação com usuário comum", () => {
    // Realiza login com usuário comum
    loginPage.login(userData.userCommon.email, userData.userCommon.password);
    // Verifica se está na página de heróis após login
    heroesPage.verifyOnHeroesPage();
  });

  // Testa curtida de herói com usuário comum
  it("TC-USER-002: Curtida com usuário comum", () => {
    // Realiza login com usuário comum
    loginPage.login(userData.userCommon.email, userData.userCommon.password);
    // Verifica se está na página de heróis
    heroesPage.verifyOnHeroesPage();
    // Clica no botão de curtir do primeiro herói e valida aumento de fãs
    heroesPage.likeFirstHeroAndVerifyFansIncrease();
  });

  // Testa contratação de herói com usuário comum
  it("TC-USER-003: Contratar hero com usuario comum", () => {
    // Realiza login com usuário comum
    loginPage.login(userData.userCommon.email, userData.userCommon.password);
    // Verifica se está na página de heróis
    heroesPage.verifyOnHeroesPage();
    // Clica no botão de contratar do primeiro herói e valida aumento de saves
    heroesPage.hireFirstHeroAndVerifySavesIncrease();
  });

  // Testa autenticação com usuário admin
  it("TC-ADMIN-001: Autenticação com usuário Admin", () => {
    // Realiza login com usuário admin
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    // Verifica se privilégios de admin estão disponíveis
    heroesPage.checkAdminPrivileges();
  });

  // Testa curtida de herói com usuário admin
  it("TC-ADMIN-002: Curtida com usuário admin", () => {
    // Realiza login com usuário admin
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    // Verifica privilégios de admin
    heroesPage.checkAdminPrivileges();
    // Clica no botão de curtir do primeiro herói e valida aumento de fãs
    heroesPage.likeFirstHeroAndVerifyFansIncrease();
  });

  // Testa contratação de herói com usuário admin
  it("TC-ADMIN-003: Contratar hero com usuário admin", () => {
    // Realiza login com usuário admin
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    // Verifica privilégios de admin
    heroesPage.checkAdminPrivileges;
    // Clica no botão de contratar do primeiro herói e valida aumento de saves
    heroesPage.hireFirstHeroAndVerifySavesIncrease();
  });

  // Testa edição de todos os campos do primeiro herói com usuário admin
  it("TC-ADMIN-004: Editar todos os campos do primeiro hero com usuário admin", () => {
    // Realiza login com usuário admin
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    // Verifica privilégios de admin
    heroesPage.checkAdminPrivileges();
    // Clica no botão de editar do primeiro herói
    heroesPage.clickEditFirstHero();
    // Edita todos os campos do herói com dados aleatórios e valida alterações
    editPage.editFirstHeroAndVerifyChanges(
      chance.name(),
      chance.integer({ min: 1, max: 100 }),
      chance.integer({ min: 1, max: 100 }),
      chance.integer({ min: 1, max: 100 })
    );
  });

  // Testa deleção do último herói com usuário admin
  it("TC-ADMIN-005: Deletar o último hero com usuário admin", () => {
    // Realiza login com usuário admin
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    // Verifica privilégios de admin
    heroesPage.checkAdminPrivileges();
    // Clica no botão de deletar do último herói e valida mensagem de sucesso
    heroesPage.clickDeleteLastHero();
    heroesPage.checkDeletedMessage();
  });

  // Testa criação de novo herói com usuário admin
  it("TC-ADMIN-006: Criar um novo hero com usuário admin", () => {
    // Realiza login com usuário admin
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    // Verifica privilégios de admin
    heroesPage.checkAdminPrivileges();

    // Preenche dados aleatórios e cria novo herói
    heroesPage.createNewHero(
      chance.name(),
      chance.integer({ min: 1, max: 100 }),
      chance.integer({ min: 1, max: 100 }),
      chance.integer({ min: 1, max: 100 })
    );
  });

  // Testa restrição de nome duplicado ao criar herói
  it("TC-ADMIN-007: Não permitir criação de Hero com nome duplicado", () => {
    // Realiza login com usuário admin
    loginPage.login(userData.userAdmin.email, userData.userAdmin.password);
    // Verifica privilégios de admin
    heroesPage.checkAdminPrivileges();
    // Tenta criar novo herói com nome já existente e valida mensagem de erro
    heroesPage.createNewHeroWithSameFirstHeroName();
  });
});
