//Closure that returns a prepared AJAX request function
function ajax(url){
	var request = (window.XMLHttpRequest) ?
		new XMLHttpRequest():
		new ActiveXObject("Microsoft.XMLHTTP");
	request.callback = Model.prototype.add;
	console.log(Model.prototype.add);
	return function(){
		request.open("GET", url, true);	
		request.addEventListener("readystatechange", function(){
			if(this.status === 200 && this.readyState === 4)
				console.log(this.callback);
		});
		request.setRequestHeader("Accept", "application/json");
		request.send();
	};
}

//Closure that returns a prepared HTML tag-creator function
function html(attributes){
	var element;
	if(!attributes)
		element = document.createElement("div");
	else{
		element = document.createElement(
			(attributes["tag"] || "div")
		);
		element.id = attributes["id"] || "";
		element.className = attributes["class"] || "";
		element.innerHTML = attributes["inside"] || "";
		element.src = attributes["src"];
		element.href = attributes["href"];
		element.target = attributes["target"];
		if(attributes["parent"])
			attributes["parent"].appendChild(element);
		}
	return element;
}

function Section(){
}

function Model(){
	this.get();
}
Model.prototype.get = ajax(
	"assets/json/home.json",
	"assets/json/about.json",
	"assets/json/projects.json"
);
Model.prototype.add = function(){
	console.log(this);
	if(!Model.prototype.sections)
		Model.prototype.sections = new Array();	
	Model.prototype.sections.push(new Section(this));
};
function View(){}
function Controller(){}
model = new Model();
view = new View();
controller = new Controller();
