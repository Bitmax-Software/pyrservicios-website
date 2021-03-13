   
const navbar = $("nav")

    var forms = document.getElementsByClassName('needs-validation')
    
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        
        event.preventDefault();
        if (form.checkValidity() === false) {
           
          event.stopPropagation();
          form.classList.add('was-validated');
        }else{
           
            sendEmail()
            form.classList.remove('was-validated');
            $("form")[0].reset()
        }
       
      }, false);})


function sendEmail(){
    const name = $("#contact_name")
    const email = $("#contact_email")
    const phone = $("#contact_cel")
    const description = $("#contact_msg")
   
    Email.send({
        SecureToken : "cd6ff455-9bf1-4109-90f0-7e24530a9a64",
        To : 'JoseMoWa@gmail.com',
        From : email.val(),
        Subject : "Consulta de solicitud de servicios PyR de "+ name.val(),
        Body : getPhone(phone) + description.val()
    }).then(
      message => alert(message)
    );
}

window.addEventListener("scroll",function(){
    const offset = Math.max( $("html").scrollTop(), $("body").scrollTop() )
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

function getPhone(phone){
    return (!!phone.text()) ? "Número de contacto: " + phone.text() + "\n" : "" 
}