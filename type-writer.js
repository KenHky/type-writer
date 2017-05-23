(function() {
  'use strict';

  // base css
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = "@keyframes typing { from { width: 0 } } @keyframes caret { 50% { border-right-color: inherit; } } .typist { width: 0; white-space: nowrap; overflow: hidden; border-right: .05em solid transparent; }";
  document.head.appendChild(css);

  // compatibility
  function whichAnimationEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var animations = {
      'animation':'animationend',
      'OAnimation':'oAnimationEnd',
      'MozAnimation':'animationend',
      'WebkitAnimation':'webkitAnimationEnd'
    }

    for(t in animations){
      if( el.style[t] !== undefined ){
        return animations[t];
      }
    }
  }
  var animationEvent = whichAnimationEvent();

  // check chinese
  function checkByCode(s){
    return s.charCodeAt()>255 ? true : false;
  }


  function startAnimate (domArray) {
    var typeDom = domArray.shift()
    var textLength = typeDom.innerText.length
    // check chinese or not
    var chineseType = checkByCode(typeDom.innerText)
    // add animate
    typeDom.style.width = textLength + (chineseType ? 'em' : 'ch');
    typeDom.style.animationName = 'typing, caret';
    typeDom.style.animationIterationCount = '1, infinite';
    typeDom.style.animationDuration = textLength / 5 + 's, 1s';
    typeDom.style.animationTimingFunction = 'steps(' + textLength + '), steps(1)';

    animationEvent && typeDom.addEventListener(animationEvent, function() {
      if (domArray.length) {
        typeDom.removeEventListener(animationEvent,function(){},true);
        // clear animate
        typeDom.style.animationPlayState= 'paused';
        typeDom.style.animationName = '';
        typeDom.style.animationIterationCount = '';
        typeDom.style.animationDuration = '';
        typeDom.style.animationTimingFunction = '';
        startAnimate(domArray)
      }         
    }, false);
  }

  window.onload=function(){
    var domArray = []
    var typist = document.querySelectorAll(".typist");
    for (var i = 0; i < typist.length; i++) {
      domArray.push(typist[i])
    }
    startAnimate(domArray)
  }
})();