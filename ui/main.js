function w3_open()
{
	document.getElementById("main").style.marginLeft = "25%";
	document.getElementById("mySidenav").style.width = "25%";
	document.getElementById("mySidenav").style.display = "block";
	document.getElementById("openNav").style.display = 'none';
}

function w3_close()
{
	document.getElementById("main").style.marginLeft = "0%";
	document.getElementById("mySidenav").style.display = "none";
	document.getElementById("openNav").style.display = "inline-block";
}
$(document).ready(function ()
{
	$('#particles').particleground(
	{
		minSpeedX: 0.1,
		maxSpeedX: 0.7,
		minSpeedY: 0.1,
		maxSpeedY: 0.7,
		directionX: 'center', // 'center', 'left' or 'right'. 'center' = dots bounce off edges
		directionY: 'center', // 'center', 'up' or 'down'. 'center' = dots bounce off edges
		density: 7000, // How many particles will be generated: one particle every n pixels
		dotColor: 'red',
		lineColor: 'blue',
		particleRadius: 7, // Dot size
		lineWidth: 1,
		curvedLines: false,
		proximity: 100, // How close two dots need to be before they join
		parallax: true,
		parallaxMultiplier: 5, // The lower the number, the more extreme the parallax effect
		onInit: function () {},
		onDestroy: function () {}
	});
});