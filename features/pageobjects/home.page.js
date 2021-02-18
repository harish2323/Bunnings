const Page = require('./page');

/** *
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get searchTextBox ()       { return $('//input[@datav3-track-text="search"]') }
    get searchButton ()        { return $('//button[@datav3-track-text="search"]') }
    get selectStoreList ()     { return $('//div[@class="header-store-locator_trigger"]') }
    get storeNameTextBox ()   {return  $('//input[@class="header-store-locator_input"]')}
    get storeLocationResult()  {return  $('//span[@class="header-store-locator_result_list-name"]')}
    get setAsStoreButton()     {return  $('//button[text()="Set as my store"]')}
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    selectStore(suburb,store) {
        this.selectStoreList.waitForEnabled({timeout:2000})
        this.selectStoreList.click();
        this.storeNameTextBox.setValue(suburb);
        //click on the store from the result list
        $('//span[@class="header-store-locator_result_list-name" and text()="'+store+'"]').click()        
        this.setAsStoreButton.click();
        browser.pause(5000) 
    }

    searchItem(item)
    {
        this.searchTextBox.setValue(item)
        this.searchButton.click()
        browser.pause(5000)
    }



    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('home');
    }
}

module.exports = new HomePage();
