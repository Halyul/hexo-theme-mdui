console.info("\u7248\u6743\u6240\u6709\uff0c\u7ffb\u7248\u5fc5\u7a76\uff01\u000d\u000a\u0043\u006f\u0070\u0079\u0072\u0069\u0067\u0068\u0074\u0020©\u0020\u0032\u0030\u0031\u0037\u0020\u0048\u0061\u006c\u0079\u0075\u006c");
$(document).ready(function() {
    $('a').smoothScroll();
});
outdatedBrowser({
    bgColor: '#f25648',
    color: '#ffffff',
    lowerThan: 'transform',
    languagePath: ''
});
$(".contact-me-button").hover(function() {
    $(this).removeClass("mdui-typo-caption-opacity");
}, function() {
    $(this).addClass("mdui-typo-caption-opacity");
});
var img = $("#backgroundImg");
$(window).scroll(function() {
    var imgMaxOffset = img.height() - img.parent().height();
    var scrollHeight = $(document).scrollTop();
    var maxScrollHeight = $(document).height() - $(window).height();
    var scroll = scrollHeight / maxScrollHeight;
    img.css("transform", "translateY(" + imgMaxOffset * scroll * -1 + "px)")
});
var flag = false;
var x = 0;
$(window).scroll(function() {
    var x = $(".style-1-card-actions").offset().top - $(document).scrollTop();
    if (x < 0) {
        if (!flag) {
            $('#mdui-appbar').removeClass('mdui-hidden');
            flag = true;
        }
    } else if (flag) {
        $('#mdui-appbar').addClass('mdui-hidden');
        flag = false;
    };
});
