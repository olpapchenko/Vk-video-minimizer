(function () {
  

  var extension = function () {
  var MINIMIZE_TIMEOUT = 500,
      HIDE_FULLSCREEN_VIDEO_TIMEOUT = 50,
      ID_PREFIX_FOR_VIDEO = "page_video_inline_wrap";
      window.isEnabled = true;


  window.addEventListener("scroll", function() {

      var selector = document.querySelector("iframe[src^='https://www.youtube.com']");
      var trackElement = document.getElementsByTagName("embed")[0] || (selector);

    if(!trackElement || !isEnabled) {
      return;
    } else if(isInFocus(trackElement)) {
      // trackElement.getParentElement().removeAttribute("style");
    } else {
      var videoWrapper = searchInParentsById(trackElement, ID_PREFIX_FOR_VIDEO);
      
      if(!videoWrapper) {
        return;
      }
      
      var id = getVideoId(searchInParentsById(trackElement, ID_PREFIX_FOR_VIDEO).getAttribute("id"));
      window.showVideo(id, '', {autoplay: 1, queue: 1, addParams: { post_id: '' }}, null);
      
      setTimeout(function () {
        hideElements(["mv_box", "layer_bg"], true);
        document.body.style.overflow = "auto";
      }, HIDE_FULLSCREEN_VIDEO_TIMEOUT);
      
      setTimeout(function () {
        window.Videoview.minimize();
      }, MINIMIZE_TIMEOUT);

    }

  });

  var hideElements = function (classes, onlyFirst) {
    var hideElements = [];

    classes.forEach(function (curClass) {
      var elements = document.getElementsByClassName(curClass);
      
      if(elements.length == 0) {
        return;
      }

      if(onlyFirst) {
        hideElements.push(elements[0]);
      } else {
        hideElements = hideElements.concat(elements);
      }

    });

    hideElements.forEach(function (element) {
      element.style.display = "none";
    });
  }

  var searchInParentsById = function (element, idSelector) {
    var el = element;
    while(!(new RegExp(idSelector + ".*")).test(el.getAttribute("id"))) {
      el = el.parentElement;
      if (!el) {
        return;
      }
    }
    return el;
  }

  var getVideoId = function (source) {
    return source.replace(ID_PREFIX_FOR_VIDEO, "");
  }

  var getElemDistance = function ( elem ) {
      var location = 0;
      if (elem.offsetParent) {
          do {
              location += elem.offsetTop;
              elem = elem.offsetParent;
          } while (elem);
      }
      return location >= 0 ? location : 0;
  };

  function isInFocus (element) {
    var topElementOffset = getElemDistance(element),
        topBodyOffset = document.body.scrollTop;

      return topElementOffset >= topBodyOffset;
  }
}

var script = document.createElement("script");
var code = document.createTextNode("(" + extension.toString() + ")" + "()");
script.appendChild(code);
(document.body).appendChild(script);

chrome.runtime.onMessage.addListener(function(audioActive) {
  console.log("asd");
  var script = document.createElement("script");
  var code = document.createTextNode("isEnabled = " + audioActive);
  script.appendChild(code);
  (document.body).appendChild(script);
});

})();

// return showVideo('-57876954_171384320', 'e04d03293690667653', {autoplay: 1, queue: 1, addParams: { post_id: '-57876954_602086' }}, event);

// page_video_inline_wrap-57876954_171384320
