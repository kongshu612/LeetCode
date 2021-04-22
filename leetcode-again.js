function test5(str){
    if(!str||!str.length){
        return '';
    }    
    var ispalidromic=(s,e)=>{
        while(s<=e&&str[s]==str[e]){
            s++;
            e--;
        }
        return s>e;
    }
    let len= str.length;
    let [maxresult,result]=[1,str[0]];
    for(let i=0;i<parseInt(len/2);i++){
        let j=len-1;
        while(j>i&&str[j]!=str[i]){
            j--;
        }
        if(j>i&&ispalidromic(i,j)&&maxresult<(j-i+1)){
            maxresult=j-i+1;
            result=str.substring(i,j+1);
        }
    }
    return result;
}