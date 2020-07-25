import {fetchHome} from './api/home.js';
import {fetchTeams} from './api/teams.js';
import { favorites } from './api/favorite.js';

function loadNav() {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4){
			if(this.status !== 200) return;
			document.querySelectorAll(".topnav, .sidenav")
			.forEach(function(elm){
				elm.innerHTML = xhttp.responseText;
			});
			document.querySelectorAll('.sidenav a, .topnav a')
			.forEach(function(elm){
				elm.addEventListener('click', function(event){
					const sidenav = document.querySelector('.sidenav');
					M.Sidenav.getInstance(sidenav).close();
					const page = event.target.getAttribute('href').substr(1);
					loadPage(page);
				});
			});
		}
	};
	xhttp.open("GET", '/components/nav.html', true);
	xhttp.send();
}

function loadFooter(){
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4){
			var content = document.querySelector(".footer");
			if(this.status == 200) {
				content.innerHTML = xhttp.responseText;
			}
		}
	};
	xhttp.open("GET", '/components/footer.html', true);
	xhttp.send();
}

function loadPage(page) {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4){
			var content = document.querySelector(".body-content");
			if(this.status === 200) {
				content.innerHTML = xhttp.responseText;
				switch(page){
					case 'home' : fetchHome(); break;
					case 'teams' : fetchTeams(); break;
					case 'favorites' : favorites(); break;
					default: break;
				}
			} else if(this.status == 404) {
				content.innerHTML = `<div><p>Page Not Found.</p></div>`;
			} else {
				content.innerHTML = `<div>Page cant be accessed.</p></div>`;
			}
		}
	};
	xhttp.open("GET", '/pages/'+page+'.html', true);
	xhttp.send();
}

document.addEventListener('DOMContentLoaded', function(){
	const elems = document.querySelectorAll('.sidenav');
	M.Sidenav.init(elems);
	loadNav();
	loadFooter();
	let page = window.location.hash.substr(1);
	if(page === '') page = 'home';
	loadPage(page);
});