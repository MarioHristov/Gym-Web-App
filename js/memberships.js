function showDiv(divId) {
    // Hide all divs
    document.getElementById('standard').style.display = divId === 'standard'? 'grid':'none';
    document.getElementById('premium').style.display = divId === 'premium'? 'grid':'none';
    document.getElementById('diamond').style.display = divId === 'diamond'? 'grid':'none';
  }
  
  // Show the first div by default
showDiv('standard');

var container = document.querySelector('.memberships-container');
var content = document.querySelector('.content-ul');

function updatePosition() {
  var containerWidth = container.offsetWidth;

  var shift = containerWidth >= 1390 ? (containerWidth - 1390) * 0.50 : 0;
  content.style.transform = 'translateX(' + shift + 'px)';
}

window.addEventListener('resize', updatePosition);
updatePosition();