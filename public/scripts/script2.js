var cartItems = {};
var kljuc;
var count = 0;

document.addEventListener("DOMContentLoaded", function() {
    const nazivDiv = document.querySelector('.naziv');
    const kolicinaDiv = document.querySelector('.kolicina');
    
    fetch('/cart/getAll')
    .then(response => response.json())
    .then(data => {
        data.forEach((podatak) => {
            count += 1;
            if(!cartItems[podatak]){
                cartItems[podatak] = 1;
            }
            else {
                cartItems[podatak] = cartItems[podatak] + 1;
            }            
        });
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
    })
    .then( () => {

        const buttons = document.getElementsByName("btn_minus");
    
        const buttons2 = document.getElementsByName("btn_plus");
    
        var j = 0;
        for (const button of buttons2) {    
            button.addEventListener("click", increase);          
        }
        for (const button of buttons) {    
            button.addEventListener("click", decrease);          
        }     
    })
    .catch(error => {
        console.log('Greška46 ', error);
    });

    const button = document.querySelector('.logo');  
    button.addEventListener("click", goToHome);  
    function goToHome() {       
          
        window.location.href = "/home";
    }
});


function increase() {
    j = 0;
    cartItems[this.id]++;        
    for(let [key, value] of Object.entries(cartItems)) {
        j++;
        if(key===this.id)
            break;           
    }
    fetch(`/cart/add/${this.id}`, {method: 'POST',});
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
        fetch(`/cart/remove/${this.id}`, { method: 'POST' });
        kol = document.getElementById(j);
        kol.textContent = cartItems[this.id];
        count--;
        updateCart();        
    }
    else {
        return;
    }
}

function updateCart() {    
    
    var kosaricaDiv = document.getElementById("kosarica");
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
    if(count == 0) {
        circleDiv2.style.opacity = 0;    
    }

}


window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});