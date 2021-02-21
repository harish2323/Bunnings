const { Given, When, Then } = require('cucumber');

const SearchResultsPage = require('../pageobjects/searchresults.page');

var  totalSearchResultsCount     
var  filteredSearchResultsCount  


When(/^I am in search results page$/,function() {
   filteredSearchResultsCount = SearchResultsPage.getFilteredResultsCount()
});

When(/^I set filter (.*)$/,  function(filter){
    SearchResultsPage.setFilterValue(filter)
});

Then(/^I verify price is within range (.*)$/, function(range){
   chai.expect(SearchResultsPage.verifyPricesInRange(range)).to.be.true
} );

Then(/^I verify brand is filtered by (.*)$/, function(brand){
   chai.expect(SearchResultsPage.verifyBrands(brand)).to.be.true
})

Then(/^I verify shopby is filtered by (.*)$/, function(shopby){
   chai.expect(SearchResultsPage.verifyShopby(shopby)).to.be.true
})