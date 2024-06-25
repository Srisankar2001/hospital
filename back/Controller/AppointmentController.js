const mongoose = require("mongoose")
const Appointment = require("../Model/AppointmentModel")
const Doctor = require("../Model/DoctorModel")
const Patient = require("../Model/PatientModel")

const create = async (req, res) => {
    console.log(req.body)
    const { patientId, doctorId, date, time } = req.body

    if (!patientId || !doctorId || !date || !time) {
        return res.status(400).json({ success: false, message: "Input necessary data" })
    }

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(400).json({ success: false, message: "Invalid patient ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
        return res.status(400).json({ success: false, message: "Invalid doctor ID" });
    }


    try {
        const doctor = await Doctor.findById(doctorId)
        const patient = await Patient.findById(patientId)

        if (!doctor || !patient) {
            return res.status(400).json({ success: false, message: "Doctor or Patient is not found" })
        }

        const appointment = new Appointment({
            patient: new mongoose.Types.ObjectId(patientId),
            doctor: new mongoose.Types.ObjectId(doctorId),
            date: date,
            time: time,
            status: "scheduled"
        })

        const savedAppointment = await appointment.save()
        if (!savedAppointment) {
            return res.status(400).json({ success: false, message: "Error in creating Appointment" })
        }

        patient.appointments.push(savedAppointment._id)
        doctor.appointments.push(savedAppointment._id)

        await patient.save()
        await doctor.save()

        return res.status(200).json({ success: true, message: "Appointment created successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const cancel = async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        return res.status(400).json({ success: false, message: "Input necessary data" });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid appointment ID" });
    }

    const id = new mongoose.Types.ObjectId(_id);

    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(400).json({ success: false, message: "Appointment not found" });
        }

        appointment.status = "cancelled"
        await appointment.save();

        return res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const complete = async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        return res.status(400).json({ success: false, message: "Input necessary data" });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, message: "Invalid appointment ID" });
    }

    const id = new mongoose.Types.ObjectId(_id);

    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(400).json({ success: false, message: "Appointment not found" });
        }

        appointment.status = "completed"
        await appointment.save();

        return res.status(200).json({ success: true, message: "Appointment completed successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getAll = async (req, res) => {
    try {
        const appointments = await Appointment.find({}).populate('doctor', 'id name').populate('patient', 'id name')
        return res.status(200).json({ success: true, data: appointments })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const appointmentController = {
   create,cancel,complete,getAll
}

module.exports = { appointmentController }