var newListItem = document.createElement("li");

var navMenu = document.querySelector(".nav-menu");

newListItem.innerHTML = localStorage.getItem('jwtLoginToken') != null ? '<a href="/html_pages/user_profile.html"><i class="fa-solid fa-circle-user" style="color: #FFFFFF;"></i></a>' : '<a href="/html_pages/login&register.html">Create a profile</a>';

navMenu.appendChild(newListItem);