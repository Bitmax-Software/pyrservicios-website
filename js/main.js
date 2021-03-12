   
const navbar = $("nav")
window.addEventListener("scroll",function(){
    const offset = Math.max( $("html").scrollTop(), $("body").scrollTop() )
    console.log(offset)
    if (offset == 0) {
        setAbsoluteNavbarPos(navbar)
    }else{
       setFixedNavbarPos(navbar)
    } 
})

function setFixedNavbarPos(navbar){
    navbar.removeClass("position-absolute top-0")
    navbar.removeClass("navbar-dark")
    navbar.removeClass("bg-transparent")
    navbar.addClass("bg-light")
    navbar.addClass("navbar-light")
    navbar.addClass("position-fixed")
}

function setAbsoluteNavbarPos(navbar){

    navbar.removeClass("position-fixed")
    navbar.removeClass("navbar-light")
    navbar.removeClass("bg-light")
    navbar.addClass("bg-transparent")
    navbar.addClass("navbar-dark")
    navbar.addClass("position-absolute top-0")
}