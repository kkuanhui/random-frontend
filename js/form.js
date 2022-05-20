function TextElement() {
  var $labelName = 'eee';

  var $container = $(`<div class="mb-3"></div>`);
  var $label = $(`<label for="title-input" class="form-label"></label>`);
  var $textarea = $(`<textarea type="text" class="form-control" placeholder="note something"></textarea>`);
  var $showcaseArea = $(`<pre></pre>`);

  $container.append($label, $textarea, $showcaseArea);

  $textarea.on("change", function () {
    $showcaseArea.text($textarea.val());
  });

  var method = {};

  method.appendTo = function (target) {
    $(target).append($container);
  };

  method.custom = function (settings) {
    $labelName = settings.labelName;
    $label.text($labelName)
  };

  method.getLabelName = function () {
    console.log($labelName)
  }

  method.getEle = function(){
    console.log($label.html())
  }

  return method;
}

var myEle = TextElement();
myEle.appendTo("#main");
