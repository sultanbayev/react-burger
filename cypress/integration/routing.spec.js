describe('app works correctly with routes', function() {
    before(function() {
      cy.visit('http://localhost:3000');
    });

    it('should open route Home page by default', function() {
        cy.contains('Соберите бургер');
    });

    it('should open route Feed page by clicking feed link', function() {
        cy.get('a').contains('Лента заказов').click();
        cy.contains('Лента заказов');
    });

    it('should open route Login page by clicking profile link', function() {
        cy.get('a').contains('Личный кабинет').click();
        cy.contains('Вход');
    });

    it('should receive error message after entering wrong login details', function() {
        cy.get('input[name^="email"]').type('sultanbayev@gmail.com');
        cy.get('input[name^="password"]').type('1234567890');
        cy.get('button').contains('Войти').click();
        cy.get('div[class^="mt-6"] > p[class^="text text_type_main-default"]',).contains('email or password are incorrect').as('errorMessage');
        cy.get('@errorMessage').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  }); 