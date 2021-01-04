	
		var canvas = document.getElementById("snowing");
		var ctx = canvas.getContext("2d");
		var particlesOnScreen = 50;
		var particlesArray = [];
		var w,h;
		w = canvas.width = window.innerWidth;
		h = canvas.height = window.innerHeight;

		function random(min, max) {
			return min + Math.random() * (max - min + 1);
		};

		function clientResize(ev){
			w = canvas.width = window.innerWidth;
			h = canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", clientResize);

		function createSnowFlakes() {
			for(var i = 0; i < particlesOnScreen; i++){
				particlesArray.push({
					x: Math.random() * w,  
					y: Math.random() * h,  
					speedX: random(-2, 3),  
					speedY: random(4, 6),	
					radius:random(10, 25),
				})
			}
		};

		function drawSnowFlakes(){
			var imgSnow = document.getElementById("snow");
			for(var i = 0; i < particlesArray.length; i++){	
				ctx.beginPath(); 
				ctx.drawImage(imgSnow, particlesArray[i].x, particlesArray[i].y, particlesArray[i].radius, particlesArray[i].radius);
			}
		};

		function moveSnowFlakes(){
			for (var i = 0; i < particlesArray.length; i++) {
				particlesArray[i].x += particlesArray[i].speedX;	 
				particlesArray[i].y += particlesArray[i].speedY;	 

				if (particlesArray[i].y > h) {																			   
					particlesArray[i].x = Math.random() * w * 1.5;
					particlesArray[i].y = -50;
				}
			}
		};

		function updateSnowFall  () {
			ctx.clearRect(0, 0, w, h);
			drawSnowFlakes();
			moveSnowFlakes();
		};

		setInterval(updateSnowFall,50);
		createSnowFlakes();