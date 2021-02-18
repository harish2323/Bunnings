
module.exports ={
 expandAccordion(accordion)
{

    if(accordion.getAttribute("aria-expanded")=="false")
   {
        accordion.click()
    }
}
}


