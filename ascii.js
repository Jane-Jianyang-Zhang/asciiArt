


(function() {

    "use strict";
	
	var frame_index = 0;
	var timer = null;
	var textbox = null;
	var inprogress = false;
	var reversed = false;
	var time = 0;

	// sets up the event handlers on the page
	window.onload = function() {
		document.getElementById("stop").disabled = true;
		document.getElementById("start").onclick = animationStart;
		document.getElementById("stop").onclick = animationStop;
		document.getElementById("animation_list").onchange = selectAnimation;
		document.getElementById("size_list").onchange = selectSize;
		document.getElementById("speed").onchange = selectSpeed;
		document.getElementById("reverse").onchange = reverseOrder;
	};

	// called when mouse is clicked on "start button";
	// Start to display animation and set up a time display each frame in 
	// certain amount of time.
	// disable start button, and drop-down list of animation. Undisable stop button.
	function animationStart(){
		selectSpeed();
		inprogress = true;
		document.getElementById("stop").disabled = false;
		document.getElementById("animation_list").disabled = true;
		document.getElementById("start").disabled = true;
		textbox = document.getElementById("textbox").value;
		var textboxArray = textbox.split("=====\n");
		document.getElementById("textbox").value = textboxArray[0];
		timer = setInterval(move, time, textboxArray);
	}

	// called when animation starts and the timer went off. 
	// display one frame at a time. 
	function move(textboxArray){
		if(reversed === false){
			frame_index += 1;
		} else {
			frame_index-=1;
		}
		if( frame_index == -1){
			frame_index = textboxArray.length - 1;
		}
		if(frame_index == textboxArray.length){
			frame_index = 0;
		}
		document.getElementById("textbox").value = textboxArray[frame_index];
	}

	// called when mouse click on "reverse" checkbox;
	// change the order of the animation imediately when reverse is being clicked.
	function reverseOrder(){
		if(reversed === false){
			reversed = true;
		} else {
			reversed = false;
		}
	}

	// called when mouse click on "stop" button.
	// halts any animation in progress, the text that was in the box immediately 
	// before animation began is returned to the box
	// disable stop button and undisable "start" and "animation list"
	function animationStop(){
		if(inprogress !== false){
			inprogress = false;
			clearInterval(timer);
			document.getElementById("textbox").value = textbox;
			document.getElementById("animation_list").disabled = false;
			document.getElementById("start").disabled = false;
			document.getElementById("stop").disabled = true;
			frame_index = 0;
		}
	}

	// called dropdown list animation is changed.
	// it changes the animation in the textbox.
	// cannot be called when animation is in progresss.
	function selectAnimation(){
		var whichOne = document.getElementById("animation_list").value;
		document.getElementById("textbox").value = ANIMATIONS[whichOne];
	}

	// Called when drop-down list "size" is changed.
	// it change the size of the content in the text box immediately when called.
	// When client click on custom, it will prompt a box and allow client type in a font-size.
	function selectSize() {
		var sizeElement = document.getElementById("size_list").value;
		if(sizeElement == "custom"){
			sizeElement = prompt("Font size to use? (e.g. 10pt)");
		} else {
			sizeElement = sizeElement + "pt";
		}
		document.getElementById("textbox").style.fontSize =  sizeElement;
	}

	// called when speed is changed.
	// Change the speed of animation immediately when called.
	function selectSpeed(){
		var radios = document.getElementsByName("speed");
		for (var index = 0; index < radios.length; index++) {
			if(radios[index].checked === true){
				time = radios[index].value;
			}
		}
		if(inprogress === true){
			var textboxArray = textbox.split("=====\n");
			clearInterval(timer);
			timer = setInterval(move, time, textboxArray);
		}
	}
})();


	
