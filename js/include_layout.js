function includeLayout() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        // Inject the layout content into the page
        document.getElementById('layout-container').innerHTML = xmlhttp.responseText;
        
        // Call a function to fill the dynamic content for Page 1
        fillContent(document.title);
        addScript('/GymWebApp/js/gallery.js');
      }
    };
    xmlhttp.open('GET', 'http://localhost:8080/GymWebApp/html_pages/layouts/location_page_layout.html', true);
    xmlhttp.send();
  }
  // Call the function to include the layout file
  includeLayout();