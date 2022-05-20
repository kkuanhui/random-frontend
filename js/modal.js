/**

# Right way to construct JS UI object.
This example exam how to construct modularized JS UI object conrrectly.
The right way to use jQuery.

# Todo list
- [ ] Find out what is jQuery ready really means?
- [ ] Learn sign "$" convention.

# Referrence
- http://www.jacklmoore.com/notes/jquery-modal-tutorial/

*/

var modal = (function(){
  // Prefix $ means this variable is private, 
  // but it's accessible from the outside acctually.
  
  // There are 4 target elements on the template.
  var $overlay 
  var $modal 
  var $content 
  var $close 
 
  // Generate UI
  $overlay = $('<div id="overlay"></div>');
  $modal = $('<div id="modal"></div>');
  $content = $('<div id="content"></div>');
  $close = $('<a id="close" href="#">close</a>');

  $modal.append($content, $close)
  $modal.hide()
  $overlay.hide()

  $close.click(function(e){
    e.preventDefault()
    method.close()
  })

  $(document).ready(function(){
    $('body').append($overlay, $modal)
  })

  // There are 3 public methods, 
  // open, close, center.
  var method = {}

  // center the modal in the viewport
  method.center = function(){
    var top, left
    top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2
    left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2
    $modal.css({
      top: top + $(window).scrollTop(),
      left: left + $(window).scrollLeft()
    })
  }

  // Use object to input is a very beautiful way and easy to scale.
  method.open = function(settings){
    $content.empty().append(settings.content)
    $modal.css({
      width: settings.width || 'auto',
      height: settings.height || 'auto'
    })
    method.center()
    $(window).bind('resize.modal', method.center)
    $modal.show()
    $overlay.show()
  }

  // close the modal
  method.close = function(){
    $modal.hide()
    $overlay.hide()
    $content.empty()
    $(window).unbind('resize.modal')
  }

  return method

})();

$(document).ready(function(){
  $('a#howdy').click(function(e){
    modal.open({content: "Hows it going?"})
    e.preventDefault()
  })
})
