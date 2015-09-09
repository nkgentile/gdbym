function ajax(url, callback){
	var request = (window.XMLHttpRequest) ?
		new XMLHttpRequest():
		new ActiveXObject("Microsoft.XMLHTTP");
	request.callback = callback;
	return function(){
		request.open("GET", url, true);	
		request.addEventListener("readystatechange", function(){
			if(this.status === 200 && this.readyState === 4)
				this.callback();
		});
		request.setRequestHeader("Accept", "application/json");
		request.send();
	};
}

var Ajax = {
	get: function(element, url){
		var xhr = (window.XMLHttpRequest) ?
			new XMLHttpRequest():
			new ActiveXObject("Microsoft.XMLHTTP");

		xhr.open("GET", url, true);

		xhr.caller = this;
		xhr.target = element;

		var gif = new Image();
		gif.src = "assets/img/loading.gif";
		gif.className = "loading";
		xhr.loading = function(){
			element.innerHTML = "";
			element.appendChild(gif);
		};

		xhr.addEventListener("readystatechange", function(){
			if(this.status === 200 && this.readyState < 4)
				this.loading();
			if(this.status === 200 && this.readyState === 4)
				this.caller.display(this);
		});

		xhr.setRequestHeader("Accept", "application/json");
		xhr.send();

		return xhr;
	}
};

var Section = new Object({
	add: function(){
		var element = document.createElement("section");
		document.body.appendChild(element);
		Ajax.get.call(this, element, "assets/json/about.json");
	},
	display: function(xhr){
		xhr.target.innerHTML = xhr.responseText;
	}
});
