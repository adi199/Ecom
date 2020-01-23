//var user = [{username:"Aditya",passcode:123}];
function validateForm(){
    console.log("here");
    var username = document.forms["form_data"]["username"].value;
    var passcode = document.forms["form_data"]["password"].value;
    console.log(username);
    var check = 0;
    /*for(var i=0;i<user.length;i++){
        if(username==user[i].username){
            if(passcode==user[i].passcode){
                check = 1;
                break;
            }
        }
    }
    if(check==1){
        window.open("main.html",_self);
        return true;
    }
    else{
        alert("Wrong username or password");
        return false;
    }*/
};