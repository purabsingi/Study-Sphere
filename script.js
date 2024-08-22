function filterSelection(category) {
  var cards = document.getElementsByClassName("product-card");
  if (category === "all") {
      category = "";
  }

  for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (card.className.indexOf(category) > -1) {
          card.style.display = "block";
      } else {
          card.style.display = "none";
      }
  }

  // Add active class to the clicked button
  var btns = document.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
      btns[i].className = btns[i].className.replace(" active", "");
  }
  event.currentTarget.className += " active";
}

// Default filter
filterSelection('all');