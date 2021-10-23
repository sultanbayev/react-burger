describe('Ensuring that drag-n-drop functionality works properly on Home page', function() {
    before(function() {
        cy.visit('http://localhost:3000');
    });

    it(`should drag bun and drop it into constructor,
        top and bottom buns should appear in constructor,
        buns count should become 2`, function() {
            cy.get('article[class^="styles_card__"]')
                .eq(1)
                .as('dragItem')
                .should('contain', 'Флюоресцентная булка R2-D3');
            cy.get('ul[class*="styles_outerList__"]')
                .as('dropTarget');
            
            cy.get('@dragItem').trigger('dragstart');
            cy.get('@dropTarget').trigger('drop');

            cy.get('@dropTarget')
                .find('div[class^="constructor-element constructor-element_pos_top"]')
                .should('contain', 'Флюоресцентная булка R2-D3 (верх)');

            cy.get('@dropTarget')
                .find('div[class^="constructor-element constructor-element_pos_bottom"]')
                .should('contain', 'Флюоресцентная булка R2-D3 (низ)');

            cy.get('@dragItem')
                .find('div[class^="counter_counter__"]')
                .find('p[class^="counter_counter__num__"]')
                .should('contain', '2');
        });

    it(`should drag and drop non-bun ingredient into constructor between two buns,
        ingredient's count should become 1`, function() {
            cy.get('article[class^="styles_card__"]')
                .eq(7)
                .as('dragItem')
                .should('contain', 'Мясо бессмертных моллюсков Protostomia');
            cy.get('ul[class*="styles_outerList__"]').as('dropTarget');

            cy.get('@dragItem').trigger('dragstart');
            cy.get('@dropTarget').trigger('drop');

            cy.get('@dropTarget')
                .find('div[class="constructor-element"]')
                .should('contain', 'Мясо бессмертных моллюсков Protostomia');

            cy.get('@dragItem')
                .find('div[class^="counter_counter__"]')
                .find('p[class^="counter_counter__num__"]')
                .should('contain', '1');
        });

    it(`should drag and drop non-bun same as previous ingredient into constructor between two buns,
        ingredient's count should become 2`, function() {
            cy.get('article[class^="styles_card__"]')
                .eq(7)
                .as('dragItem')
                .should('contain', 'Мясо бессмертных моллюсков Protostomia');
            cy.get('ul[class*="styles_outerList__"]').as('dropTarget');

            cy.get('@dragItem').trigger('dragstart');
            cy.get('@dropTarget').trigger('drop');

            cy.get('@dropTarget')
                .find('div[class="constructor-element"]')
                .should('contain', 'Мясо бессмертных моллюсков Protostomia');

            cy.get('@dragItem')
                .find('div[class^="counter_counter__"]')
                .find('p[class^="counter_counter__num__"]')
                .should('contain', '2');
        });
})