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
		density: 6000, // How many particles will be generated: one particle every n pixels
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

function w3_open() {
    document.getElementById("mySidenav").style.display = "block";
}
function w3_close() {
    document.getElementById("mySidenav").style.display = "none";
}
