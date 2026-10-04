const projectCollections = {
	bestProjects: [
		{
			title: 'Crowd Maker (Unity Tool)',
			description: 'Crowd Maker is a tool developed for Unity with the objective of helping developers create crowds on their own games.',
			image: 'best-projects/crowd maker/vSGIKI.png',
			content: 'best-projects/crowd maker/content.html'
		},
		{
			title: 'Binger Ninja',
			description: "Binger Ninja is a 2D isometric action RPG in which the player controls an overweight ninja who's sole goal is to get to the top of the tower to save Tadashi's daughter.",
			image: 'best-projects/binger ninja/MtptaJ.png',
			content: 'best-projects/binger ninja/content.html'
		},
		{
			title: 'Race Game (DirectX)',
			description: 'This demo was created as part of a university project, in it, my objective was to explore the DirectX11 SDK and try to make a game from the ground up.',
			image: 'best-projects/race game/Screenshot 2022-09-11 223625.png',
			content: 'best-projects/race game/content.html'
		}
	],
	projects: [
		{
			title: 'Betting Game (SDL)',
			description: 'Simple game using C++ with SDL where the objective is for the player to bet points on the colour with the most amount.',
			image: 'projects/betting game (sdl)/Screenshot 2022-01-31 231458.png',
			content: 'projects/betting game (sdl)/content.html'
		},
		{
			title: 'Paladin',
			description: 'In this game, you control a paladin trying to escape from a cave full of monsters.',
			image: 'projects/paladin/Print/2.png',
			content: 'projects/paladin/content.html'
		},
		{
			title: 'Photon Project',
			description: 'In this demo, I explored a tool in Unity named Photon. This tool lets me connect players with each other creating an online experience.',
			image: 'projects/photon project/Picture1.png',
			content: 'projects/photon project/content.html'
		}
	]
};

function renderProjectCards(projects, selector) {
	const container = document.querySelector(selector);
	if (!container) {
		return;
	}

	container.innerHTML = projects.map((project) => {
		const safeImage = encodeURI(project.image);
		const safeContent = encodeURI(project.content);

		return `
			<div class="projects">
				<div class="projects-image">
					<img src="${safeImage}" alt="${project.title}">
				</div>
				<div class="projects-text">
					<h2>${project.title}</h2>
					<p>${project.description}</p>
					<button type="button" class="button-basic" onclick="createContainer('${safeContent}')">Read more</button>
				</div>
			</div>
		`;
	}).join('');
}

$(document).ready(function() {
	renderProjectCards(projectCollections.bestProjects, '.best-projects-container');
	renderProjectCards(projectCollections.projects, '.projects-container');
});

$.fn.shadow = function() {
	return this[0].shadowRoot || this[0].attachShadow({ mode: "open" });
}

function createContainer(file){
	var body = document.getElementsByTagName("body")[0],
		veil = document.createElement("div"),
		container = document.createElement("div");

	veil.id = "veil";
	veil.onclick = function() {exitConainer()};
	$(body).append(veil);

	veil.style.display = 'block'; // Show the veil
	body.classList.add('lock-scroll'); // Lock scrolling


	container.id = "container";
	$(body).append(container);

	fetch(file)
		.then(response => response.text())
		.then(data => {
			// Inject the file content into the shadow root
			$(container).shadow().innerHTML = data;
		})
		.catch(err => console.error("Error loading file:", err));
}

function exitConainer() {
	var container   = document.getElementById("container"),
		veil        = document.getElementById("veil"),
		body        = document.getElementsByTagName("body")[0];

	$(container).remove();
	$(veil).remove();
	body.classList.remove('lock-scroll');
}

function scrollGallery(amount) {
	document.getElementById('container').shadowRoot.getElementById('imageGallery').scrollBy({ left: amount, behavior: 'smooth' });
}

function scrollWithOffset(id, offset) {
	const element = document.getElementById(id);
	const yOffset = -offset; // move 50px above the element
	const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
	window.scrollTo({ top: y, behavior: 'smooth' });
  }

function setTheme(isDark) {
	const themeToggle = document.getElementById('theme-toggle');
	const themeIcon = themeToggle.querySelector('.theme-toggle-icon');

	document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
	themeToggle.setAttribute('aria-pressed', String(isDark));
	themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
	themeIcon.textContent = isDark ? '☀' : '☾';
}

$(document).ready(function() {
	const themeToggle = document.getElementById('theme-toggle');
	setTheme(false);
	themeToggle.addEventListener('click', function() {
		setTheme(document.documentElement.dataset.theme !== 'dark');
	});
});
