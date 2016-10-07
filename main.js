/**
 * Created by sgandhi on 10/3/16.
 */
var sortDirection = "asc";
var originalData;
function loadJsonData(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            originalData = this.responseText;
            dispData();
        }
    }
    xhttp.open("GET","data.json",true);
    xhttp.send();
}

function sortData(){
    if(sortDirection == "asc"){
        sortDirection = "desc"
    }
    else{
        sortDirection = "asc"
    }
    dispData();
    console.log("hhhhhhoooooo")
}
//function to display all block information through js
function dispData(){
    //converts string data to JSON array.
    var data = JSON.parse(originalData);
    console.log(data);
    //sort titlewise
    function sortOn(property, direction){
        return function(a, b){
            if(a[property].toUpperCase() < b[property].toUpperCase()){
                if (direction == "asc")
                return -1;
                else
                return 1;
            }else if(a[property].toUpperCase() > b[property].toUpperCase()){
                if (direction == "asc")
                    return 1;
                else
                    return -1;
            }else{
                return 0;
            }
        }
    }
    data.sort(sortOn("title",sortDirection));
    console.log(data);
    document.getElementById("content").innerHTML="";

    for(var i = 0; i< data.length; i++) {
        if(data[i].is_published===true) {

            var mainDiv = document.createElement('div');
            mainDiv.className = "mainDiv";

            var imgSec = document.createElement('img');
            imgSec.className = "imgSec";
            imgSec.setAttribute("src", "images/" + data[i].image_name);
            mainDiv.appendChild(imgSec);

            var divTitle = document.createElement('div');
            divTitle.className = "divTitle";
            var textnode = document.createTextNode(data[i].title);
            divTitle.appendChild(textnode);
            var breakLine1 = document.createElement('br');
            divTitle.appendChild(breakLine1);

            var imgName = document.createTextNode(data[i].image_name);

            divTitle.appendChild(imgName);
            mainDiv.appendChild(divTitle);

            //horizontal line
            var divider =  document.createElement('hr');
            mainDiv.appendChild(divider);

            var divDesc = document.createElement('div');
            divDesc.className = "divDesc";
            var discnode = document.createTextNode(data[i].description);
            var breakLine = document.createElement('br');
            //icon appending
            var icons = document.createElement('i');
            icons.className ="material-icons";
            var fav = document.createTextNode("favorite");
            var grade1 = document.createTextNode("grade");
            icons.appendChild(fav);
            icons.appendChild(grade1);
            divDesc.appendChild(discnode);
            divDesc.appendChild(breakLine);
            divDesc.appendChild(icons);
            mainDiv.appendChild(divDesc);

            //this will attach to body of the
            var rightDiv = document.getElementById("content");
            rightDiv.appendChild(mainDiv);
        }//end of if condition
    }//end for loop
}//function ends
loadJsonData();
