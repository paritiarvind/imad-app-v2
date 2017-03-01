 function init() {
   
    document.body.style.backgroundImage = "url('http://www.guoguiyan.com/data/out/210/68673984-walls-wallpapers.jpg')";
    document.body.style.backgroundRepeat = "repeat-n"; 
     }
function w3_open() {
  document.getElementById("main").style.marginLeft = "25%";
  document.getElementById("mySidenav").style.width = "25%";
  document.getElementById("mySidenav").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidenav").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}
                   