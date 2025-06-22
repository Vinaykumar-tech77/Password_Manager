function togglePasswordInput() {
    const checkbox = document.getElementById("useGenerated");
    const passwordInput = document.getElementById("password");
    const generateBtn = document.getElementById("generateBtn");

    if (checkbox.checked) {
        passwordInput.disabled = true;
        passwordInput.value = ""; // clear manual input
        generateBtn.style.display = "inline-block";
    } else {
        passwordInput.disabled = false;
        generateBtn.style.display = "none";
    }
}


function generatePassword(length = 8) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randIndex = Math.floor(Math.random() * chars.length);
        password += chars[randIndex];
    }

    const passwordInput = document.getElementById("password");
    passwordInput.value = password;

    navigator.clipboard.writeText(password).then(() => {
        alert("Generated password copied to clipboard!");
    });
}





function maskPassword(pass){
    let str = ""
    for(let index = 0;index < pass.length; index++){
        str += "*"
    }
    return str
}
function copyText(txt){
    navigator.clipboard.writeText(txt).then(
        () => {
            //alert("Copied the Text:"+txt);
            const alertEl = document.querySelector(".alert");
                alertEl.classList.remove("alert");
                setTimeout(() => {
                    alertEl.style.display = "none";
                }, 2000);
        },
        () => {
            alert("Copying Failed!!!")
        },
    );
}
const deletePassword = (platform)=>{
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e)=>{
        return e.platform != platform
    })
    localStorage.setItem("passwords",JSON.stringify(arrUpdated))
    alert(`Sucessfully Deleted ${platform}'s Password!!!`)
    showPasswords()
}
showPasswords = ()=>{
let tb = document.querySelector("table")
let data = localStorage.getItem("passwords")
if(data == null || JSON.parse(data).length == 0){ 
    tb.innerHTML = "No Data Available!!!"
}
else{
    tb.innerHTML = `<tr>
                    <th>Platform</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Delete</th>
                </tr>`
    let arr = JSON.parse(data);
    let str = ""
    for(let index = 0;index<arr.length;index++){
        const element = arr[index];
        str += `<tr>
        <td>${element.platform}<img onclick="copyText('${element.platform}')" src="copy.svg" alt="Copy Icon" />
</td>
        <td>${element.username}<img onclick="copyText('${element.username}')" src="copy.svg" alt="Copy Icon"  />
</td>
        <td>${maskPassword(element.password)}<img onclick="copyText('${element.password}')" src="copy.svg" alt="Copy Icon" />
</td>
        <td><button class="btnn" onclick="deletePassword('${element.platform}')">Delete</button></td>
        </tr>`
    }
    tb.innerHTML = tb.innerHTML + str
}   
platform.value = ""
username.value = ""
password.value = "" 
}
console.log("Working");
showPasswords()
document.querySelector(".btn").addEventListener("click", (e)=>{
    e.preventDefault()
    console.log("Clicked");
    console.log(username.value, password.value);
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if(passwords == null){
        let json = []
        json.push({platform:platform.value,username:username.value,password:password.value})
        alert("Credentials Saved!!!")
        localStorage.setItem("passwords",JSON.stringify(json))
    }
    else{
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({platform:platform.value,username:username.value,password:password.value})
        alert("Credentials Saved!!!")
        localStorage.setItem("passwords",JSON.stringify(json))
    }
    showPasswords()
})
