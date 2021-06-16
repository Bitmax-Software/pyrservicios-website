	  AOS.init({
      duration: 1900,
      });
var elems = document.querySelectorAll('.m-carousel');
var instances = M.Carousel.init(elems,{duration:200});   

var offset = 80



$('.navbar-nav li a').click(function(event) {
  if ($(this).text() === 'Servicios' || $(this).text() === 'Clientes' )
    offset = 100
  if ($(this).text() === 'Contáctanos')
    offset = 40
  event.preventDefault();
  $($(this).attr('href'))[0].scrollIntoView();
  scrollBy(0, -offset);
});

$('.carousel').carousel({
  interval: 5000
});




(function initModal(){
  var triggers = document.querySelectorAll('a[modal]')
  

  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {opacity:0.5});
  addTriggerInstancesToModal(instances)(triggers)
})()

function addTriggerInstancesToModal(instances){
  const modals = {}
  instances.forEach((x)=>{
    const name = x.id
    modals[name] = x
   })
   return function (triggers){
    triggers.forEach(x=>{
      
      x.addEventListener('click',function(event){
         const name = x.getAttribute('modal')
         if(modals[name])modals[name].open()
      })
    })
   }
}

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
    const URL = "http://agile-shore-78050.herokuapp.com/mails"
    const name = $("#contact_name")
    const email = $("#contact_email")
    const phone = $("#contact_cel")
    const btn = $("#send_form")
    const description = $("#contact_msg")
    btn.prop("disabled",true)
    fetch(URL,{
      method:"POST", 
      cache:'no-cache',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        from:email.val(),
        msg: "Nombre Client: "+ name.val() + "\n" + "Numero: " + phone.val() + "\n"+ description.val()
      })
    })
    .then(x=>x.json())
    .then(x=>{M.toast({html: x.msg,classes:"good-toast"});btn.prop("disabled",false)})
    .catch(x=>{M.toast({html: x.msg,classes:"wrong-toast"});btn.prop("disabled",false)})


}

function disableSubmitButton(btn) {
  btn.prop("disabled",true);
  btn.text("Enviando mail ...")
}

function enableSubmitButton(btn){
  btn.prop("disabled",false);
  btn.text("Enviar")
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
    navbar.removeClass("navbar-light position-absolute top-0")
    navbar.addClass("bg-light navbar-light position-fixed material-shadow")
}

function setAbsoluteNavbarPos(navbar){
    navbar.removeClass("bg-light navbar-light position-fixed material-shadow")
    navbar.addClass("navbar-light position-absolute top-0")
}

const NavTabs = function(links){
   const targets = []
   links.forEach((x)=>{
     const self = this 
     const target = x.getAttribute("data-bs-target")
     const el = document.querySelector(target)
     targets.push({target,node:el,link:x})     
     x.addEventListener('click',(event)=>{
        self.show(target)
     })
   })

   this.show = function(target){
     const hiddens = targets.filter(x=>x.target !== target)
     const display = targets.find(x=>x.target === target)
     hiddens.forEach(x=>{
        this._hide(x)
     })
     this._show(display)
   }

   this._show = function(target){
     target.node.classList.add("active")
     target.link.classList.add("active")
   }
   this._hide = function(target){
     target.node.classList.remove('active')
     target.link.classList.remove('active')
    }
}

var tabs = document.querySelectorAll('#myTab li button')
new NavTabs(tabs)
