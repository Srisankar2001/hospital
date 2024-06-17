export const validate = (input) => {
    let error = {
        email: "",
        password: "",
        name: "",
        dob: "",
        gender: "",
        contactNumber: "",
        address: "",
        department: "",
        image: ""
    }

    const name = input.name.trim()
    const email = input.email.trim()
    const password = input.password.trim()
    const dob = input.dob
    const gender = input.gender
    const contactNumber = input.contactNumber.trim()
    const address = input.address.trim()
    const department = input.department
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

    if(password === ""){
        error.password = "Password field is empty"
    }else if(/\s/.test(password)){
        error.password = "Invalid password"
    }else{
        error.password = ""
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
        if(age < 25){
            error.dob = "Underage to be a doctor"
        }else{
            error.dob = ""
        }
    }

    if(department === ""){
        error.department = "Select a department"
    }else{
        error.department = ""
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

    if(image === null){
        error.image = "Insert an image"
    }else{
        error.image = ""
    }

    return error
}