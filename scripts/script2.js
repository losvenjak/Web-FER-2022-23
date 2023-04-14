
var cartItems = {};
var kljuc;
var count = 0;
document.addEventListener("DOMContentLoaded", function() {
    const nazivDiv = document.querySelector('.naziv');
    const kolicinaDiv = document.querySelector('.kolicina');
    const params = new URLSearchParams(window.location.search);
    for (let [key, value] of params.entries()) {
        count += parseInt(value);
        cartItems[key] = value;
    }
    updateCart();
    var i = 0;
    for(let [key, value] of Object.entries(cartItems)) {
        i++;
        const artikl = document.createElement("div");
        artikl.textContent = key;
        kljuc = key;      
        const kol = document.createElement("div");
        kol.id = i;
        kol.textContent = value; 
        nazivDiv.appendChild(artikl);
        const btn_minus = document.createElement('button');
        const btn_plus = document.createElement('button');        
        btn_plus.name = 'btn_plus';    
        btn_minus.name = 'btn_minus';
        btn_plus.id = key;
        btn_minus.id = key;
        kolicinaDiv.appendChild(btn_minus);
        kolicinaDiv.appendChild(kol);
        kolicinaDiv.appendChild(btn_plus);   
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.getElementsByName("btn_minus");
    const buttons2 = document.getElementsByName("btn_plus");
    const nazivDiv = document.querySelector('.naziv');
    const kolicinaDiv = document.querySelector('.kolicina');
    var j = 0;
    for (const button of buttons2) {    
        button.addEventListener("click", increase);          
    }
    for (const button of buttons) {    
        button.addEventListener("click", decrease);          
    }
    function increase() {
        j = 0;
        cartItems[this.id]++;        
        for(let [key, value] of Object.entries(cartItems)) {
            j++;
            if(key===this.id)
                break;           
        }
        kol = document.getElementById(j);
        kol.textContent = cartItems[this.id];
        count++;
        updateCart();
    }
    function decrease() {
        j = 0;
        if(cartItems[this.id]>0) {
            cartItems[this.id]--;        
            for(let [key, value] of Object.entries(cartItems)) {
                j++;
                if(key===this.id)
                    break;           
            }
            kol = document.getElementById(j);
            kol.textContent = cartItems[this.id];
            count--
            updateCart();
        }
        else {
            return;
        }
    }
    
  });

function updateCart() {
    
    var kosaricaDiv = document.getElementById("kosarica2");
    if(kosaricaDiv.hasChildNodes()) {
        kosaricaDiv.removeChild(kosaricaDiv.lastChild);
    }
    const circleDiv2 = document.createElement('div');
    circleDiv2.classList.add('circle2');
    const numberSpan2 = document.createElement('span');            
    if(circleDiv2.lastChild) {
        circleDiv2.removeChild(circleDiv2.lastChild);
    }
    numberSpan2.textContent = count;   
    kosaricaDiv.append(circleDiv2);
    if(circleDiv2.lastChild) {
        circleDiv2.removeChild(circleDiv2.lastChild);
    }
    circleDiv2.appendChild(numberSpan2);
    circleDiv2.style.display = 'flex';
    circleDiv2.style.transform = 'translate(0, -150%)';

  }