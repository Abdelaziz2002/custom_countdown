const inputContainer=document.getElementById('input-container')
const countdownForm = document.getElementById("countdown-form")
const title=document.getElementById('title')
const datelel=document.getElementById('date-picker')

const countdownel=document.getElementById('countdown')
const countdownelTitle=document.getElementById('countdown-title')
const countdownelbutton=document.getElementById('countdown-button')
const timelements=document.querySelectorAll("span")

const complete=document.getElementById('complete')
const completeinfo=document.getElementById('complete-info')
const completeBtn=document.getElementById('complete-button')

let savedcountdown;
let countdowntitle=''
let countdowndate=''
let countdownvalue=Date
let timeinterval

const second=1000
const minut=second*60
const hour=minut*60
const day=hour*24

let today= new Date().toISOString().split('T')[0];
datelel.setAttribute('min',today)

function reset(){
    clearInterval(timeinterval);
    title.value='';
    datelel.value='';
    countdowntitle='';
    countdowndate='';
    localStorage.removeItem('countdown')
    countdownel.hidden=true;
    complete.hidden=true;
    inputContainer.hidden=false;
}

function  domupdate(){
    timeinterval=setInterval(()=>{
        let now=new Date().getTime();
        let distence=countdownvalue-now
        const days=Math.floor(distence/day)
        const hours=Math.floor((distence% day)/hour)
        const minuts=Math.floor((distence% hour) /minut)
        const seconds=Math.floor((distence% minut)/second)
        if (distence<0) {
            inputContainer.hidden=true;
            completeinfo.textContent=`${countdowntitle} complete on ${countdowndate}`
            complete.hidden=false
        }else{
            countdownelTitle.textContent=`${countdowntitle}`
            timelements[0].textContent=`${days}`
            timelements[2].textContent=`${hours}`
            timelements[4].textContent=`${minuts}`
            timelements[6].textContent=`${seconds}`

            inputContainer.hidden= true;
            countdownel.hidden = false;
        }    
    },second);
    
}

function updatecountdown(e){
    e.preventDefault();
    countdowntitle=e.srcElement[0].value
    countdowndate=e.srcElement[1].value
    savedcountdown={
        Title:countdowntitle,
        date:countdowndate
    };
    localStorage.setItem('countdown',JSON.stringify(savedcountdown))

    if (countdowndate==='') {
        alert('please select your date')
    }else{
        countdownvalue=new Date(countdowndate).getTime();
        domupdate();
    }  
}

function getsavedobject(){
    if (localStorage.getItem('countdown')){
        inputContainer.hidden=true;
        savedcountdown=JSON.parse(localStorage.getItem('countdown'))
        countdowntitle=savedcountdown.Title;
        countdowndate=savedcountdown.date;
        countdownvalue=new Date(countdowndate).getTime();
        domupdate();
    }
}

countdownForm.addEventListener('submit',updatecountdown)
countdownelbutton.addEventListener('click',reset)
completeBtn.addEventListener('click',reset)
// onload
getsavedobject();