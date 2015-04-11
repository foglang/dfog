jQuery.fn.removeAttrExcept = function(attrs) {
    return this.each(function() {
        var attributes = $.map(this.attributes, function(item) {
            return item.name;
        });
        var element = $(this);
        $.each(attributes, function(i, item) {
            if(attrs.indexOf(item) == -1)
            element.removeAttr(item);
        });
    });
};
/*
    This file is executed inside WebKit and does
    the actual DOM manipulation.
 */
var usefulCSS = {"color": "rgb(0, 0, 0)"};

var elems = [].slice.call(document.body.getElementsByTagName("*"));
for(var i = 0; i < elems.length; i++){
    var style = window.getComputedStyle(elems[i]);
    var decoration = style.getPropertyValue('text-decoration');
    var tag = $(elems[i]).prop("tagName");
    if(decoration == "underline"){
        if(tag == "U" || tag == "SPAN" || tag == "DIV" || tag == "INS"){ // It is safe to just replace the tag (ie: it carries no data)
            elems[i].outerHTML = "<u>" + elems[i].innerHTML + "</u>";
        }
        else {
            $(elems[i]).wrap("<u></u>");
        }
    }
    $(elems[i]).removeAttrExcept([
        "style"
    ]);
    var newCSS = {};
    for(var j = 0; j <= style.length; j++){
        if(usefulCSS[style[j]] != null && style.getPropertyValue(style[j]) != usefulCSS[style[j]]) newCSS[style[j]] = style.getPropertyValue(style[j]);
    }
    $(elems[i]).removeAttr("style");
    if(Object.keys(newCSS).length > 0) $(elems[i]).css(newCSS);
}