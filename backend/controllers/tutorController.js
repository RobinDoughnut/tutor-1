import tutorModel from "../models/tutorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sessionModel from "../models/sessionModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { tutId } = req.body;

    const TutData = await tutorModel.findById(tutId);
    await tutorModel.findByIdAndUpdate(tutId, {
      available: !TutData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// GET ALL TUTORS LIST
const tutorsList = async (req, res) => {
  try {
    const tutors = await tutorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, tutors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API FOR Tutor Login
const loginTutor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tutor = await tutorModel.findOne({ email });
    if (!tutor) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, tutor.password);

    if (isMatch) {
      const token = jwt.sign({ id: tutor._id }, process.env.JWT_SECRET);

      res.json({ success: true, token });

    } else {
      res.json({success:false, message:"Invalid Credentials"})
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API TO GET DOCTOR SESSIONS FOR TUTOR PANEL
const sessionsTutor = async(req,res)=>{
  try {
    
    const tutId = req.tutId
    const sessions = await sessionModel.find({tutId})
    
    res.json({success:true, sessions})
    // console.log(sessions)
    // console.log(tutId)
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}

// API TO MARK SESSION COMPLETED FOR TUTOR PANEL
const sessionComplete = async (req,res)=>{
  try {
    const tutId = req.tutId
    const {sessionId} = req.body
    const sessionData = await sessionModel.findById(sessionId)
    if(sessionData && sessionData.tutId === tutId){
      await sessionModel.findByIdAndUpdate(sessionId, {isCompleted:true})
      return res.json({success:true, message: 'Session Completed'})
    } else {
      return res.json({success:false, message:"Action Failed"})
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}


// API TO CANCEL SESSION FOR TUTOR PANEL
const sessionCancel = async (req,res)=>{
  try {
    const tutId = req.tutId
    const {sessionId} = req.body
    const sessionData = await sessionModel.findById(sessionId)
    if(sessionData && sessionData.tutId === tutId){
      await sessionModel.findByIdAndUpdate(sessionId, {cancelled:true})
      return res.json({success:true, message: 'Session Cancelled'})
    } else {
      return res.json({success:false, message:"Action Failed"})
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}

// API TO GET DASHBOARD DATA FOR TUTOR PANEL
const tutorDashboard = async (req, res)=>{
  try {
        
    const tutId = req.tutId
    const sessions = await sessionModel.find({tutId})
    let earnings = 0
    sessions.map((session)=>{
      if(session.isCompleted || session.payment){
        earnings += session.amount
      }
    })
    
    let clients = []
    sessions.map((session)=>{
      if(!clients.includes(session.userId)){
        clients.push(session.userId)
      }
    })

    const dashData = {
      earnings,
      sessions:sessions.length,
      clients:clients.length,
      latestSessions: sessions.reverse().slice(0,5)
    }

    res.json({success:true, dashData})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}

// API TO GET TUTOR PROFILE FOR TUTOR PANEL
const tutorProfile = async(req,res)=>{
  try {
    const tutId = req.tutId
    const profileData = await tutorModel.findById(tutId).select('-password')
    
    res.json({success:true, profileData})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}


// API TO UPDATE TUTOR PROFILE DATA FROM TUTOR PANEL
const updateTutorProfile = async (req,res)=>{
  try {
    const tutId = req.tutId
    const {fees,address,available} = req.body
    
    await tutorModel.findByIdAndUpdate(tutId, {fees,address,available})
    res.json({success:true, message:"Profile Updated"})
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}


export { changeAvailability, tutorsList, loginTutor, sessionsTutor, sessionComplete, sessionCancel, tutorDashboard, tutorProfile, updateTutorProfile };
