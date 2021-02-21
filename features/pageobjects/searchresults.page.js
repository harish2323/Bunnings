const actions=require('../utils/actions')
const productCountPerPage= 60
var filteredResultCountValue =0

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SearchResultsPage {
    /**
     * define selectors using getter methods
     */
    get totalSearchResultsCount ()    { return  $('//span[@class="responsive-search-title__count"]') }
    get filteredSearchResultsCount () { return  $('//p[@class="responsive-search-header__total--filtered"]/span')}
    get productListSection ()         { return  $('//section[@class="product-list"]')}
    get productPrices()               { return  $$('//div[@class="codified-product-tile__price--value price-value"]')}
    get productBrands()               { return  $$('//div[@class="codified-product-tile__brand-image--image"]')}
    get productShopOnline()           { return  $$('//div[@class="codified-product-tile__order--buyonline"]')}
     filterAccordion(filter)          {  return $('//div[@class="bui-accordion__trigger-title" and text()="'+filter+'"]/..')}
     filterCheckBox(value)            {  return $('//label[@class="bui-checkbox__label"]/span[text()="'+value+'"]/..')}
    get brandAccordion()              {  return $('//div[@class="bui-accordion__trigger-title" and text()="Brand"]')}
    get paginationMoreButton()        { return  $('//button[@icon="bui-icon-chevron-right"]')}


    /*** Methods *****/
    getFilteredResultsCount()
    {
        //wait for products to sync when filter is applied
        this.filteredSearchResultsCount.waitForClickable()
        return this.filteredSearchResultsCount.getText()
    } 

    getTotalResultsCount()
    {
        
        return this.totalSearchResultsCount.getText()
    } 

     setFilterValue(filter)
    {
        var filters=this.splitFilterData(filter)
        console.log("OUTPUT FILTER SIZE :: "+filters[0])
        for(var i=0;i<filters.length;i++){
            var filterName=filters[i][0]
            var filterValue=filters[i][1]
            console.log("Name :::::: "+filterName + " Value ::::: "+filterValue)
            actions.expandAccordion(this.filterAccordion(filterName))
            this.filterCheckBox(filterValue).click()
        }
    }

     getAllProductPrices()
    {
        var prices=[]
        var paginationCount=  this.getPaginationCount()
        for( var j=0;j<paginationCount;j++)
        {
            var priceElements= this.productPrices
            for(var i=0;i<priceElements.length;i++)
            {
                priceElements[i].scrollIntoView()
                prices[i]=parseInt(priceElements[i].getText().toString().replace("$",""))
            }

            if(j<paginationCount-1 ) this.paginationMoreButton.click() 
        }
        return prices
    }


    getAllProductBrands()
    {
        var brands=[]
        var paginationCount=  this.getPaginationCount()
        for( var j=0;j<paginationCount;j++)
        {
            var brandElements= this.productBrands
            for(var i=0;i<brandElements.length;i++)
            {
                brandElements[i].scrollIntoView()
                brands[i]=brandElements[i].getAttribute("alt")
            }

            if(j<paginationCount-1 ) this.paginationMoreButton.click() 
        }
        return brands
    }

    verifyPricesInRange(filters)
    {
        var filterNameValue=this.splitFilterData(filters)
        var result=false
        var prices = this.getAllProductPrices()
        for( var i=0;i<filterNameValue.length;i++){
            var range= filterNameValue[i][1]
             switch(range)
             {
                  case "Under $2":
                     console.log("Under $2")
                     result = this.checkPriceRange(prices,0,2)
                  default:
                     break
             }
        }
        return result
    }

    verifyBrands(brand)
    {
        var filterNameValue=this.splitFilterData(brand)
        var brandList = this.getAllProductBrands()
        for(var b=0;b<filterNameValue.length;b++){
            for(var i=0;i<brandList.length;i++)
                {
                     if ((brandList[i]!=filterNameValue[b][1]) && filterNameValue[b][0]=="Brand")
                        {
                            console.log("FALSE")
                            return false
                        }
                }
         }
        return true
    }

    verifyShopby(shopby)
    {
        var filterNameValue=this.splitFilterData(shopby)
        var result= false
        for(var b=0;b<filterNameValue.length;b++){
           for(var i=0;i<filterNameValue.length;i++)
                {
                     if (filterNameValue[b][0]=="Shop by")
                        {
                            result = this.checkShopBy(filterNameValue[b][1])
                            //console.log("FALSE")
                           // return false
                        }
                }
         }
        return result
    }

    checkShopBy(shopby)
    {
        var paginationCount=  this.getPaginationCount()
        var shopbycount=0
        switch(shopby)
        {
            case "Online only":
                for( var j=0;j<paginationCount;j++)
                {   
                    var shopbyelements = this.productShopOnline
                    shopbycount=shopbycount+shopbyelements.length
                    if(j<paginationCount-1 ) this.paginationMoreButton.click()
                }
            default:
                break
        }
        console.log("Shop by count :: "+shopbycount +" :: Result count value :"+filteredResultCountValue)
        if(shopbycount==filteredResultCountValue)
            return true
        else
            return false
    }

    checkPriceRange(priceList,lowRange,highRange)
    {
        for(var i=0;i<priceList.length;i++)
        {
            console.log("Price ::"+priceList[i])
            if (!(priceList[i]>lowRange && priceList[i]<highRange))
            {
                return false
            }
        }
        return true

    }

    getPaginationCount()
    {
        filteredResultCountValue=  this.getFilteredResultsCount()
        console.log("Pagination count :: "+Math.ceil(filteredResultCountValue/productCountPerPage))
        return Math.ceil(filteredResultCountValue/productCountPerPage)
    }

    splitFilterData(data)
    {
        var filters= data.split(";")
        console.log("DATA :::: "+filters)
        console.log("Filter size :::::: "+filters.length)
        var filterNameValue=[]
        for(var i=0;i<filters.length;i++){
            var temp = filters[i].split("=")[0].toString()
             var filterName=filters[i].split("=")[0].toString().replace("\"","")
             var filterValue=filters[i].split("=")[1].toString().replace("\"","")
             filterNameValue.push([filterName,filterValue])
             console.log("FILTERSSSS :::: "+i+" : "+ filterNameValue[i][0]+ " value :: "+filterNameValue[i][1])

        }

        return filterNameValue

    }
    
}

module.exports = new SearchResultsPage();
