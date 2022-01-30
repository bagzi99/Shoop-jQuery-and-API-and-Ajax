let xhttp= new XMLHttpRequest();
var url='https://61e2a7603050a10017682211.mockapi.io/product';
xhttp.onreadystatechange=function(){
    if(this.readyState == 4 && this.status == 200){

        let obj=JSON.parse(this.responseText);
        let productsEl=document.getElementById('products'); 
        let html='';

        for (let i = 0; i< obj.length; i++) {          
            html+="<div class='col-md-4 card-items'>"+
            "<div class='card'>"+
            "<img src='"+obj[i].product_image+"' alt=''>"+
            "<div class='card-body'>"+
            "<h5 class='card-title'>"+obj[i].product_name+"</h5>"+
            "<p class='card-text'>$"+obj[i].product_price+"</p>"+
            "<button onclick='add_to_cart(this)' data_product_id='"+obj[i].id+"' class='btn btn-primary'>Add to cart</button>"+
            "<button onclick='see_more(this)' data_product_id='"+obj[i].id+"' class='btn btn-info' data-bs-toggle='modal' data-bs-target='#seeMoreModal'>See more</button>"+
            
            "</div>"+
            "</div>"+
            "</div>";
        }
        productsEl.innerHTML=html;
    }
}

xhttp.open("GET" ,url , true);
xhttp.send();


let itemAlreadyAdded=false;
let totalPrice=0;
function add_to_cart(el){
    
    let id=el.getAttribute('data_product_id');

    if(!itemAlreadyAdded){
        document.getElementById('myCart').innerHTML="<div class='row'>"+
                                                    "<div class='col-md-9'><h3>Your cart items</h3></div>"+
                                                    "<div class='col-md-3'><b>Total:</b>$<span id='totalPrice'></span></div>"+    

                                                "</div>";
        itemAlreadyAdded=true;
    }
    
    let xhttp= new XMLHttpRequest();
    var url='https://61e2a7603050a10017682211.mockapi.io/product/'+id;  /** kosa crta pa dodamo +id to da bi smo doboli podatke samo od tog odabranog */
    xhttp.onreadystatechange=function(){
     if(this.readyState == 4 && this.status == 200){

        let obj=JSON.parse(this.responseText);
        
        document.getElementById('myCart').innerHTML+="<div class='row cart-items' id='cart-item-"+obj.id+"'>"+
                                                        "<div class='col-md-4'>"+obj.product_name+"</div>"+
                                                        "<div class='col-md-3'><b>Material:</b>"+obj.product_material+"</div>"+
                                                        "<div class='col-md-2'><b>Price</b>"+obj.product_price+"</div>"+
                                                        "<div class='col-md-2'><button onclick=remowe_from_cart(this) data-product_id='"+obj.id+"' data-product_price='"+obj.product_price+"' class='btn btn-danger' type='button'>Remove from cart</button></div>"+

                                                        "</div>"; 
                                                                      
        totalPrice+=parseFloat(obj.product_price);
        document.getElementById('totalPrice').innerHTML=totalPrice;
        
        }
        
    }
    xhttp.open("GET" ,url , true);
    xhttp.send();
}


function see_more(el){

    let id=el.getAttribute('data_product_id');

    let xhttp= new XMLHttpRequest();
    var url='https://61e2a7603050a10017682211.mockapi.io/product/'+id;  /** kosa crta pa dodamo +id to da bi smo doboli podatke samo od tog odabranog */
    xhttp.onreadystatechange=function(){
     if(this.readyState == 4 && this.status == 200){

        let obj=JSON.parse(this.responseText);
        
        document.getElementById('productDetails').innerHTML="<p>"+obj.product_descrption+"</p>"+
                                                             "<p><b>Material:</b>"+obj.product_material+"</p>"+
                                                             "<p><b>Price:$ </b>"+obj.product_price+"</p>";               
                                                                            
        
        }
        
    }
    xhttp.open("GET" ,url , true);
    xhttp.send();
}

function remowe_from_cart(el){

    let id=el.getAttribute('data-product_id');

    document.getElementById('cart-item-'+id).remove();

    let total=parseInt(document.getElementById('totalPrice').innerText);
    total=total-parseInt(el.getAttribute('data-product_price'));
    document.getElementById('totalPrice').innerText=total;


}
