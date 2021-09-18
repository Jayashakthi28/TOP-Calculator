const keys=[...document.querySelectorAll('.number-cont div')];
const inp=document.querySelector('.input-wrap div');
inp.disabled=true;

let dot_regex=/[\d]\.[\d]{0,}\.{1,}/gi;
let arthmetic_regex=/[+\-*\/^\.^%][+\-*\/^\.^%]{1,}/gi;
let operator_regex=/[+\-*\/^%][+\-*\/^%]/gi;
let first_eqn=/^[+\-*\/^%\.]/gi;
let last_eqn=/[+\-*\/^%\.]$/gi;
let decimal_limit=/\.[\d]{5,}/gi;
let number_limit=/[0-9]{9,}/gi;
let open_Bracket=/^\)/gi;
const obj={
    '1':keys[14],
    '2':keys[15],
    '3':keys[16],
    '4':keys[10],
    '5':keys[11],
    '6':keys[12],
    '7':keys[6],
    '8':keys[7],
    '9':keys[8],
    '0':keys[19],
    '+':keys[17],
    '-':keys[13],
    '*':keys[9],
    '/':keys[5],
    '%':keys[2],
    '^':keys[20],
    '.':keys[18],
    '(':keys[3],
    ')':keys[4]
}


function BackSpacer(){
    let a=inp.textContent;
    a=a.split('');
    a.splice(a.length-1,1);
    a=a.join('');
    inp.textContent=a;
}

keys.forEach((d,idx)=>{
    if(idx==0) return;
    d.addEventListener('click',()=>{
        inp.textContent+=d.textContent;
        let txt=inp.textContent;
        if(txt.match(dot_regex) || txt.match(arthmetic_regex) || txt.match(operator_regex) || txt.match(first_eqn) || txt.match(decimal_limit) || txt.match(number_limit) || txt.match(open_Bracket)){
            if(txt.match(operator_regex)){
                let temp;
                txt=txt.split('');
                temp=txt.splice(txt.length-1,1);
                txt.splice(txt.length-1);
                txt=txt.join('')+temp;
            }
            else{
                txt=txt.split('');
                txt.splice(txt.length-1,1);
                console.log(txt);
                txt=txt.join('');
            }
            inp.textContent=txt;
        }
    });
})


keys[1].addEventListener('click',()=>{
    inp.textContent='';
})

keys[0].addEventListener('click',()=>{
    BackSpacer();
})

window.addEventListener('keypress',(e)=>{
        if(!obj[e.key]) return;
        obj[e.key].classList.add('box_active');
        setTimeout(()=>{
            obj[e.key].classList.remove('box_active');
        },100);
        obj[e.key].click();
        inp.scrollTop=inp.scrollHeight;
})

window.addEventListener('keydown',(e)=>{
    if(e.key!=='Backspace' || inp.textContent.length===0) return;
    BackSpacer();
})
