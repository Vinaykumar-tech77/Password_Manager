let tb = document.querySelector("table")
let data = localStorage.getItem("passwords")
if(data == null){
    tb.innerHTML = "No Data Available!!!"
}
else{
    let arr = JSON.parse(data);
    let str = ""
    for(let index = 0;index<arr.length;i++){
        const element = arr[index];
        str= `<tr>
        <td>${element.platform}</td>
        <td>${element.username}</td>
        <td>${element.password}</td>
        <td>${"delete"}</td>
        </tr>`
    }
    tb.innerHTML = tb.innerHTML + str
}
console.log("Working");
document.querySelector(".btn").addEventListener("click", (e)=>{
    e.preventDefault()
    console.log("Clicked");
    console.log(username.value, password.value);
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if(passwords == null){
        let json = []
        json.push({username:username.value,password:password.value})
        alert("Credentials Saved!!!")
        localStorage.setItem("passwords",JSON.stringify(json))
    }
    else{
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({username:username.value,password:password.value})
        alert("Cerdentials Saved!!!")
        localStorage.setItem("passwords",JSON.stringify(json))
    }
})