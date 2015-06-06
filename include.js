/*
 This file is executed inside WebKit and does
 the actual DOM manipulation.
 */
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
    var tag = elems[i].tagName;
    if(decoration == "underline"){
      if(tag == "U" || tag == "SPAN" || tag == "DIV" || tag == "INS"){ // It is safe to just replace the tag (ie: it carries no data)
        //elems[i].outerHTML = "<u>" + elems[i].innerHTML + "</u>";
        elems[i].outerHTML = "<u>" + elems[i].innerHTML + "</u>";
      }
      else {
        elems[i].outerHTML = "<u>" + elems[i].outerHTML + "</u>";
      }
    }
}
elems = [].slice.call(document.body.getElementsByTagName("*"));
for(i = 0; i < elems.length; i++){
  style = window.getComputedStyle(elems[i]);
  decoration = style.getPropertyValue('text-decoration');

  atts = elems[i].attributes;
  for (k = 0; k < atts.length; k++){
    if(retainedAttributes.indexOf(atts[k].name) == -1){
      elems[i].removeAttribute(atts[k].name);
    }
  }
  var newCSS = {};
  for(var j = 0; j <= style.length; j++){
    if(retainedCSS[style[j]] != null && style.getPropertyValue(style[j]) != retainedCSS[style[j]]) newCSS[style[j]] = style.getPropertyValue(style[j]);
  }
  elems[i].removeAttribute("style");

  if(Object.keys(newCSS).length > 0) elems[i].style = newCSS;
}
