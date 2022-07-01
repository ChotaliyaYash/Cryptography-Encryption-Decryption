const CeasarEncryptButton = document.querySelector('#caesar-encrypt-submit')
const CeasarDecryptButton = document.querySelector('#caesar-decrypt-submit')

const MonoEncryptButton = document.getElementById('mono-encrypt-submit')
const MonoDecryptButton = document.getElementById('mono-decrypt-submit')

const RailEncryptButton = document.getElementById('rail-encrypt-submit')
const RailDecryptButton = document.getElementById('rail-decrypt-submit')



const keyString = document.getElementById('key')
const answer = document.getElementById('answer')
const text = document.getElementById('edittext')
const download = document.getElementById('download')
const stringKey = document.getElementById('stringKey')

const spin = document.getElementById('spin')

const file = document.getElementById('myFile')
const read = document.getElementById('read')

////////      File uplod in textarea    ////////////
file.addEventListener('change', function() {
    read.addEventListener('click',() => {
      
        const fr = new FileReader();
        
        fr.onload=function(){
            text.textContent=fr.result;
        }
        
        fr.readAsText(this.files[0]);
    })
})

/////////////// Download file after encrypt   /////////////////
function downloadFile(filename, content) {

    const element = document.createElement('a');
    const blob = new Blob([content], { type: 'plain/text' });

    const fileUrl = URL.createObjectURL(blob);

    element.setAttribute('href', fileUrl); //file location
    element.setAttribute('download', filename); // file name
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
};

download.addEventListener('click', e => {

    const filename = "Cryptography-Encryption-Decryption.txt"

    const content = answer.value;

    if (filename && content) {
        downloadFile(filename, content);
    }
    else{
        alert('No Encrypted data found')
    }
});



///////////////////         checking of dublicate in key of monoalphabatic          //////////////
function dubli(str){
    let dub = 0
    for(i = 0; i < str.length; i++){
        for(j = 0; j < str.length; j++){
            if(i === j){
                break
            }
            else if(str.charAt(i) != str.charAt(j)){
                break
            }
            else{
                dub = dub + 1
            }
        }
    }
    if(dub == 0){
        return true
    }
    else{
        return false
    }
}



/////////////////////////           rail fence encryption function             ////////////////////////
function encryptrail(string,row){
    const a = string.length
    let result = ''
    const [ro, co] = [row, a]; 
    const m = Array(ro).fill().map(()=>Array(co).fill('@#'));

    let r = 0
    let c = 0
    let d = 0

    for(i = 0; i < a; i++){
        m[r][c] = string[i]
        if (r == 0){
            d = 0
        }
        else if(r == row-1){
            d = 1
        }
        
        if(d == 1){
            r = r - 1
            c = c + 1
        }
        else if(d == 0){
            r = r + 1
            c = c + 1
        }
    }
    
    for (i = 0; i < row; i++){
        for (j = 0; j < a; j++){
            if (m[i][j]!= '@#'){
                result = result.concat(m[i][j])
            }
        }
    }
    return result
    // console.log(result)
}


// ///////////////////////    Rail Fence Decrypt         ////////////////
function decryptrail(string,row){
    const a = string.length
    let result = ''
    const [ro, co] = [row, a]; 
    const m = Array(ro).fill().map(()=>Array(co).fill(0));

    let r = 0
    let c = 0
    let d = 0
    
    for(i = 0; i < a; i++){
        m[r][c] = string[i]
        
        if (r == 0 || r == row -1){
            c = c + 2*(row-1)
        }
        else{
            if (d == 0){
                c = c + 2*(row-1-r)
                d = 1
            }
            else if(d == 1){
                c = c + 2 * (r)
                d = 0
            }
        }
        if (c>a-1){
            r = r + 1
            c = r
            d = 0
        }
    }

    r = 0
    c = 0
    d = 0
    
    for(i = 0; i < a; i++){
        result = result.concat(m[r][c])
        if (r == 0){
            d = 0
        }
        else if (r == row-1){
            d = 1
        }
        if(d == 1){
            r = r - 1
            c = c + 1
        }
        if(d ==0 ){
            r = r + 1
            c = c + 1
        }
    }

    return result
    // console.log(result)
}


// console.log(CeasarEncryptButton)
// //////////    Ceasar encryption Method      ////////////////
if(CeasarEncryptButton != null){
    CeasarEncryptButton.addEventListener('click',() => {
        const key = parseInt(keyString.value)

        if(isNaN(key)){
            alert('Please enter proper key')
        }
        else{

            spin.style.display = 'block'
            
            setTimeout(() => {
                
                spin.style.display = 'none'

                let result = ""
                for(i = 0; i< text.value.length;i++){
                    const charc = text.value.charCodeAt(i)
            
                    result = result.concat(String.fromCharCode(charc + key))
                }
                answer.textContent = result
            },5000)
            
        }
    })
}

// //////////////      Ceasar Decryption     //////////// ///
else if(CeasarDecryptButton != null){
    CeasarDecryptButton.addEventListener('click',() => {
        const key = parseInt(keyString.value)
        if(isNaN(key)){
            alert('Please enter proper key')
        }
        else{

            spin.style.display = 'block'
            
            setTimeout(() => {
                
                spin.style.display = 'none'

                let result = ""

                for(i = 0; i< text.value.length;i++){
                    const charc = text.value.charCodeAt(i)

                    result = result.concat(String.fromCharCode(charc - key))
                }
                answer.innerText = result

            },5000)  
        }
    })
}


/////////////////////////           monoalphabatic encryption           /////////////////
else if(MonoEncryptButton != null){
    
    MonoEncryptButton.addEventListener('click',() => {
    
        if(stringKey.value.length == 26 && stringKey.value == stringKey.value.toLowerCase() && dubli(stringKey.value)){
            const norm = 'abcdefghijklmnopqrstuvwxyz'
            let result = ""
            // console.log(norm)
    
            spin.style.display = 'block'
            
            setTimeout(() => {
                
                spin.style.display = 'none'
    
                for (i = 0; i < text.value.length; i++) {
    
                    for (j = 0; j < 26; j++){
                
                        if (text.value.charAt(i) === norm.charAt(j)){
                            result = result.concat(stringKey.value.charAt(j))
                            // console.log(result)
                            break
                        }
                        if (text.value.charAt(i) < 'a' || text.value.charAt(i) > 'z'){
                            result = result.concat(text.value.charAt(i))
    
                            break
                        }
                    }
                }
    
                answer.innerText = result
            
            },5000)
            // console.log(result)
        }
        else{
            alert('please enter all 26 alphabates containing all small and non-repeating alphabates')
        }
    })
}

else if(MonoDecryptButton != null){
    MonoDecryptButton.addEventListener('click',() => {

        if(stringKey.value.length == 26 && stringKey.value == stringKey.value.toLowerCase() && dubli(stringKey.value)){
            const norm = 'abcdefghijklmnopqrstuvwxyz'
            let result = ""
            console.log(norm)
            
            spin.style.display = 'block'
            
            setTimeout(() =>{
                
                spin.style.display = 'none'
    
                for (i = 0; i < text.value.length; i++) {
        
                    for (j = 0; j < 26; j++){
                
                        if (text.value.charAt(i) === stringKey.value.charAt(j)){
                            result = result.concat(norm.charAt(j))
                            break
                        }
                        if (text.value.charAt(i) < 'a' || text.value.charAt(i) > 'z'){
                            result = result.concat(text.value.charAt(i))
        
                            break
                        }
                    }
                }
                // console.log(result)
                answer.innerText = result
            },5000)
        }
        else{
            alert('please enter all 26 alphabates containing small or non-repeating alphabates')
        }
    })
}




// ////////////////////       rail dence encryption        ///////////////
else if(RailEncryptButton != null){
    RailEncryptButton.addEventListener('click',() => {
        const key = parseInt(keyString.value)
    
        if(isNaN(key)){
            alert('Please enter proper key')
        }
        else{
            spin.style.display = 'block'
            
            setTimeout(() => {
                
                spin.style.display = 'none'
    
                let result = encryptrail(text.value,key)
    
                answer.textContent = result
                
            },5000)
            
        }
    })
}

else if(RailDecryptButton != null){

    RailDecryptButton.addEventListener('click',() => {
        const key = parseInt(keyString.value)

        if(isNaN(key)){
            alert('Please enter proper key')
        }
        else{
            spin.style.display = 'block'
            
            setTimeout(() => {
                
                spin.style.display = 'none'

                let result = decryptrail(text.value,key)

                answer.textContent = result
                
            },5000)
            
        }
    })
}
    


