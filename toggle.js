/*var ins = document.getElementById("key");
var insdiv = document.getElementById("container");
//ins.setAttribute("style", "visibility: hidden;")

ins.onclick = function() {
    ins.toggleClass('hidden');
}*/

/*
       ins.onclick = function() {

           if (ins.style.opacity = "100%") {
               ins.style.opacity = "50%";
           } else {
               ins.style.opacity = "100%";
           }*/

//$("#key").click(function() {

//   $(this).toggleClass('hidden');

//});

window.addEventListener("keydown", toggle, false);

function toggle(k) {
    if (k.keyCode == "32") {
        $("#key").toggleClass('hidden');
    }
}