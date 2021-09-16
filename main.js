const keys=[...document.querySelectorAll('.number-cont div')];
const inp=document.querySelector('.input-wrap div');
inp.disabled=true;

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
    '.':keys[18]
}

keys.forEach(d=>{
    d.addEventListener('click',()=>{
        inp.textContent+=d.textContent;
    });
})


keys[1].addEventListener('click',()=>{
    inp.textContent='';
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
    let a=inp.textContent;
    a=a.split('');
    a.splice(a.length-1,1);
    a=a.join('');
    inp.textContent=a;
})