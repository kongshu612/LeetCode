function test(strs){
    let readyCell= new Map();
    let pendingCell=[];

    // true or false
    var isPureDigital = (str)=>{
        return !isNaN(str);
    }

    // number or null
    var getValue=(str)=>{
        if(isPureDigital(str)){
            return Number.parseFloat(str);
        }else if(readyCell.has(str)){
            return readyCell.get(str);
        }else{
            return null;
        }
    }

    // true or false
    var calculate=(cellnode)=>{
        let [key,value]=[cellnode.key,cellnode.val];
        let expression = value;
        let dig = calculateString(expression,0,'+');
        if(dig!==null){
            readyCell.set(key,dig);   
            return true;         
        }else{
            return false;
        }
    }

    // number
    var combine=(d1,d2,operator)=>{
        if(operator=='+'){
            return d1+d2;
        }else if(operator=='-'){
            return d1-d2;
        }else if(operator=='*'){
            return d1*d2;
        }else{
            return d1/d2;
        }
    }

    // number or null
    var calculateString=(str,base,operator)=>{ 
        if(!str||!str.length){
            return base;
        }
        str=str.trim();
        let dig = getValue(str);
        if(dig!==null){
            return combine(base,dig,operator);
        } 
        else if(str[0]=='('){
            let [count,index]=[1,1];
            while(count>0&&index<str.length){
                if(str[index]=='('){
                    count++;
                }else if(str[index]==')'){
                    count--;
                }
                index++;
            }
            if(count==0){
                let firstpart = calculateString(str.substring(1,index-1).trim(),0,'+');
                if(firstpart===null){
                    return null;
                }else{
                    base = combine(base,firstpart,operator);
                    if(index<str.length){
                        let remaining = str.substr(index).trim();
                        if(remaining&&remaining.length>0){
                            if(remaining[0]=='+'||remaining[0]=='-'||remaining[0]=='*'||remaining[0]=='/'){
                                return calculateString(remaining.substr(1).trim(),base,remaining[0]);
                            }
                        }else{
                            return base;
                        }
                    }else{
                        return base;
                    }
                    
                }
            }
            throw 'exception';
        }else{
            for(let i=1;i<str.length;i++){
                if(str[i]=='+'||str[i]=='-'||str[i]=='*'||str[i]=='/'){
                    let firstPartValue = getValue(str.substring(0,i).trim());
                    if(firstPartValue===null){
                        return null;
                    }else{
                        base = combine(base,firstPartValue,operator);
                        return calculateString(str.substring(i+1).trim(),base,str[i]);
                    }                    
                }
            }
            return null;
        }
    }

    for(let i=0;i<strs.length;i++)
    {
        let t = strs[i].split('=');
        let [key,value]=[t[0].trim(),t[1].trim()];
        if(!isPureDigital(value)){
            pendingCell.push({key:key,val:value});
        }else{
            readyCell.set(key,Number.parseFloat(value));
        }
    } 
    let len= 0;
    while(pendingCell.length>0){
        if(pendingCell.length<=len){
            return false;
        }
        let cellNode = pendingCell.shift();
        if(!calculate(cellNode)){
            pendingCell.push(cellNode);
            len++;
        }else{            
            len=0;
        }
    }
    
    return readyCell; 

}