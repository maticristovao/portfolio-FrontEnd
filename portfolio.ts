let navLinks = document.getElementsByClassName('nav-link');

function giveDataContent(links:HTMLCollectionOf<Element>){
    for(let link of links){
        link.setAttribute('data-content', link.textContent!);
    }
}
giveDataContent(navLinks);


function bounce() {
    $(this).addClass('fa-bounce');
}
function notBounce() {
    $(this).removeClass('fa-bounce');
}
$('.fab').on('mouseenter', bounce);
$('.fab').on('mouseleave', notBounce);

let nav = document.querySelector('nav');
let navMenu = document.querySelector('#navbarSupportedContent');
let navToggler = document.querySelector('.navbar-toggler');
let mediaCollapse = document.querySelector('.dropdown-toggle');
let mediaMenu = document.querySelector('#media-menu');
function closeCollapse(e: JQuery.ClickEvent<Document, null, Document, Document>){
    if (!mediaMenu!.contains(e.target) && !$(e.target).is(mediaCollapse!) && mediaCollapse!.getAttribute('aria-expanded') === 'true' && mediaMenu!.classList.contains('show')){
        (<any>$(mediaMenu!)).collapse('hide');
        mediaCollapse!.setAttribute('aria-expanded', 'false');
    }
    if(!nav!.contains(e.target) && navToggler!.getAttribute('aria-expanded') === 'true' && navMenu!.classList.contains('show')){
        (<any>$(navMenu!)).collapse('hide');
        navToggler!.setAttribute('aria-expanded', 'false');
    }
}
$(document).click(function (e) {
    closeCollapse(e);
});
