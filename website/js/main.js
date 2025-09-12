function getFolders(path, container) {
	$.ajax({
		url: path, // URL to fetch directories
		type: 'GET',
		dataType: 'json', // Expecting a JSON response
		success: function(directories) {
			directories.forEach(function(dir) {
				loadContent('/' + path + '/' + dir, container); // Call the loadContent function for each directory
			});
		},
		error: function(error) {
			console.error('Error fetching project folders:', error);
			alert("Error fetching project folders.");
		}
	});
}

function loadContent(path, container) {
	$.ajax({
		url: path + "/projects.html", // Path to the HTML content
		type: 'GET',
		success: function(data) {
			$(container).append(data); // Inject the content into the best-projects div
		},
		error: function(error) {
			console.error("Error loading content:", error);
			alert("Error loading project content.");
		}
	});
}

$(document).ready(function() {
	getFolders('list/best-projects', ".best-projects-container");
	getFolders('list/projects', ".projects-container");
});

$.fn.shadow = function() {
	return this[0].shadowRoot || this[0].attachShadow({ mode: "open" });
}

function createContainer(file){
	console.log("creating a container");

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