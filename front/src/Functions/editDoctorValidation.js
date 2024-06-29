export const validate = (input) => {
    let error = {
        name: "",
        dob: "",
        gender: "",
        contactNumber: "",
        address: "",
        image: ""
    }

    const name = input.name.trim()
    const dob = input.dob
    const gender = input.gender
    const contactNumber = input.contactNumber.trim()
    const address = input.address.trim()
    const image = input.image

    if(name === ""){
        error.name = "Name field is empty"
    }else if(!(/^[a-zA-Z]{2,}( [a-zA-Z]{2,})?$/.test(name))){
        error.name = "Invalid name"
    }else{
        error.name = ""
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

    return error
}