import { Evalutation } from "./evaluation.js";

const keys=[...document.querySelectorAll('.number-cont div')];
const inp=document.querySelector('.input-wrap div');
inp.disabled=true;

let open=0;
let close=0;
let dot_regex=/[\d]\.[\d]{0,}\.{1,}/gi;
let arthmetic_regex=/[+\-*\/^\.^%][+\-*\/^\.^%]{1,}/gi;
let operator_regex=/[+\-*\/^%][+\-*\/^%]/gi;
let first_eqn=/^[+\-*\/^%\.]/gi;
let last_eqn=/[+\-*\/^%\.]$/gi;
let decimal_limit=/\.[\d]{5,}/gi;
let number_limit=/[0-9]{9,}/gi;
let open_Bracket=/^\)/gi;
let bracket=/\({0,}[+\-*\/^\.^%]/
let main_regex=/([\d]\.[\d]{0,}\.{1,})|([+\-*\/^\.^%][+\-*\/^\.^%]{1,})|([+\-*\/^%][+\-*\/^%])|(^[+\-*\/^%\.])|(\.[\d]{5,})|([0-9]{9,})|(^\))|(\({1,}[+\-*\/^%\.])|(\(\))|(\)[\.0-9])|(\)[\d])|([\d]\()|(\)\()|([+\-*\/^%\.]\))|(\.\))|(\.\()/gi;

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
    let temp=a.splice(a.length-1,1);
    if(temp[0]==='(') open--;
    if(temp[0]===')') close--;
    a=a.join('');
    inp.textContent=a;
}

keys.forEach((d,idx)=>{
    if(idx==0 || idx===21) return;
    d.addEventListener('click',()=>{
        if(d.textContent==='(') open++;
        if(d.textContent===')') close++;
        inp.textContent+=d.textContent;
        let txt=inp.textContent;
        // if(txt.match(dot_regex) || txt.match(arthmetic_regex) || txt.match(operator_regex) || txt.match(first_eqn) || txt.match(decimal_limit) || txt.match(number_limit) || txt.match(open_Bracket)){
        if(txt.match(main_regex) || open<close){    
            if(txt.match(operator_regex)){
                let temp;
                txt=txt.split('');
                temp=txt.splice(txt.length-1,1);
                txt.splice(txt.length-1);
                txt=txt.join('')+temp;
            }
            else{
                txt=txt.split('');
                let temp=txt.splice(txt.length-1,1);
                console.log(temp);
                if(temp[0]==='(') open--;
                if(temp[0]===')') close--;
                console.log(txt);
                txt=txt.join('');
            }
            inp.textContent=txt;
        }
        outputPrinter();
    });
})

window.addEventListener("keypress",(e)=>{
    if(e.key !=="Enter") return;
    let res=Evalutation(inp.textContent);
    console.log(res);
})

keys[1].addEventListener('click',()=>{
    inp.textContent='';
    open=0;
    close=0;
    document.querySelector('.output-wrap').textContent=0;
    outputPrinter();
})

keys[0].addEventListener('click',()=>{
    BackSpacer();
    outputPrinter();
})

let prevres=0;
window.addEventListener('keypress',(e)=>{
        if(!obj[e.key]) return;
        obj[e.key].classList.add('box_active');
        setTimeout(()=>{
            obj[e.key].classList.remove('box_active');
        },100);
        obj[e.key].click();
        inp.scrollTop=inp.scrollHeight;
        // outputPrinter();
})

function outputPrinter(){
    if(inp.textContent.length===0) {
        document.querySelector('.output-wrap').textContent=0;
        prevres=0;
        return;
    }
    let res=Evalutation(inp.textContent);
    let tmptxt=inp.textContent.split('');
    if(tmptxt[tmptxt.length-1].match(/[+\-\/*^%]/)){
        let temp=inp.textContent;
        temp=temp.split('');
        temp.splice(temp.length-1,1);
        temp=temp.join('');
        res=Evalutation(temp);
    }
    if(open-close!==0){
        let temp=inp.textContent;
        let i=open-close;
        while(i>0){
            temp+=')';
            i--;
        }
        res=Evalutation(temp);
        console.log(temp);
    }
    console.log(res,prevres);
    if(res===undefined) res=0;
    if(res || res===0){
        console.log('Entering Here');
        document.querySelector('.output-wrap').textContent=res;
    }
    else{
        document.querySelector('.output-wrap').textContent=prevres;
    }
    prevres=res;
}

window.addEventListener('keydown',(e)=>{
    if(e.key!=='Backspace') return;
    keys[0].classList.add('box_active');
    setTimeout(()=>{
        keys[0].classList.remove('box_active');
    },100);
    if(inp.textContent.length===0) return;
    BackSpacer();
    outputPrinter();
})

function main_output_printer(){
    let temp=inp.textContent.split('');
    if(temp.length===0) return;
    if(temp[temp.length-1].match(/[^0-9]/)){
        document.querySelector('.output-wrap').textContent="Equation Error";
    }
    else{
        outputPrinter();
    }
}

keys[21].addEventListener("click",(e)=>{
    main_output_printer();
})

window.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'){
        main_output_printer();
    }
});

