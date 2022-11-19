// counter code
const addToCart = document.getElementById("Add"),
removeFromCart = document.getElementById("Minus"),
productCounter = document.getElementById("counter");

addToCart.addEventListener("click",()=>{
    let currentCounter = Number(productCounter.innerText);
    productCounter.innerText  = currentCounter+1;
})

removeFromCart.addEventListener("click",()=>{
    let currentCounter = Number(productCounter.innerText);
    if(currentCounter === 0){
        return;
    }
    productCounter.innerText  = currentCounter-1;
})

//cart and dialog
const cart  = document.getElementById("cart"),
dialog = document.getElementById("dialog"),
cartCounter = document.getElementById("cartCounter"),
appendToCart = document.getElementById("appendToCart");


cart.onclick =()=>{
    
    let value = window.getComputedStyle(dialog).getPropertyValue('visibility');
    
    if(value === 'visible'){
        dialog.style.visibility = "hidden";
        return;
    }
    dialog.style.visibility = "visible";
    
} 

appendToCart.onclick = ()=>{
    let par = document.getElementById('productLobby');

    if(productCounter.innerText !== '0'){
        cartCounter.innerText = productCounter.innerText;
        cartCounter.style.visibility = "visible";
     
        let element = `<div  class=' grow flex justify-start items-center gap-[20px]'>
        <img class=' w-[50px] h-auto rounded-[5px]' src='./images/image-product-1-thumbnail.jpg' alt='product'/>
        <section class=' w-max flex flex-col justify-start items-start'>
        <p class=' text-slate-400'>Fall Limited Edition Sneakers</p>
        <p class='text-xl opacity-80'>$125.00 x ${productCounter.innerText} <b>$${(125*parseInt(productCounter.innerText)).toFixed(2)}</b></p>
        </section>
        <img id="removeSelection" class="hover:opacity-70" src='./images/icon-delete.svg' alt='delete selection'/>
    </div>
    <button class='w-full h-[60px] rounded-[10px] bg-orange-500 hover:bg-orange-300 text-center font-bold text-white'>Checkout</button>
    `
    par.innerHTML = element;
        
    document.getElementById('removeSelection').onclick = ()=>{
        productCounter.innerText = 0;
        cartCounter.innerText  = productCounter.innerText;
        cartCounter.style.visibility = 'hidden';
        par.innerHTML =`<p class="text-slate-400 mx-auto my-auto">your cart is empty</p>`; 
    }

    
    
    
    return;
    }
    
    par.innerHTML = `<p class="text-slate-400 mx-auto my-auto">your cart is empty</p>`;
    cartCounter.style.visibility = "hidden";

}


// thumbnail and code

const thumbnail = document.getElementById("thumbnail"),
display = document.getElementById("display").children.item(0);

thumbnail.addEventListener('click',(e)=>{  
    
    
    for(let i in thumbnail.children){
        if(thumbnail.children.item(i).firstChild == e.target){
            thumbnail.children.item(i).firstChild.style.border = "2px solid orange";
            continue;
        }
        thumbnail.children.item(i).firstChild.style.border = "none";
        
    }
    display.setAttribute('src',`./images/${e.target.id.toString()}.jpg`);
})


display.onclick = ()=>{    
  // adding the cover  and cut-paste the image component to the cover  
    let cover = createElementT('div',{id:'cover',class:'fixed w-screen h-screen left-0 top-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center'});    
    cover.append(document.adoptNode(document.getElementById('gallery'),true));



    //adding the close button functionality.
    let container  = createElementT('div',{class:'relative'});
    let closeButton =createElementT("div",{class:'absolute z-10 right-[100x] top-[-315px] w-[100px] h-[100px]'});
    let img = createElementT('img',{width:25,height:25,src:'./images/icon-close.svg',class:'invert'});
    closeButton.appendChild(img);



    closeButton.addEventListener("click",()=>{
            let parent = document.getElementsByTagName('main').item(0);
            let child = document.getElementById('gallery');
        parent.insertBefore(child,parent.children.item(0));
            cover.remove();
    })

    // now adding the move buttons onto the gallery
    let leftButtonContainer = createElementT('div',{class:'block w-[50px] h-[50px] h-auto fixed left-[700px] bg-white rounded-full top-[370px] flex justify-center items-center hover:opacity-50'});
    let rightButtonContainer = createElementT('div',{class:'block w-[50px] h-[50px] h-auto fixed left-[1175px] bg-white rounded-full top-[370px] flex justify-center items-center hover:opacity-50'});
    let leftButton = createElementT('img',{id:"next" ,class:'block max-w-[100%] h-auto ',src:'./images/icon-previous.svg'});
    let righttButton = createElementT('img',{ id:'prev', class:'block max-w-[100%] h-auto ',src:'./images/icon-next.svg'});
    leftButtonContainer.appendChild(leftButton);
    rightButtonContainer.appendChild(righttButton);
    
    let counter= 1;

    leftButtonContainer.onclick = ()=>{
        if(counter === 1){
            counter =4;
        display.setAttribute('src',`./images/image-product-${counter}.jpg`);            
        return;
        }
        counter--;
        display.setAttribute('src',`./images/image-product-${counter}.jpg`);
    }

    rightButtonContainer.onclick = ()=>{
        if(counter === 4){
            counter = 1;
            display.setAttribute('src',`./images/image-product-${counter}.jpg`);
            return;
        }
        counter++;
        display.setAttribute('src',`./images/image-product-${counter}.jpg`)
    }



    container.appendChild(closeButton);
    container.appendChild(leftButtonContainer);
    container.appendChild(rightButtonContainer);
    cover.appendChild(container);
 
    if(document.getElementById('cover')){
        return;
     }
    
   document.body.appendChild(cover);

}



function createElementT(type,obj){
    let element = document.createElement(type);

    for(let i in obj){
        element.setAttribute(i,obj[i]);
    }
    return element;
}