const Sequence = require("../Model/SequenceModel")

const generateId = async(role) => {
    const updateObj = { $inc: {} };
    updateObj.$inc[role] = 1;
    
    const sequence = await Sequence.findOneAndUpdate(
        {},
        updateObj,
        { new: true, upsert: true }
    );
    if(role === 'admin'){
        return `ADM${sequence.admin}`;
    }else if(role === 'doctor'){
        return `DOC${sequence.doctor}`;
    }else if(role === 'patient'){
        return `PAT${sequence.patient}`;
    }else{
        return null
    }
}

module.exports = {generateId}