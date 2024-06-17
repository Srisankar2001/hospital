export const validate = (input) => {
    let error = {
        name:"",
        description:""
    }

    const name = input.name.trim()
    const description = input.description.trim()

    if( name === ""){
        error.name = "Name field is empty"
    }else if(!(/^[A-Za-z]+$/.test(name))){
        error.name = "Invalid name"
    }else{
        error.name = ""
    }

    if( description === ""){
        error.description = "Description field is empty"
    }else{
        error.description = ""
    }


    return error
}