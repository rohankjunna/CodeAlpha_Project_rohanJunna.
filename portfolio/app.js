let nav =document.querySelector("nav");
let scrollbtn= document.querySelector(".scroll-button a");
let val;
window.onscroll =function(){
    if(document.documentElement.scrollTop >40){
        nav.classList.add("sticky");
        scrollbtn.Style.display ="block";
    }else{
        nav.classList.remove("sticky");
        scrollbtn.Style.display ="block";
    }
}