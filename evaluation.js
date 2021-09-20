import { Stack } from "./class.js";



export function isDigit(num){
    let res=(num.match(/[0-9]{1,}/,num))?true:false;
    return res;
}

export function operation(num1,num2,op){
    num1=+num1;
    num2=+num2;
    switch (op) {
        case '+':
            return num1+num2
        case '-':
            return num1-num2;
        case '/':
            return num1/num2;
        case '*':
            return num1*num2;
        case '%':
            return num1%num2;
        case '^':
            return num1**num2;
        default:
            break;
    }
}

export function precedence(op){
    if(op==='+' || op==='-') return 1;
    if(op==='/' || op==='*' || op==='%') return 2;
    if(op==='^') return 3;
}

export function Evalutation(eqn){
    let op=new Stack();
    let num=new Stack();
    eqn=eqn.split('');

    for(let i=0;i<eqn.length;i++){
        if(eqn[i]==='('){
            op.push(eqn[i]);
        }
        else if(isDigit(eqn[i])===true){
            let val=0;
            while(i<eqn.length && isDigit(eqn[i])===true){
                val=val*10;
                val+=+(eqn[i]);
                i++;
            }
            i--;
            num.push(val);
        }
        else if(eqn[i]===')'){
            while(!op.empty() && op.top()!=='('){
                let num2=num.top();
                num.pop();
                let num1=num.top();
                num.pop();
                let operator=op.top();
                op.pop();
                num.push(operation(num1,num2,operator));
            }
            op.pop();
        }
        else{
            while(!op.empty() && precedence(op.top())>=precedence(eqn[i])){
                let num2=num.top();
                num.pop();
                let num1=num.top();
                num.pop();
                let operator=op.top();
                op.pop();
                num.push(operation(num1,num2,operator));
            }
            op.push(eqn[i]);
        }
    }

    while(!op.empty()){
        let num2=num.top();
        num.pop();
        let num1=num.top();
        num.pop();
        let operator=op.top();
        op.pop();
        num.push(operation(num1,num2,operator));
    }

    return num.top();
}
