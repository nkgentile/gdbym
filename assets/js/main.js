"use strict";

function ajax(ctx,url,callback){
	var request = (window.XMLHttpRequest) ?
		new XMLHttpRequest():
		new ActiveXObject("Microsoft.XMLHTTP");
	request.open("GET",url,true);
	request.addEventListener("readystatechange", function(){
		//"OK"
		if(this.status === 200 && this.readyState === 4)
			callback.call(ctx, this);
		//"Page Not Found"
		else;
	}, false);
	request.setRequestHeader("Accept", "application/json");
	request.send();
	return request;
}

function Portfolio(){
	var request = ajax(
		this,
		"assets/json/projects.json",
		this.add
	),

	section = document.createElement("section");
	section.id = "portfolio";
	page.appendChild(section);

	return section;
}
Portfolio.prototype.add = function(xhr){
	var projects = JSON.parse(xhr.response),
	buffer = document.createDocumentFragment(),
	i;
	for(i=0; i<projects.length; i++)
		buffer.appendChild(this.project(projects[i]));
	portfolio.appendChild(buffer);
};

Portfolio.prototype.project = function(json){
	var p = document.createElement("div"),
	overlay = document.createElement("div"),
	info = document.createElement("div"),
	client = document.createElement("h3"),
	name = document.createElement("h2");

	p.className = "project";
	overlay.className = "overlay";
	info.className = "info";
	client.className = "client";
	name.className = "name";

	p.addEventListener("mouseover", function(){
		overlay.classList.toggle("active");
	}, true);
	p.addEventListener("mouseout", function(){
		overlay.classList.toggle("active");
	}, true);
	p.addEventListener("click", function(){
		Overlay.prototype.show(json);
	}, true);

	p.style.backgroundImage = 
		"url("+
		"assets/thumbs/"+
		json["image"]+
		")";

	client.innerHTML = json["client"];
	name.innerHTML = json["name"];

	p.appendChild(overlay);
	overlay.appendChild(info);
	info.appendChild(client);
	info.appendChild(name);

	return p;
};

function About(){
	var request = ajax(
		this,
		"assets/json/about.json",
		this.add
	),
	section = document.createElement("section");

	section.id = "about";

	page.appendChild(section);

	return section;
}

About.prototype.add = function(xhr){
	var team = document.createElement("div"),
	members = JSON.parse(xhr.response),
	buffer = document.createDocumentFragment(),
	i;
	
	team.id = "team";

	for(i=0; i<members.length; i++)
		buffer.appendChild(this.person(members[i]));
	team.appendChild(buffer);

	about.appendChild(team);
}
About.prototype.person = function(json){
	var p = document.createElement("div"),
	position = document.createElement("h3"),
	name = document.createElement("h2"),
	social = document.createElement("div"),
	i;

	p.className = "member";
	position.className = "position";
	name.className = "name";
	social.className = "social";
	
	position.innerHTML = json["position"];
	name.innerHTML = json["name"];

	for(i=0; i<json["social"].length; i++){
		var badge = document.createElement("a");
		badge.href = json["social"][i]["url"];
		badge.target = "_blank";
		badge.style.backgroundImage = 
			"url("+
			"assets/svg/"+
			json["social"][i]["badge"]+
			")";
		social.appendChild(badge);
	}
	
	p.appendChild(position);
	p.appendChild(name);
	p.appendChild(social);

	return p;
};

function Home(){
	var request = ajax(
		this,
		"assets/json/home.json",
		function(xhr){
			var json = JSON.parse(xhr.response),
			wrap = document.createElement("div"),
			blurb = document.createElement("div");

			section.style.backgroundImage = [
				"url(",
				"assets/img/",
				json["image"],
				")"
			].join("");

			wrap.id = "blurb-wrap";

			blurb.id = "blurb";
			blurb.innerHTML = json["blurb"];

			wrap.appendChild(blurb);
			section.appendChild(wrap);
		}
	),
	section = document.createElement("section"),
	header = new Header(section),
	gradient = document.createElement("div");

	section.id = "home";
	gradient.id = "gradient";

	page.appendChild(section);
	section.appendChild(gradient);

	return section;
}

function Header(ctx){
	var request = ajax(
		this,
		"assets/json/site.json",
		this.make
	);
	ctx.appendChild(this.element);
}
Header.prototype.element = document.createElement("header");
Header.prototype.make = function(xhr){
	var site = JSON.parse(xhr.response),
	logo = new Image(),
	social = document.createElement("div");

	logo.src = "assets/svg/"+site["logo"];
	logo.id = "logo";
	this.element.appendChild(logo);

	social.id = "social";
	this.element.appendChild(social);

	for(var i=0; i<site["social"].length; i++){
		var badge = document.createElement("a");
		badge.id = site["social"][i]["url"];
		badge.href = site["social"][i]["url"];
		badge.target = "_blank";
		social.appendChild(badge);
		badge.style.backgroundImage =
			"url("+
			"assets/svg/"+
			site["social"][i]["badge"]+
			")";
	}
};

function Page(){
	var page = document.createElement("div");
	page.id = "page";
	document.body.appendChild(page);
	return page;
}

function Overlay(info){
	var overlay = document.createElement("div");
	overlay.id = "overlay";
	page.appendChild(overlay);
	return overlay;
}
Overlay.prototype.show = function(json){
		var header = document.createElement("header"),
		nav = document.createElement("div"),
		arrow = new Image(),
		back = document.createElement("p"),
		logo = new Image(),
		slideshow = document.createElement("section"),
		article = document.createElement("article"),
		title = document.createElement("div"),
		client = document.createElement("h3"),
		name = document.createElement("h2"),
		credits = document.createElement("div"),
		buffer = new DocumentFragment(), i, current;

		document.body.style.overflow = "hidden";
		overlay.classList.toggle("active");
		overlay.innerHTML = null;

		overlay.appendChild(header);

		nav.className = "back";
		header.appendChild(nav);
		nav.addEventListener("click", function(){
			Overlay.prototype.hide();
		});

		arrow.src = "assets/svg/arrow.svg";
		nav.appendChild(arrow);

		back.innerHTML = "Back to Portfolio";
		nav.appendChild(back);

		logo.className = "logo";
		logo.src = "assets/svg/logo.svg";
		header.appendChild(logo);

		slideshow.className = "slideshow";
		slideshow.style.backgroundImage = 
			"url(assets/img/"+
			json["image"]+
			")";
		overlay.appendChild(slideshow);

		article.className = "info";
		overlay.appendChild(article);

		title.className = "title";
		article.appendChild(title);

		client.className = "client";
		client.innerHTML = json["client"];
		title.appendChild(client);

		name.className = "name";
		name.innerHTML = json["name"];
		title.appendChild(name);

		credits.className = "credits";
		overlay.appendChild(credits);

		for(i=0; i<json["crew"].length; i++){
			current = json["crew"][i];

			var credit = document.createElement("div");
			credit.className = "credit";
			buffer.appendChild(credit);

			var position = document.createElement("p");
			position.className = "position";
			position.innerHTML = current["position"];
			credit.appendChild(position);
			
			var person = document.createElement("p");
			person.className = "name";
			person.innerHTML = current["name"];
			credit.appendChild(person);
		}
		credits.appendChild(buffer);
};
Overlay.prototype.hide = function(){
	document.body.style.overflow = null;
	overlay.classList.toggle("active");
};

function Footer(){
	var request = ajax(
		this.html,
		"assets/json/site.json",
		function(xhr){
			var text = JSON.parse(xhr.response);
			for(var i=0; i<text["social"].length; i++){
				var social = document.createElement("a"),
				badge = new Image(),
				link = document.createElement("span");

				social.className = "social";
				social.href = text["social"][i]["url"];
				social.target = "_blank";
				footer.appendChild(social);

				badge.src = 
					"assets/svg/"+
					text["social"][i]["badge"];
				social.appendChild(badge);

				link.innerHTML = text["social"][i]["site"];
				social.appendChild(link);
			}
		}
	),
	wrap = document.createElement("div"),
	footer = document.createElement("footer");

	wrap.className = "footer-wrap";
	
	page.appendChild(wrap);
	wrap.appendChild(footer);

	return wrap;
}

function Press(){
	var request = ajax(
		this,
		"assets/json/media.json",
		function(xhr){
			var press = JSON.parse(xhr.response);
			for(var i=0; i<press.length; i++)
				this.add(press[i]);
		}
	),
	press = document.createElement("section"),
	marquee = document.createElement("h2");

	marquee.innerHTML = "Featured On";

	press.id = "press";

	page.appendChild(press);
	press.appendChild(marquee);

	return press;
}
Press.prototype.add = function(outlet){
	var badge = new Image();
	badge.className = "press";
	badge.src = "assets/svg/"+outlet["svg"];
	press.appendChild(badge);	
};

window.addEventListener("load", function(){
	var page = new Page(),
	overlay = new Overlay(),
	home = new Home(),
	about = new About(),
	press = new Press(),
	portfolio = new Portfolio(),
	footer = new Footer();
}, false);
