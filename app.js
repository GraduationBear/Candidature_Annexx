window.onload=function(){
    request()
    var input = document.getElementById("recherche");
    input.addEventListener('change',request);

    var btnsearch = document.getElementById("btn");
    btnsearch.addEventListener('click',request);

}

function request(){
    var input = document.getElementById("recherche");
    var httprequest = new XMLHttpRequest();
    httprequest.open('GET','magasins.json');
    httprequest.onload = function (){
        var data = JSON.parse(httprequest.responseText);
        console.log(input.value)
        renderHTML(data,input.value)
    };
    httprequest.send();
}


function renderHTML(data,value){
    var input = document.getElementById("recherche");
    var content= document.getElementById("tuiles");
    content.innerHTML="";
    var str="";
    for(let i=0; i<data.length;i++){
        if(data[i].zone.toLowerCase().includes(value.toLowerCase()) || data[i].cp.toLowerCase().includes(value.toLowerCase())){
            str+="<div class='tuile'><p>Garde Meuble Toulouse "+data[i].zone+"</p><p>"+data[i].adresse+" "+data[i].cp+"</p><p>Tel :"+data[i].tel+"</p><p>"+data[i].horaire+"</p></div>";
            console.log(str);
        }
        content.innerHTML=str;
    }

}