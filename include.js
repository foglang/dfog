/*
 This file is executed inside WebKit and does
 the actual DOM manipulation.
 */
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
    List of element attributes which should be
    retained in source code.
 */
var retainedAttributes = [
    "style"
];
/*
    List of CSS properties and which should
    be retained and their default values. If
    a property is set to the default, it will
    NOT be retained.
 */
var retainedCSS = {
    "color": "rgb(0, 0, 0)",
    "background-color": "rgba(0, 0, 0, 0)"
};
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
    $(elems[i]).removeAttrExcept(retainedAttributes);
    var newCSS = {};
    for(var j = 0; j <= style.length; j++){
        if(retainedCSS[style[j]] != null && style.getPropertyValue(style[j]) != retainedCSS[style[j]]) newCSS[style[j]] = style.getPropertyValue(style[j]);
    }
    $(elems[i]).removeAttr("style");
    if(Object.keys(newCSS).length > 0) $(elems[i]).css(newCSS);
}