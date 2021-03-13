   
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
    navbar.removeClass("bg-transparent navbar-dark position-absolute top-0")
    navbar.addClass("bg-light navbar-light position-fixed material-shadow")
}

function setAbsoluteNavbarPos(navbar){
    navbar.removeClass("bg-light navbar-light position-fixed material-shadow")
    navbar.addClass("bg-transparent navbar-dark position-absolute top-0")
}