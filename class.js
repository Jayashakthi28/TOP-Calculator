export class Stack {
    constructor (){
        this.arr=[];
        this.tidx=0;
    }
    push(num){
        this.arr[this.tidx++]=num;
    }
    pop(){
        if(this.tidx==0) return;
        this.tidx--;
    }
    top(){
        return this.arr[this.tidx-1];
    }
    empty(){
        return this.tidx===0?true:false;
    }
}


