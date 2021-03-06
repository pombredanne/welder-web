const Nightmare = require('nightmare');
const EditRecipePage = require('../pages/editRecipe');
const apiCall = require('../utils/apiCall');
const pageConfig = require('../config');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

describe('Imported Content Sanity Testing', () => {
  // Set case running timeout
  const timeout = 15000;

  let db;

  beforeAll((done) => {
    // Check exist of metadata.db file first
    fs.access(process.env.MDDB || 'metadata.db', (error) => {
      if (error) return done(error);
      db = new sqlite3.Database(process.env.MDDB || 'metadata.db');
      return done();
    });
  });

  beforeAll((done) => {
    // Check BDCS API and Web service first
    apiCall.serviceCheck(done);
  });

  beforeAll((done) => {
    // Create a new recipe before the first test run in this suite
    apiCall.newRecipe(pageConfig.recipe.simple, done);
  });

  afterAll((done) => {
    // Delete added recipe after all tests completed in this sute
    apiCall.deleteRecipe(pageConfig.recipe.simple.name, done);
    // Close connection with sqlite db
    db.close();
  });

  const editRecipePage = new EditRecipePage(pageConfig.recipe.simple.name);

  test('displayed count should match distinct count from DB', (done) => {
    db.each('SELECT name, COUNT(DISTINCT name) AS total_count FROM groups', (err, row) => {
      const expectedText = `1 - 50 of ${row.total_count}`;

      const nightmare = new Nightmare();
      nightmare
        .goto(editRecipePage.url)
        .wait(editRecipePage.componentListItemRootElement) // list item and total number are rendered at the same time
        .then(() => nightmare
          .evaluate(page => document.querySelector(page.totalComponentCount).innerText
            , editRecipePage)
          .end())
        .then((element) => {
          expect(element).toBe(expectedText);
          done();
        });
    });
  }, timeout);
});
