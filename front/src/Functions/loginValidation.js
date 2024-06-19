export const validate = (input) => {
    let error = {
        email: "",
        password: "",
    }

    const email = input.email.trim()
    const password = input.password.trim()
   
    if(email === ""){
        error.email = "Email field is empty"
    }else if(!(/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email))){
        error.email = "Invalid email"
    }else{
        error.email = ""
    }

    if(password === ""){
        error.password = "Password field is empty"
    }else if(/\s/.test(password)){
        error.password = "Invalid password"
    }else{
        error.password = ""
    }

    return error
}