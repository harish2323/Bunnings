// This file is used to process the commandline parameter and assign them to variables.

module.exports =
{
   tags:gettags()  //extracting the tag parameter from the commandline
}

function gettags()
{
    var temp_tags=process.argv.slice();
    var tt=process.argv.toString()
    if(process.argv.toString().includes("tags"))
    {
       for(param of temp_tags)
       {
           if(param.toString().includes("tags"))
           {
            var temp= param.split("=")[1].toString()
            temp=temp.replace(","," or ")
           // temp=temp.replace("&"," and ")
            return temp
           }
       }      
  
       
    }
    return ' '
}

