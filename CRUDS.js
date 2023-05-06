let names = document.getElementById('names');
let pries = document.getElementById('pries');
let taxts = document.getElementById('taxts');
let ads = document.getElementById('ads');
let discont = document.getElementById('discont');
let totl = document.getElementById('totl');
let number = document.getElementById('number');
let text = document.getElementById('text');
let submt = document.getElementById('submt');
let surch = document.getElementById('surch');

mood = "crat";
let them ;
let allcrat ;
clear()

function gettotl(){
  if(pries.value != ''){
   let tot = ( +pries.value + +taxts.value + +ads.value) - +discont.value;
   totl.innerHTML = tot ;
   totl.style.backgroundColor = "#1acb14" ;
   console.log("getttotl fun done full");
  return;
  }
  else{
    let tot = "";
    totl.innerHTML = tot ;
    totl.style.backgroundColor = "rgb(190, 0, 0)" ;
    console.log("getttotl fun done empty");
    return;
  }
  
}


// see if bowser have any data to load them
if( localStorage.item != null){

  allcrat = JSON.parse(localStorage.item ) ;

} else {

  allcrat = [] ;  

}

submt.onclick = function(){
    crat = {
        names:names.value , 
        pries:pries.value , 
        taxts:taxts.value , 
        ads:ads.value ,
        discont:discont.value , 
        totl:totl.innerHTML , 
        number:number.value ,
        text:text.value
    }
    
    if(names.value != '' && pries.value != '' && text.value != '' && number.value <= 100){
      if(mood === 'crat'){
        if(number.value > 1){
          for( let i = 0 ; i < number.value ; i++){
          allcrat.push(crat);
          }
        } else {
            allcrat.push(crat);  
        }
      }else{
          allcrat [them] = crat ;
          mood = 'crat';
          number.style.display = "block";
          submt.innerHTML = "crat" ;
      }
      clear()
    }


  
    localStorage.setItem("item" , JSON.stringify(allcrat))

    
    read()
}

function clear(){
  names.value = ""; 
  pries.value = ""; 
  taxts.value = "";
  ads.value  = "";
  discont.value = "";
  totl.innerHTML = ""; 
  number.value = "";
  text.value  = "";
  surch.value  = "";
}

function read(){
    let tabl = '' ;
    for( let i = 0 ; i < allcrat.length ; i++){
        tabl += 
   `
    <tr>
         <td>${[i+1]}</td>
         <td>${allcrat[i].names}</td>
         <td>${allcrat[i].pries}</td>
         <td>${allcrat[i].taxts}</td>
         <td>${allcrat[i].ads}</td>
         <td>${allcrat[i].discont}</td>
         <td>${allcrat[i].totl}</td>
         <td>${allcrat[i].text}</td>
         <td><button id="up" onclick="updet(${i})">update</button></td>
         <td><button id="dl" onclick="dlet(${i})" >delete</button></td>
    </tr>
     `
        
    }
   
   document.getElementById('tabl').innerHTML = tabl ;
   
 butdletall = document.getElementById('dleatall');
 if(allcrat.length > 0 ){
    butdletall.innerHTML = `<button onclick="dltall()" >delete (${allcrat.length})</button>`;
 }else{
    butdletall.innerHTML = '';
 }
 
}

read()

function dlet(i){
    allcrat.splice(i,1);
    localStorage.item = JSON.stringify(allcrat) ;
    read()
}

function dltall(){
    allcrat.splice(0);
    localStorage.clear() ;
    read()
}

function updet(i){

names.value = allcrat[i].names.uppercase; 
pries.value = allcrat[i].pries; 
taxts.value = allcrat[i].taxts;
ads.value  = allcrat[i].ads;
discont.value = allcrat[i].discont;
gettotl()
number.style.display = "none";
text.value  = allcrat[i].text; 
submt.innerHTML = "Updet" ;
mood = 'updet'
them = i ;
scroll({
  top: 0,
  behavior: 'smooth'
});
}

let sruhmood = 'names' ;

function srchid (id){
  let su = document.getElementById("surch");
  if(id == "srhnim"){
    sruhmood = 'names';
    su.placeholder = 'surch by titl'
  }
  else{
    sruhmood = 'text';
    su.placeholder = 'surch by catcore'
  }
  su.placeholder = 'surch by ' + sruhmood ;
  su.focus() ;
}



function srh(value){
  let tabl = '' ; 
  for(let i = 0 ; i< allcrat.length ; i++){  if(sruhmood == 'names')
  {
 
if(allcrat[i].names.includes(value)){
  tabl += 
  `
  <tr>
       <td>${[i]}</td>
       <td>${allcrat[i].names}</td>
       <td>${allcrat[i].pries}</td>
       <td>${allcrat[i].taxts}</td>
       <td>${allcrat[i].ads}</td>
       <td>${allcrat[i].discont}</td>
       <td>${allcrat[i].totl}</td>
       <td>${allcrat[i].text}</td>
       <td><button id="up" onclick="updet(${i})">update</button></td>
       <td><button id="dl" onclick="dlet(${i})" >delete</button></td>
  </tr>
   `

}
}
else{
    if(allcrat[i].text.includes(value)){
      tabl += 
      `
      <tr>
           <td>${[i]}</td>
           <td>${allcrat[i].names}</td>
           <td>${allcrat[i].pries}</td>
           <td>${allcrat[i].taxts}</td>
           <td>${allcrat[i].ads}</td>
           <td>${allcrat[i].discont}</td>
           <td>${allcrat[i].totl}</td>
           <td>${allcrat[i].text}</td>
           <td><button id="up" onclick="updet(${i})">update</button></td>
           <td><button id="dl" onclick="dlet(${i})" >delete</button></td>
      </tr>
       `
    }
}
}

document.getElementById('tabl').innerHTML = tabl ;

}
read()
clear()