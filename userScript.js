var productId = 1;
var products = [];
var cart = [];
var cartId = 1;
var count = 0;
var order = [];
var divProductList = document.getElementById("divProductList");
var aAddProduct = document.getElementById("aAddProduct");

var obj = JSON.parse(localStorage.getItem('user'));
if(obj!=null){
  products = (obj);
  obj = JSON.parse(localStorage.getItem('cart'));
  if(obj!=null)
    cart = (obj); 
  console.log("cart :- "+cart);
  if(obj!=null)
    obj = JSON.parse(localStorage.getItem('order'));
}
if(localStorage.getItem('id')!=null){
  productId = JSON.parse(localStorage.getItem('id'));
}
$(document).ready(function(){
    console.log("has entered user panel");
    var aShowCart = document.getElementById("aShowCart");
    aShowCart.addEventListener("click",function(event){
        clearScreen();
        if(cart.length!=0)
            addProductToDOM(cart);
        else
            alert("No items in cart");
    });
});
    aShowProductList.addEventListener("click",function(event){
    clearScreen();
    if(products.length==0)
        alert("No products available");
    else
        addProductToDOM(products);
    //console.log(products);
    });
    function addProductToDOM(obj){
        var productName;
        var txtProductDesc;
        var productQuality;
        var productPrice;
        var productQuantity;
        var id;
        for(var i=0;i<obj.length;i++)
        {
            id = obj[i].ID;
            productName = obj[i].productName;
            txtProductDesc = obj[i].productDesc;
            productQuality = obj[i].productQuality;
            productPrice = obj[i].productPrice;
            productQuantity = obj[i].productQuantity;
            //console.log("Here :- "+productQuantity);
            var temp = document.createElement("div");
            temp.setAttribute("id",id);
            //console.log("product id :- "+id);
            var txt = document.createElement("p");
            txt.innerHTML = "Sno :- "+id;
            temp.appendChild(txt);
            addEmptyLine(temp,1);
            txt = document.createElement("p");
            txt.innerHTML = "Name :- "+productName;
            temp.appendChild(txt);
            addEmptyLine(temp,1);
            txt = document.createElement("p");
            txt.innerHTML = "Description :- "+txtProductDesc;
            temp.appendChild(txt);
            addEmptyLine(temp,1);
            txt = document.createElement("p");
            txt.innerHTML = "Quality :- "+productQuality;
            temp.appendChild(txt);
            addEmptyLine(temp,1);
            txt = document.createElement("p");
            txt.innerHTML = "Price :- "+productPrice;
            temp.appendChild(txt);
            addEmptyLine(temp,1);
            txt = document.createElement("p");
            txt.innerHTML = "Quantity :- "+productQuantity;
            temp.appendChild(txt);
            addEmptyLine(temp,1);
            var txt = document.createElement("button");
            txt.innerHTML = "Add to cart";
            txt.setAttribute("style","width:60px");
            txt.setAttribute("type","button");
            txt.setAttribute("id",id+" ");
            txt.setAttribute("onclick","addToCart("+id+")");
            temp.appendChild(txt);
            addEmptyLine(temp,1);
    
            divProductList.appendChild(temp);
        }
    };
    function addToCart(targetId){
    var flag = 0;
    for(var i=0;i<products.length;i++)
        if(targetId==products[i].ID)
        targetId = i;
    if(products[targetId].productQuantity!=0){
        //console.log("Before :- "+products[targetId-1].productQuantity);
        products[targetId].productQuantity--;
        console.log("No of items Left :- "+products[targetId].productQuantity);
        localStorage.setItem('user',JSON.stringify(products));
        if(cart.length!=0){
        for(var i=0;i<cart.length;i++)
            if(products[targetId].ID==cart[i].proID){
            console.log("Quantity :- "+cart[i].productQuantity++);
            flag = 1;
            }
        }
        if(flag==0){
        var obj = Object();
        obj.ID = cartId;
        obj.proID = ("proID",products[targetId].ID);
        obj.productName = ("productName" ,products[targetId].productName);
        obj.productDesc = ("productDesc" , products[targetId].productDesc);
        obj.productQuality = ("productQuality" , products[targetId].productQuality);
        obj.productPrice = ("productPrice",products[targetId].productPrice);
        obj.productQuantity = ("productQuantity" , 1);
        cart.push(obj);
        cartId++;
        console.log("Added item to cart");
        }
        flag=0;
        clearScreen();
        addProductToDOM(products);
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    else
        {
            products[targetId-1].productQuantity = "Out of stock";
            alert("Product is out of stock");
            clearScreen();
            addProductToDOM(products);
        }
    };
    function addEmptyLine(targetParent,count){
    var elem;
    for(var i=0;i<count;i++)
    {
        elem = document.createElement("br");
        targetParent.appendChild(elem);
    }
    };
    function clearScreen(){
    divProductList.innerHTML = "";
    };