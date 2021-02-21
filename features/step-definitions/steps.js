const { Given, When, Then } = require('cucumber');

const HomePage = require('../pageobjects/home.page');
const SearchResultsPage = require('../pageobjects/searchresults.page');



Given(/^I am on the home page$/, () => {
    HomePage.open()
});

When(/^I select suburb (.*) and store (.*)$/, (suburb, store) => {
    HomePage.selectStore(suburb, store)
});

When(/^I search for (.*)$/, (item) => {
    HomePage.searchItem(item)
});

Then(/^I should see a flash message saying (.*)$/, (message) => {
    expect(SecurePage.flashAlert).toBeExisting();
    expect(SecurePage.flashAlert).toHaveTextContaining(message);
});

