export const validate = (input) => {
    let error = {
        email: "",
        password: "",
        cpassword:"",
        name: "",
        dob: "",
        gender: "",
        contactNumber: "",
        address: "",
        image: ""
    }

    const name = input.name.trim()
    const email = input.email.trim()
    const password = input.password.trim()
    const cpassword = input.cpassword.trim()
    const dob = input.dob
    const gender = input.gender
    const contactNumber = input.contactNumber.trim()
    const address = input.address.trim()
    const image = input.image

    if(name === ""){
        error.name = "Name field is empty"
    }else if(!(/^[a-zA-Z][a-zA-Z\s]*$/.test(name))){
        error.name = "Invalid name"
    }else{
        error.name = ""
    }

    if(email === ""){
        error.email = "Email field is empty"
    }else if(!(/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email))){
        error.email = "Invalid email"
    }else{
        error.email = ""
    }

    if(dob === ""){
        error.dob = "Select the Date of birth"
    }else{
        const birthDate = new Date(dob);
        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        if (currentDate < new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
            age--;
        }
        if(age < 16){
            error.dob = "Minimum age to register is 16"
        }else{
            error.dob = ""
        }
    }

    if(gender === ""){
        error.gender = "Select a gender"
    }else{
        error.gender = ""
    }

    if(contactNumber === ""){
        error.contactNumber = "Contact number field is empty"
    }else if(!(/^[0-9]{10}$/.test(contactNumber))){
        error.contactNumber = "Invalid contact number"
    }else{
        error.contactNumber = ""
    }
    
    if(address === ""){
        error.address = "Address field is empty"
    }else if(!(/^[a-zA-Z][a-zA-Z\s]*$/.test(address))){
        error.address = "Invalid address"
    }else{
        error.address = ""
    }

    if(password === ""){
        error.password = "Password field is empty"
    }else if(/\s/.test(password)){
        error.password = "Invalid password"
    }else{
        error.password = ""
    }

    if(cpassword === ""){
        error.cpassword = "Confirm Password field is empty"
    }else if(/\s/.test(password)){
        error.cpassword = "Invalid confirm password"
    }else if(password !== cpassword){
        error.cpassword = "Password and Confirm Password must be same"
    }else{
        error.cpassword = ""
    }

    if(image === null){
        error.image = "Insert an image"
    }else{
        error.image = ""
    }

    return error
}