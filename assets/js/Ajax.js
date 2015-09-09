function Ajax(){
	function Stack(_max){
		this.max = _max;
		if(!this.max>0)
			this.max = 1;
		this.calls = 0;
		this.stack = new Array();
		this.push = function(request){
			console.log("Adding request to stack...");
			this.stack.push(request);
			this.ready();
		};
		this.pop = function(){
			if(this.stack.length>0){
				console.log("Sending request...");
				this.stack.pop().send();
			}
		};
		this.ready = function(){
			if(this.calls<this.max){
				this.pop();
				this.calls++;
			}
		};
		this.complete = function(){
			this.calls--;
			this.ready();
		};
		this.result = function(request){
			this.complete();
		};

	}
	//where pending requests are held
	this.stack = new Stack(5);

	this.request = function(ctx, url, callback){
		console.log("Creating a new request...");
		var request = (window.XMLHttpRequest) ?
			new XMLHttpRequest():
			new ActiveXObject("Microsoft.XMLHTTP");	
		request.open("GET", url, true);
		request.addEventListener("readystatechange", function(){
			this.stack.result(this);
		});

		request.stack = this.stack;
		this.stack.push(request);
	};
}

a = new Ajax();
for(var i=0; i<1000; i++)
	a.request(null, "../assets/img/Dyme-A-Duzin---IDELY.jpg", null);
