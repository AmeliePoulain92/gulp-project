// scrollTopShow
function scrollTopShow(args) {
    if ($(this).scrollTop() > args.scrollPosition) {
        args.elementToShowHide.fadeIn();
    } else {
        args.elementToShowHide.fadeOut();
    }
}
// END:scrollTopShow
