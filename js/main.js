
function onInit(){
    console.log('Loaded');
    renderProjs()
}




function renderProjs(){
    const projs = getProjsForDisplay()
    let picNum = 1

    const strHtml = projs.map(proj=> `
    <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#${proj.id}">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/0${picNum++}-thumbnail.jpg" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
          </div>
        </div> 
    `)
     
    $('.projs-list').html(strHtml.join(''))
    renderModal()
}

function renderModal(){
    const projs = getProjsForDisplay()
    let picNum = 1

    const strHtml = projs.map(proj=>    
    `
    <div class="portfolio-modal modal fade" id="${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${proj.name}</h2>
                <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/0${picNum++}-full.jpg" alt="">
                <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis
                  dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate,
                  maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                <ul class="list-inline">
                  <li>Date: ${getDateButiTemplate(proj.publishedAt)}</li>
                  <li>Client: CodingAcademy</li>
                  <li>Category: ${proj.labels[2]}</li>
                  <li><a href="${proj.url}" target="_blank">visit project</a></li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `)

    $('.modalsHtml').html(strHtml.join(''))
}

function sendMsgToMe(){
  const subject = $('.subjectMsg').val()
  const bodyMsg = $('.bodyTextMsg').val()
  const myLink = `https://mail.google.com/mail/?view=cm&fs=1&to=farismolla888@gmail.com&su=${subject}&body=${bodyMsg}`
  // const queryStringParams = `https://mail.google.com/mail/?view=cm&fs=1&to=farismolla888@gmail.com&su=${subject}&body=${bodyMsg}`
  // const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
  // window.history.pushState({ path: newUrl }, '', newUrl)
  $('.connectMeByEmail').attr('href', myLink)
}

function setCarFilter(filterBy = {}) {
  if (filterBy.vendor !== undefined) gFilterBy.vendor = filterBy.vendor
  if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed

  
}


function getDateButiTemplate(timeNum){
    // console.log(timeNum);
    const myDate =new Date(timeNum) 
    const dateTemp =  `${myDate.getFullYear()}/0${myDate.getMonth()}/0${myDate.getDay()}`
    
    return dateTemp
    
}

