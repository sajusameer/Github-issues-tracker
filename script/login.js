function login(){
    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()
    if(username === "admin" && password === "admin123"){
        window.location.href ="main.html"
    }else{
        alert("Wrong username or password. Please try again.")
    }
}





