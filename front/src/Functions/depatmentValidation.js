export const validate = (input) => {
    let error = {
        name:"",
        description:"",
        image:""
    }

    const name = input.name.trim()
    const description = input.description.trim()
    const image = input.image

    if( name === ""){
        error.name = "Name field is empty"
    }else if(!(/^[A-Za-z][A-Za-z,\s]*$/.test(name))){
        error.name = "Invalid name"
    }else{
        error.name = ""
    }

    if( description === ""){
        error.description = "Description field is empty"
    }else{
        error.description = ""
    }

    if(image === null){
        error.image = "Insert an image"
    }else{
        error.image = ""
    }

    return error
}