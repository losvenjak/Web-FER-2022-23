var currentCat;
var podaci;
var nazivi = {}


function addNumber(kosaricaDiv) {
    if(kosaricaDiv.lastChild) {
        kosaricaDiv.removeChild(kosaricaDiv.lastChild);
    }
    const circleDiv = document.createElement('div');
    circleDiv.classList.add('circle');
    kosaricaDiv.append(circleDiv);
    const numberSpan = document.createElement('span');
    let sum = 0;
    for (let value of Object.values(nazivi)) {
        sum += value;
    }
    numberSpan.textContent = sum;
    circleDiv.appendChild(numberSpan);
    circleDiv.style.display = 'flex';
    circleDiv.style.transform = 'translate(0, -150%)';
}

function addToCart(podatak) {    
    let naziv = podatak.name;
    if(naziv in nazivi) {
        let brojac = nazivi[naziv];
        brojac = brojac + 1;
        nazivi[naziv] = brojac;
    }
    else {
        nazivi[naziv] = 1;
    }   
}

function uploadData(category) {
    currentCat = category
    katNaslovDiv = document.querySelector('.katNaslov');
    katNaslov = document.createElement('h1');
    katNaslov.textContent = category;
    katNaslovDiv.textContent = '';
    katNaslovDiv.append(katNaslov);  
    data.categories.forEach((kat) => {
        if (kat.name === category) {
            podaci = kat.products;
        }
    });    

    const myClass2 = document.querySelector('.proizvodi');
    while (myClass2.lastChild) {
        myClass2.removeChild(myClass2.lastChild);
    }
    for (let i = 0; i < podaci.length; i++) {
        const product = podaci[i];
        const myDiv = document.createElement('div');        
        const myClass = document.querySelector('.proizvodi');
        const myImg = document.createElement('img');       
        myImg.src = `images/${product.image}`;      
        myDiv.appendChild(myImg);
        myImg.style.maxHeight = '500px';
        const circleDiv = document.createElement('div');
        const circleDiv2 = document.createElement('div');
        circleDiv.classList.add('circle');
        circleDiv2.classList.add('circle2');
        myDiv.appendChild(circleDiv);
        let a = product.name;               
        myDiv.append(a);
        myDiv.style.textAlign = "center";       
        const cartImg = document.createElement('img');
        cartImg.src = 'images/ko.png';
        cartImg.classList.add('cart-img');
        cartImg.style.position = 'relative';
        cartImg.style.opacity = 0;        
        cartImg.style.transform = 'translate(0, -120%)';
        myDiv.appendChild(cartImg);

        myImg.addEventListener('mouseenter', function() {
            cartImg.style.opacity = 0.7;
            cartImg.style.cursor = 'pointer';
        });

        cartImg.addEventListener('mouseenter', function() {
            cartImg.style.opacity = 0.7;
            cartImg.style.cursor = 'pointer';
        });

        myImg.addEventListener('mouseleave', function() {
            cartImg.style.opacity = 0;
            cartImg.style.cursor = 'default';
        });
        cartImg.addEventListener('mouseleave', function() {
            cartImg.style.opacity = 0;
            cartImg.style.cursor = 'default';
        });

        if(podaci[i].name in nazivi) {
            const numberSpan = document.createElement('span');
            numberSpan.textContent = nazivi[podaci[i].name].toString();
            if(circleDiv.lastChild) {
                circleDiv.removeChild(circleDiv.lastChild);
            }
            circleDiv.appendChild(numberSpan);
            circleDiv.style.display = 'flex';
            circleDiv.style.transform = 'translate(0, -150%)';
        }

        cartImg.addEventListener('click', function() {
            addToCart(podaci[i]);
            const numberSpan = document.createElement('span');            
            if(podaci[i].name in nazivi) {
                numberSpan.textContent = nazivi[podaci[i].name].toString();                
            }
            else {
                numberSpan.textContent = '1';
            }
            if(circleDiv.lastChild) {
                circleDiv.removeChild(circleDiv.lastChild);
            }
            circleDiv.appendChild(numberSpan);
            circleDiv.style.display = 'flex';
            circleDiv.style.transform = 'translate(0, -150%)';
            let numberSpan2 = document.createElement('span');
            const kosaricaDiv = document.getElementById('kosarica');
            if(kosaricaDiv.hasChildNodes()) {
                kosaricaDiv.removeChild(kosaricaDiv.lastChild);
            }
            kosaricaDiv.append(circleDiv2);
            if(circleDiv2.lastChild) {
                circleDiv2.removeChild(circleDiv2.lastChild);
            }
            let sum = 0;
            for (let value of Object.values(nazivi)) {
                sum += value;
            }
            numberSpan2.textContent = sum.toString();
            circleDiv2.appendChild(numberSpan2);
            circleDiv2.style.display = 'flex';
            circleDiv2.style.transform = 'translate(0, -150%)';
        });
        myClass.appendChild(myDiv);
    }    
}

document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("btn_kosarica");  
    button.addEventListener("click", goToCart);  
    function goToCart() {       
        const params = new URLSearchParams();
        for (let [key, value] of Object.entries(nazivi)) {                
                params.append(key, value);               
        }       
        window.location.href = "cart.html?" + params.toString();      
    }
  });
