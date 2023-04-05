$("#menu-toggle").click(function(e) {
    e.preventDefault();
    /* if (document.getElementById("'menu-toggle").textContent == "Close") {
         document.getElementById("menu-toggle").innerHTML = "Contests";
     } else {
         document.getElementById("menu-toggle").innerHTML = "Close";
     }*/
    $("#wrapper").toggleClass("toggled");

});