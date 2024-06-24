const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
require('dotenv').config();

const adminRouter = require("./Router/AdminRouter")
const patientRouter = require("./Router/PatientRouter")
const doctorRouter = require("./Router/DoctorRouter")
const departmentRouter = require("./Router/DepartmentRouter")
const loginRouter = require("./Router/LoginRouter")
const authRouter = require("./Router/AuthRouter")
const scheduleRouter = require("./Router/ScheduleRouter")
const appointmentRouter = require("./Router/AppointmentRouter")

const port = process.env.PORT || 3001
const mongoURI = process.env.MONGO_URI;

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())
app.use(express.static("upload"))

app.use("/admin",adminRouter)
app.use("/patient",patientRouter)
app.use("/doctor",doctorRouter)
app.use("/department",departmentRouter)
app.use("/login",loginRouter)
app.use("/auth",authRouter)
app.use("/schedule",scheduleRouter)
app.use("/appointment",appointmentRouter)

mongoose.connect(mongoURI)

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});
db.once('open', () => {
    console.log('MongoDB connection successful');
    app.listen(port, (err) => {
        if(err){
            console.log(`Server not running`);
        }else{
            console.log(`Server running successfully on port ${port}`);
        }
    });
});

