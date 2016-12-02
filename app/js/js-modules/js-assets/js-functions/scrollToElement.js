// scrollToElement
function scrollToElement(args) {
    if (args.elementScrollTo) {
        $('html, body').animate({
            scrollTop: args.elementScrollTo.offset().top - args.offset
        }, args.speed);
    }
}
// END:scrollToElement
