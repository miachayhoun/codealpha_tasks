document.getElementById("loginForm").addEventListener("submit",function(event){
    event.preventDefault();//prevent refreshing page

    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;

    if(username==="admin" && password==="admin123"){
        document.getElementById("message").innerText="Login Succesful";
    }else{
        document.getElementById("message").innerText="Access denied";
    }
});
