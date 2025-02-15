function getFolders() {
    $.ajax({
        url: '/projects', // URL to fetch directories
        type: 'GET',
        dataType: 'json', // Expecting a JSON response
        success: function(directories) {
            console.log("Received directories:", directories);
            directories.forEach(function(dir) {
                loadContent("/projects/" + dir); // Call the loadContent function for each directory
            });
        },
        error: function(error) {
            console.error('Error fetching project folders:', error);
            alert("Error fetching project folders.");
        }
    });
}

function loadContent(path) {
    $.ajax({
        url: path + "/projects.html", // Path to the HTML content
        type: 'GET',
        success: function(data) {
            $(".best-projects").append(data); // Inject the content into the best-projects div
        },
        error: function(error) {
            console.error("Error loading content:", error);
            alert("Error loading project content.");
        }
    });
}

$(document).ready(function() {
    console.log("JavaScript Loaded with jQuery!");
    getFolders(); // Fetch the folders once the DOM is ready
});
