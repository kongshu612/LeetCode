
function xml2json (xml) {
    let result;
    
    // TODO: your code here
    var searchTag=(str,openElement,closeElement)=>{
        if(!str||!str.length){
            throw 'InLegal Format';
        }
        let [count,index]=[1,0];
        let [openlen,closelen] = [openElement.length,closeElement.length];
        while(index<str.length){
            while(str[index]!='<'&&index<str.length){
                index++;
            }
            if(index<str.length){
                if(str[index+1]=='/'){
                    let subelement = str.substr(index,closelen);
                    if(subelement==closeElement){
                        count--;
                        if(count<=0){
                            return {
                                content:str.substring(0,index).trim('\r').trim(),
                                remainingString:str.substring(index+closelen).trim('\r').trim()
                            }
                        }
                        index+=closelen;
                    }else{
                        index++;
                    }
                }else{
                    let subelement = str.substr(index,openlen);
                    if(subelement==openElement){
                        count++;
                        index+=openlen;
                    }else{
                        index++;
                    }
                }
            }else{
                throw 'InLegal Format';;
            }
        }
    }
    var parse=(xml)=>{
        if(!xml||!xml.length){
            return null;
        }
        xml=xml.trim('\r').trim();
        if(!xml||!xml.length){
            return null;
        }
        if(xml[0]=='<'){
            let element='';
            for(let i=1;i<xml.length;i++){
                if(xml[i]=='>'){
                    element=xml.substring(0,i+1);
                    break;
                }
            }
            if(element.length>1){
                let result=[];
                let tag = element.substring(1,element.length-1);
                let [openElement,closeElement]=[`<${tag}>`,`</${tag}>`];
                let searchResult = searchTag(xml.substring(element.length),openElement,closeElement);
                let item = {
                    tag:tag
                }
                item.children=parse(searchResult.content);
                result.push(item);
                let remainingString = searchResult.remainingString;
                if(remainingString&&remainingString.length>0){
                    let remainingResult = parse(remainingString);
                    if(typeof remainingResult !='string'){
                        for(let i=0;i<remainingResult.length;i++){
                            result.push(remainingResult[i]);
                        }
                    }
                    else{
                        throw 'InLegal Format';
                    }
                }
                return result;                
            }else{
                return xml;
            }
        }else{
            return xml;
        }
    }

    let tmp = parse(xml);
    if(!tmp){
        return null;
    }
    if(tmp.length==1){
        result=tmp[0];
    }else{
        result=tmp;
    }

    return result;
  }