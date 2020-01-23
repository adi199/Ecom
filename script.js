var productId = 1;
var products = [];
var cart = [];
var cartId = 1;
var count = 0;
var order = [];

var divProductList = document.getElementById("divProductList");
var aAddProduct = document.getElementById("aAddProduct");
var divProductForm = document.getElementById("divProductForm");
var obj = JSON.parse(localStorage.getItem('products'));

if(obj!=null){
  products = (obj);
obj = JSON.parse(localStorage.getItem('order'));
if(obj!=null)
  cart = (obj);  
}
if(localStorage.getItem('id')!=null){
  productId = JSON.parse(localStorage.getItem('id'));
}
$(document).ready(function(){
  console.log("Has entered admin panel");
  aAddProduct.addEventListener("click",function(event){
    showProductForm();
  });
  aClearStorage.addEventListener("click",function(event){
    localStorage.removeItem('products');
    localStorage.removeItem('id');
    localStorage.removeItem('cart');
  });
});
aShowProductList.addEventListener("click",function(event){
  clearScreen();
  if(products.length==0)
    alert("No products available");
  else
    addProductToDOM(products);
});
function showProductForm(){
  hideAddproductLink();
  clearScreen();
  var contain = document.createElement("div");
  contain.setAttribute("id","divFormContainer");
  divProductForm.setAttribute("style","display:block");
  var elem = document.createElement("label");
  elem.innerHTML = "Enter Product details";
  contain.appendChild(elem);
  addEmptyLine(contain,2);
  elem = document.createElement("input");
  elem.setAttribute("type","text");
  elem.setAttribute("id","inputProductName");
  elem.setAttribute("placeholder","Enter Product Name");
  elem.setAttribute("style","width:250px");
  contain.appendChild(elem);
  addEmptyLine(contain,2);
  elem = document.createElement("textarea");
  elem.setAttribute("type","text");
  elem.setAttribute("id","inputProductdesc");
  elem.setAttribute("placeholder","Enter Product description");
  elem.setAttribute("style","width:250px;height:100px");
  contain.appendChild(elem);
  addEmptyLine(contain,2);
  elem = document.createElement("input");
  elem.setAttribute("type","text");
  elem.setAttribute("id","inputProductPrice");
  elem.setAttribute("placeholder","Enter Product Price");
  elem.setAttribute("style","width:250px");
  contain.appendChild(elem);
  addEmptyLine(contain,2);
  elem = document.createElement("input");
  elem.setAttribute("type","text");
  elem.setAttribute("id","inputProductQualtiy");
  elem.setAttribute("placeholder","Enter Product Quality");
  elem.setAttribute("style","width:250px");
  contain.appendChild(elem);
  addEmptyLine(contain,2);
  elem = document.createElement("input");
  elem.setAttribute("type","text");
  elem.setAttribute("id","inputProductQuantity");
  elem.setAttribute("placeholder","Enter Product Quantity");
  elem.setAttribute("style","width:250px");
  contain.appendChild(elem);
  addEmptyLine(contain,2);
  elem = document.createElement("button");
  elem.innerHTML = "<b>Add Product</b>";
  elem.setAttribute("type","submit");
  elem.setAttribute("id","inputProductsubmitbtn");
  elem.setAttribute("style","width:90px");
  contain.appendChild(elem);
  count+=1;
  divProductForm.appendChild(contain);

  elem.addEventListener("click",function(event){
    addProductToList();
    hideProductForm();
  });
};
function editProductItem(targetId){
  hideAddproductLink();
  clearScreen();
  console.log("targetId :- "+targetId)
  for(var i=0;i<products.length;i++)
    if(targetId==products[i].ID)
      targetId = i+1;
  console.log("array index :- "+targetId);
  var productName = products[targetId-1].productName;
  var productDesc = products[targetId-1].productDesc;
  var productPrice = products[targetId-1].productPrice;
  var productQuality = products[targetId-1].productQuality;
  var productQuantity = products[targetId-1].productQuantity;
  //Creating form with older input field value as placeholders
  var contain = document.createElement("div");
  contain.setAttribute("id","divFormContainer");
  divProductForm.setAttribute("style","display:block");
  var elem = document.createElement("label");
  elem.innerHTML = "Enter Product details";
  contain.appendChild(elem);
  addEmptyLine(contain,2);
  elem = document.createElement("input");
  elem.setAttribute("type","text");
  elem.setAttribute("id","inputProductName");
  elem.setAttribute("placeholder",productName);
  console.log("edit name item :- "+productName);
  elem.setAttribute("style","width:250px");
  contain.appendChild(elem);
  addEmptyLine(contain,2);
  elem = document.createElement("textarea");
  elem.setAttribute("type","text");
  elem.setAttribute("id","inputProductdesc");
  elem.setAttribute("placeholder",productDesc);
  elem.setAttribute("style","width:250px;height:100px");
  contain.appendChild(elem);
  addEmptyLine(contain,2);
  elem = document.createElement("input");
  elem.setAttribute("type","text");
  elem.setAttribute("id","inputProductPrice");
  elem.setAttribute("placeholder",productPrice);
  elem.setAttribute("style","width:250px");
  contain.appendChild(elem);
  addEmptyLine(contain,2);
  elem = document.createElement("input");
  elem.setAttribute("type","text");
  elem.setAttribute("id","inputProductQualtiy");
  elem.setAttribute("placeholder",productQuality);
  elem.setAttribute("style","width:250px");
  contain.appendChild(elem);
  addEmptyLine(contain,2);
  elem = document.createElement("input");
  elem.setAttribute("type","text");
  elem.setAttribute("id","inputProductQuantity");
  elem.setAttribute("placeholder",productQuantity);
  elem.setAttribute("style","width:250px");
  contain.appendChild(elem);
  addEmptyLine(contain,2);
  elem = document.createElement("button");
  elem.innerHTML = "<b>Update</b>";
  elem.setAttribute("type","submit");
  elem.setAttribute("id","inputProductsubmitbtn");
  elem.setAttribute("style","width:60px");
  contain.appendChild(elem);
  count+=1;
  divProductForm.appendChild(contain);

  //Updating values in the products array
  elem.addEventListener("click",function(event){
    products[targetId-1].productName = document.getElementById("inputProductName").value;
    products[targetId-1].productDesc = document.getElementById("inputProductdesc").value;
    products[targetId-1].productPrice = document.getElementById("inputProductPrice").value;
    products[targetId-1].productQuality = document.getElementById("inputProductQualtiy").value;
    products[targetId-1].productQuantity = document.getElementById("inputProductQuantity").value;
    hideProductForm();
    clearScreen();
    addProductToDOM(products);
    localStorage.setItem('products',products);
  });
};
function hideProductForm(){
  divProductForm.removeChild(document.getElementById("divFormContainer"));
  divProductForm.setAttribute("style","display:none");
};
function addProductToList(){
  var productName = document.getElementById("inputProductName");
  var txtProductDesc = document.getElementById("inputProductdesc");
  var productQuality = document.getElementById("inputProductQualtiy");
  var productPrice = document.getElementById("inputProductPrice");
  var productQuantity = document.getElementById("inputProductQuantity");
  var obj  = new Object();
  obj.ID = productId;
  obj.productName = productName.value;
  obj.productDesc = txtProductDesc.value;
  obj.productQuality = productQuality.value;
  obj.productPrice = productPrice.value;
  obj.productQuantity = inputProductQuantity.value;

  products.push(obj);
  clearScreen();
  addProductToDOM(products);
  productId++;
  localStorage.setItem('products',JSON.stringify(products));
  localStorage.setItem('id',productId);
};
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
    txt.innerHTML = "edit";
    txt.setAttribute("style","width:60px");
    txt.setAttribute("type","button");
    txt.setAttribute("id",id+" ");
    txt.setAttribute("onclick","editProductItem("+id+")");
    temp.appendChild(txt);
    var txt = document.createElement("button");
    txt.innerHTML = "remove";
    txt.setAttribute("style","width:60px");
    txt.setAttribute("type","button");
    txt.setAttribute("id",id+" ");
    txt.setAttribute("onclick","deleteProductItem("+id+")");
    temp.appendChild(txt);
    divProductList.appendChild(temp);
    if(access=="admin")
      aAddProduct.setAttribute("style","visibility:block");
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
function hideAddproductLink(){
  aAddProduct.setAttribute("style","visibility:hidden");
  aShowProductList.setAttribute("style","visibility:hidden");
};
function deleteProductItem(targetId){
  for(var i=0;i<products.length;i++)
    if(targetId==products[i].ID)
      targetId = i+1;
  products.splice((targetId-1),1);
  clearScreen();
  addProductToDOM(products);
  localStorage.setItem('products',JSON.stringify(products));
  unHideAddNewProductLink();
};
function unHideAddNewProductLink(){
  aAddProduct.setAttribute("style","visibility:block");
};
function clearScreen(){
  divProductList.innerHTML = "";
};
