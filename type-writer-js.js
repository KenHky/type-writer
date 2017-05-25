(function() {
  'use strict';

  function startAnimate (domArray, textArray) {
    var typeDom = domArray.shift()
    var text = textArray.shift()
    var n = 0
    var print = setInterval(function () {
      n += 1
      typeDom.innerHTML = text.substring(0, n)
      if (n === text.length) {
        window.clearInterval(print)
        startAnimate(domArray, textArray)
      }
    }, 150)
  }

  window.onload = function(){
    var domArray = []
    var textArray = []
    var typist = document.querySelectorAll(".typist");
    for (var i = 0; i < typist.length; i++) {
      textArray.push(typist[i].textContent)
      typist[i].innerHTML = ''
      domArray.push(typist[i])
    }
    startAnimate(domArray, textArray)
  }
})();