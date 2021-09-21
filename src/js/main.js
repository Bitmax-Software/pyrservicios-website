import "./isotipe.js"
import "./boostrap/bootstrap.bundle.js"
import "./materialize.js"
import AOS from "./aos.js"
import "./splide.js"
import "../css/main.css"


var jQueryBridget = require('jquery-bridget');
var Isotope = require('isotope-layout');
jQueryBridget( 'isotope', Isotope, $ );

var elems = document.querySelectorAll('.m-carousel');
const MD_SIZE = 900
const SMALL_SIZE = 750


var clientCarouselHtml = document.querySelectorAll('.client-carousel')

const splide = new Splide( '.splide-ourwork',{perPage: getWindowsWidth() > SMALL_SIZE ? 4 : 1,rewind:false,perMove:1} ).mount();
const splide2 = new Splide( '.splide-clients',{perPage: getWindowsWidth() > SMALL_SIZE ? 1 : 1,rewind:false,perMove:1,arrows:false} ).mount();

$(window).resize(function() {
  splide.options= {
    rewind:false,
    perMove:1,
    perPage:getWindowsWidth() > SMALL_SIZE ? 4 : 1
  }
  splide2.options= {
    rewind:false,
    perMove:1,
    perPage:getWindowsWidth() > SMALL_SIZE ? 1 : 1
  }
});

AOS.init({
  duration: 1800,
  });
/* console.log(clientCarouselHtml)
var clientCarousel = M.Carousel.init(clientCarouselHtml,{duration:200}) */



var instances = M.Carousel.init(elems,{duration:200,indicators:true});



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


function getWindowsWidth(){
  return window.outerWidth
}

/*START CASOS DE EXITO JS*/

$(function(){
  var $container = $('#container44');
  $container.isotope({
      itemSelector : '.element',
      filter: '.ransa'
  });

  $('#filters a').click(function(){
      var selector = $(this).attr('data-filter');
      $container.isotope({ filter: selector });
      return false;
  });
});



/*END CASOS DE EXITO JS*/

/* 
(function initModal(){

  var useCaseModals = M.Modal.init(document.querySelectorAll('.modal-case'),{})
  
  var useCasesCards = document.querySelectorAll('.use-case-card')
  useCasesCards.forEach(x=>{
    const ref = x.getAttribute("ref")
    const modal = useCaseModals.find(m=>{
      console.log(m.el.getAttribute("modal-ref") +", "+ ref)
      return m.el.getAttribute("modal-ref").includes(ref)
    } )
    
    x.addEventListener('click',function(){
      if (modal)
        modal.open()
    })
  })

})() */



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
    fetch("/php/mail.php",{
      method:"POST", 
      cache:'no-cache',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name:name.val(),
        email:email.val(),
        phone:phone.val(),
        message:description.val()
        /* from:email.val(),
        msg: "Nombre Client: "+ name.val() + "\n" + "Numero: " + phone.val() + "\n"+ description.val() */
      })
    })
    .then(x=>{
      if(x.ok){
        M.toast({html: "Gracias por contactarnos!",classes:"good-toast"});
        btn.prop("disabled",false)
        return
      } 
      M.toast({html: "Tuvimos un problema al recibir tu mensaje. Intentelo de nuevo",classes:"wrong-toast"});btn.prop("disabled",false)   
    })
    .catch(x=>{console.log(x);M.toast({html: "Tuvimos un problema al recibir tu mensaje. Intentelo de nuevo",classes:"wrong-toast"});btn.prop("disabled",false)})


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

const Indicator = function (i,callback){
  const index = i
  const node = document.createElement("i")
  node.classList.add("bi","bi-circle-fill","mx-2","use-case-paginator")
  node.style = "font-size:.95em;z-index:2"
  node.addEventListener('click',function(){
    callback(index)
  },false)
  this.getNode = function(){
    return node;
  }
  this.onClick = function(_callback){
    node.addEventListener('click',function(){
      _callback(index)
    })
  }
  this.activate = function(){
    node.classList.add("paginator-active")
  }
  this.disable = function(){
    node.classList.remove("paginator-active")
  }
}

const IndicatorManager = function(quantity,callback){
  const indicators = []
  const indicatorContainer = document.createElement("div")
  indicatorContainer.style= "display:flex;flex-flow: row;justify-content:center"
  let self = this
  for (let i = 0; i < quantity; i++) {
    indicators.push(new Indicator(i,callback)) 
  }

  indicators[0].activate()

  for (const i of indicators) {
    i.onClick(function(index){
      self.showCurrent(index)
    })
  }

  for (const indicator of indicators) {
    indicatorContainer.appendChild(indicator.getNode())
  }

  this.showCurrent = function(index){
    for (let i = 0; i < indicators.length; i++) {
      const element = indicators[i];
      element.disable()
    }
    indicators[index].activate()
  }

  this.getNode = function(){
    return indicatorContainer
  }

}

const Paginator = function(target){

  const containers = target.children[0]
  const childrenSnap = containers.children
  let index = 1
  let self = this
  let final = containers.children.length
  const counter = document.createElement("div")
  counter.classList.add("mb-2")
  counter.style = "font-size:2.0em"
  counter.textContent = `0${index}/0${final}`
  const indicatorManager = new IndicatorManager(final,function(_index){
    index = _index + 1
    self.showCurrent() 
  })

  this.showCurrent = function(){
    for (let i = 0; i < childrenSnap.length; i++) {
      const element = childrenSnap[i];
      element.classList.remove("active")
      
    }
    childrenSnap[index - 1].classList.add("active")
  }

  containers.appendChild(indicatorManager.getNode())
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

var useCases = document.querySelectorAll(".use-cases-info-container")
for (let index = 0; index < useCases.length; index++) {
  const element = useCases[index];
  new Paginator(element)
  
}


var el = document.querySelectorAll(".nav-link-mobile"); // this element contains more than 1 DOMs.
    for(var i =0; i < el.length; i++) {
        el[i].onclick = function() {  
          if($(window).width()<477){
            $('#custom-menu-button').click();
          }
        };
    }
