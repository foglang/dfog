var page = require('webpage').create();

page.open('some.html', function() {
    console.log(page.evaluate(function() {
        var e = document.getElementById('some');
        var style = window.getComputedStyle(e);
        var decoration = style.getPropertyValue('font-weight');
        return decoration;
    }));
    page.render('screencap.png');
    phantom.exit();
});
