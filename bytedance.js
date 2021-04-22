function loggestsubstring(str){
    if(!str||!str.length){
        return '';
    }
    let [max,result]=[0,''];
    for(let i=0;i<str.length;i++){
        let cache= new Set();
        let j;
        for(j=i;j<str.length;j++){
            if(cache.has(str[j])){
                break;
            }
            cache.add(str[j]);
        }
        if(j-i+1>max){
            max=j-i+1;
            result=str.substring(i,j);
        }
    }
    return result;
}

function loggestsubstring_2(str){
    let maxCount=[1];
    for(let i=1;i<str.length;i++){
        let f= maxCount[i-1]+1;
        let j=0;
        for(j=0;j<i;j++){
            if(str[j]==str[i]){
                break;
            }
        }
        if(j<i){
            let gap = i-j;
            if(gap <f){
                f=gap;
            }
        }
        maxCount.push(f);
    }
    let result=maxCount[0];
    for(let i=1;i<maxCount.length;i++){
        if(result<maxCount[i]){
            result=maxCount[i];
        }
    }
    return result;
}

function commonsubstring(s1,s2){    
    if(!s2||!s2.length||!s1||!s1.length||s2.length<s1.length){
        return false;
    }
    let len = s1.length;
    let dic = new Map();

    var isstringEqual=(sub)=>{
        let currentdic=new Map();
        for(let i=0;i<sub.string;i++){
            let c = sub[i];
            if(!dic.has(c)){
                return false;
            }
            if(currentdic.has(c)){
                let currentvalue = currentdic.get(c);
                if(currentvalue<=0){
                    return false;
                }
                currentdic.set(c,currentvalue-1);
                continue;
            }else{
                let dig = dic.get(c);
                currentdic.set(c,dig-1);
            }
        }
        return true;
    }

    for(let i=0;i<s1.length;i++){
        if(dic.has(s1[i])){
            dic.set(s1[i],dic.get(s1[i])+1);
        }else{
            dic.set(s1[i],1);
        }
    }
    for(let i=0;i<s2.length-len;i++){
        let sub = s2.substr(i,len);
        if(isstringEqual(sub)){
            return true;
        }
    }
    return false;
}

function commonsubstring(s1,s2){
    if(!s2||!s2.length||!s1||!s1.length||s2.length<s1.length){
        return false;
    }
    var isEqual=(num1,num2)=>{
        for(let i=0;i<num1.length;i++){
            if(num1[i]!=num2[i]){
                return false;
            }
        }
        return true;
    }
    let len = s1.length;
    let [original,current]=[new Array(26).fill(0),new Array(26).fill(0)];
    for(let i=0;i<len;i++){
        let code = s1.charCodeAt(i) - 97;
        let code2= s2.charCodeAt(i) - 97;
        original[code]+=1;
        current[code2]+=1;
    }
    for(let i=0;i<s2.length-len+1;i++){
        if(i!=0){
            let code = s2.charCodeAt(i-1)-97;
            let code2= s2.charCodeAt(i+len-1)-97;
            current[code]-=1;
            current[code2]+=1;
        }
        if(isEqual(original,current)){
            return true;
        }
    }
    return false;
}


function commonsubstring_3(s1,s2){
    if(!s2||!s2.length||s1.length>s2.length){
        return false;
    }
    let len = s1.length;
    let [dic1,dic2]=[new Array(26).fill(0),new Array(26).fill(0)];
    var isMath=()=>{
        let [str1,str2]=[dic1.join(','),dic2.join(',')];
        return str1==str2;
    }
    for(let i=0;i<len;i++){
        let [c1,c2]=[s1.charCodeAt(i)-97,s2.charCodeAt(i)-97];
        dic1[c1]++;
        dic2[c2]++;
    }
    if(isMath()){
        return true;
    }
    for(let j=1;j<str2.length-len+1;j++){
        let [pre,last]=[s2.charCodeAt(j-1)-97,s2.charCodeAt(j+len-1)-97];
        dic2[pre]--;
        dic2[last]++;
        if(isMath()){
            return true;
        }
    }
    return false;
}

function multiply(s1,s2)
{
    var splitStr=(str)=>{
        let result=[];
        let len = str.length;
        for(let i=len-1;i>=0;i--){
            if(str[i]=='0'){
                continue;
            }
            result.push(`${str[i]}${'0'.repeat(len-1-i)}`);
        }
        return result;
    }
    var multiply=(str1,str2)=>{
        let [len1,len2]=[str1.length,str2.length];
        let t=parseInt(len1[0])*parseInt(len2[0]);
        let zeorCount = len1-1+len2-1;
        return `${t}${'0'.repeat(zeorCount)}`;
    }
    var plus = (str1,str2)=>{
        let [digit1,digit2]=[transfer(str1),transfer(str2)];
        let [len1,len2,len=Math.max(len1,len2)]=[digit1.length,digit2.length];
        let result = new Array(len+1).fill(0);
        if(len1>len2){
            for(let i=0;i<len2-len1;i++){
                digit2.push(0);
            }
        }else{
            for(let i=0;i<len1-len2;i++){
                digit1.push(0);
            }
        }
        let pop=0;
        for(let i=0;i<len;i++){
            let t = digit1[i]+digit2[i]+pop;
            pop = parseInt(t/10);
            result[i]=t%10;
        }
        result[len]=pop;
        return result.reverse().join('').replace(/^0*/i,'');
    }

    var transfer=(str)=>{
        let t =[];
        for(let i=str.length-1;i>=0;i--){
            t.push(parseInt(str[i]));
        }
        return t;
    }
    if(!s1||!s1.length||!s2||!s2.length||s1=='0'||s2=='0'){
        return 0;
    }
    let [str1,str2]=[splitStr(s1),splitStr(s2)];
    let result=[];
    for(let i=0;i<str1.length;i++){
        for(let j=0;j<str2.length;j++){
            result.push(multiply(str1[i],str2[j]));
        }
    }
    let finalresult=result[0];
    for(let i=1;i<result.length;i++){
        finalresult=plus(finalresult,result[i]);
    }
    return finalresult;
}

function multiply_2(s1,s2){
    if(!s1||!s1.length||!s2||!s2.length||s1=='0'||s2=='0'){
        return 0;
    }
    let [len1,len2,len=len1+len2+10]=[s1.length,s2.length];
    let [digit1,digit2,result]=[[],[],new Array(len).fill(0)];
    var transfer = (str,digit)=>{
        for(let i=str.length-1;i>=0;i--){
            digit.push(parseInt(str[i]));
        }
    }
    transfer(s1,digit1);
    transfer(s2,digit2);
    for(let i=0;i<len1;i++){
        for(let j=0;j<len2;j++){
            let sum = digit1[i]*digit2[j];
            let [l,h]=[sum%10,parseInt(sum/10)];
            let base = i+j;
            result[base]+=l;
            result[base+1]+=h;
        }
    }
    let val = result.reverse().join('');
    let index =0;
    while(index<val.length&&val[index]=='0'){
        index++;
    }
    if(index>=val.length){
        return '0';
    }else{
        return val.substr(index);
    }
}

function simple(strs){
    if(!strs||!strs.length){
        return '';
    }
    let segments = strs.split('/');
    if(strs[0]=='/'){
        segments.shift();
    } 
    if(strs[strs.length-1]=='/'){
        segments.pop();
    }
    let results=[];
    for(let i=0;i<segments.length;i++){
        let t = segments[i];
        if(t=='.'){
            continue;
        }else if(t=='..'){
            results.pop();
        }else if(!t||!t.length){
            throw 'error';
        }
        else{
            results.push(t);
        }
    }
    return '/'+results.join('/');
}

function parseIPAddress(str){
    let cache = new Map();
    var isdigitLegal = (num)=>{
        return num>=0&&num<=255;
    }
    var parse = (str,n)=>{
        if(n==0&&(!str||!str.length)){
            return [[]];
        }        
        if(!str||!str.length||n==0){
            return null;
        }
        let [result,key]=[[],`${str}x${n}`];
        if(cache.has(key)){
            return cache.get(key);
        }
        for(let len=1;len<=3&&len<=str.length;len++){
            let digit = parseInt(str.substr(0,len));
            if(isdigitLegal(digit)){
                let remaining = parse(str.substr(0+len),n-1);
                if(remaining!=null){
                    for(let i=0;i<remaining.length;i++){
                        result.push([digit,...remaining[i]]);
                    }
                }
            }
        }
        cache.set(key,result);
        return result;       
    }

    if(!str||str.length<4){
        return false;
    }
    return parse(str,4).map(it=>it.join('.'));
}

function subtract(num1,num2){
    let [isnegative1,isnegative2]=[num1[0]=='-',num2[0]=='-'];
    var convert = (str)=>{
        if(str[0]=='+'||str[0]=='-'){
            str=str.substr(1);
        }
        let len = str.length;
        let result=[];
        for(let i=len-1;i>=0;i--){
            let c =parseInt(str[i]);
            result.push(c);
        }
        return result;
    }
    var add=(digit1,digit2)=>{
        let [len1,len2,len=Math.max(len1,len2)]=[digit1.length,digit2.length];
        let result= [];
        let pop=0;
        for(let i=0;i<len;i++){
            let v1=i<len1?digit1[i]:0;
            let v2 = i<len2?digit2[i]:0;
            let tmp = v1+v2+pop;
            result.push(tmp%10);
            pop=parseInt(tmp/10);
        }
        if(pop>0){
            result.push(pop);
        }
        return result;
    }
    var subtract=(f,l)=>{
        let result=[];
        let len = f.length;
        let pop=0;
        for(let i=0;i<len;i++){
            let v1=f[i];
            let v2=i<l.length?l[i]:0;
            let t = v1-pop-v2;
            if(t<0){
                t+=10;
                pop=1;
            }else{
                pop=0;
            }
            result.push(t);
        }
        return result;
    }

    var compare=(digit1,digit2)=>{
        let [len1,len2]=[digit1.length,digit2.length];
        if(len1>len2){
            return 1;
        }else if(len1<len2){
            return -1;
        }else{
            for(let i=len1-1;i>=0;i--){
                if(digit1[i]==digit2[i]){
                    continue;
                }else{
                    return digit1[i]>digit2[i]?1:-1;
                }
            }
            return 0;
        }
    }
    var printdigit = (digit)=>{
        let len=digit.length;
        let index=len-1;
        while(index>=0&&digit[index]==0){
            index--;
        }
        if(index<0){
            return '0';
        }
        return digit.slice(0,index+1).reverse().join('');
    }
    let [digit1,digit2]=[convert(num1),convert(num2)];
    if(isnegative1!=isnegative2){
        let isnegative = isnegative1;
        let result = add(digit1,digit2);
        let res = printdigit(result);
        if(res[0]=='0'&&res.length==1){
            return res;
        }else{
            return isnegative?'-'+res:res;
        }
    }else{
        let result;
        let isnegative = isnegative1;
        if(compare(digit1,digit2)>=0){
            isnegative=isnegative1;
            result = subtract(digit1,digit2);
        }else{
            isnegative=!isnegative1;
            result = subtract(digit2,digit1);
        }
        let res = printdigit(result);
        if(res[0]=='0'&&res.length==1){
            return res;
        }else{
            return isnegative?'-'+res:res;
        }
    }
}