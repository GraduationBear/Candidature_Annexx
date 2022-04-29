window.onload=function(){
    //Appel de la fonction request pour affichier toute les tuiles par defaut
    request()

    //Appelle request a l'input de la barre de recherche
    var input = document.getElementById("recherche");
    input.addEventListener('input',request);

    //Appelle request quand le boutton recherche est cliqué
    var btnsearch = document.getElementById("btn");
    btnsearch.addEventListener('click',request);

    //On permet l'affichage du menu pour les mobiles
    const burger = document.querySelector(".burger");
    const navmenu = document.querySelector(".nav-list");
    burger.addEventListener("click",function (){
        burger.classList.toggle("active");
        navmenu.classList.toggle("active");
    })

    //Quand on clique sur un lien du menu, il s'enlève
    document.querySelectorAll(".nav-list li").forEach(n=> n.addEventListener("click",()=>{
        burger.classList.remove("active");
        navmenu.classList.remove("active");
    }))


    //Partie permettant l'affichage au defilement grâce aux observeurs
    const ratio = .1
    const options = {
        root : null,
        rootMargin : '0px',
        threshold: ratio
    }
    const handleIntersect = function (entries,observer){
        entries.forEach(function(entry) {
            if (entry.intersectionRatio > ratio) {
                entry.target.classList.add('reveal-visible')
                observer.unobserve(entry.target)
            }
        })
    }
    const observer = new IntersectionObserver(handleIntersect, options);

    document.querySelectorAll('[class*="reveal-"]').forEach(function(r){
        observer.observe(r)
    })

}


//fonction permettant la requête vers le fichier json et effectue le rendu HTML
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

//Fonction permettant le rendu de l'html lors de la recherche
function renderHTML(data,value){

    var content= document.getElementById("tuiles");
    content.innerHTML="";
    var str="";
    for(let i=0; i<data.length;i++){
        if(data[i].zone.toLowerCase().includes(value.toLowerCase()) || data[i].cp.toLowerCase().includes(value.toLowerCase())){
            str+="<div class='tuile'><p>Garde Meuble Toulouse "+data[i].zone+"</p><p>"+data[i].adresse+" "+data[i].cp+"</p><p>Tel :"+data[i].tel+"</p><p>"+data[i].horaire+"</p></div>";

        }
        content.innerHTML=str;
    }

}