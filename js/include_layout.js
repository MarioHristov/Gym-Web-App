
function callFunctions(...functions) {
  functions.forEach((func) => {
    func();
  });
}


function includeLayout() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        // Inject the layout content into the page
        document.getElementById('layout-container').innerHTML = xmlhttp.responseText;
        
        // Call a function to fill the dynamic content for Page 1
        fillContent(document.title);
        addScript('/js/gallery.js');
      }
    };
    xmlhttp.open('GET', 'http://localhost:8080/html_pages/layouts/location_page_layout.html', true);
    xmlhttp.send();
  }

  function includeNavBar() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        // Inject the layout content into the page
        document.getElementById('navbar-container').innerHTML = xmlhttp.responseText;
        addScript("/GymWebApp/js/navbar.js");
      }
    };
    xmlhttp.open('GET', 'http://localhost:8080/GymWebApp/html_pages/layouts/navbar.html', true);
    xmlhttp.send();
  }

  function includeFooter() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        // Inject the layout content into the page
        document.getElementById('footer-container').innerHTML = xmlhttp.responseText;
      }
    };
    xmlhttp.open('GET', 'http://localhost:8080/GymWebApp/html_pages/layouts/footer.html', true);
    xmlhttp.send();
  }