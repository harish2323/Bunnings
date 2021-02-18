Feature: Search and Filter scenarios

Background: Load home page
 Given I am on the home page

  @FilterByPriceRange
  Scenario Outline: As a user, I can filter the search results by price range
    When I select suburb <suburb> and store <store>
    And I search for <search item>
    And I am in search results page
    And I set filter <filter>
    Then I verify price is within range <filter>

    Examples:
      | suburb      | store                  | search item  |  filter                   |  
      | Collingwood | Collingwood, VIC, 3066 |   pipe       |   "Price Range=Under $2"  |  
     
@FilterByBrand
  Scenario Outline: As a user, I can filter the search results by Brand
    When I select suburb <suburb> and store <store>
    And I search for <search item>
    And I am in search results page
    And I set filter <filter>
    Then I verify brand is filtered by <filter>

    Examples:
      | suburb      | store                  | search item  |  filter                                         |  
      | Collingwood | Collingwood, VIC, 3066 |   pipe       |    "Brand=Brasshards";"Price Range=$2 - $5"     |  
     
@FilterByShopBy
  Scenario Outline: As a user, I can filter the search results by Brand
    When I select suburb <suburb> and store <store>
    And I search for <search item>
    And I am in search results page
    And I set filter <filter>
    Then I verify shopby is filtered by <filter>

    Examples:
      | suburb      | store                  | search item  |  filter                                   |  
      | Collingwood | Collingwood, VIC, 3066 |   pipe       |    "Shop by=Online only";"Brand=Brasshards"  |  