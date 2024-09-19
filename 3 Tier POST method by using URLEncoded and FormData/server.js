const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer  = require("multer");

const storage = multer.diskStorage({
  destination:  (req, file, cb)=> {
    cb(null, 'uploads')
  },
  filename:  (req, file, cb)=> {
    console.log(file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${Date.now()}_${file.originalname}`);
  }
})

const upload = multer({ storage: storage })

let app = express();
app.use(cors());
app.use(express.json()); // It converts the JSO data to JSON and assign to req.body.
app.use(express.urlencoded()); // It internally converts the request to querystrings and params then assign to req.body.

let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    mobileNo:String,
    age:Number,
    profilePic:String,
})

let User = new mongoose.model("user",userSchema);


app.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  // console.log(req.files);

  try {
    let newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        mobileNo:req.body.mobileNo,
        age:req.body.age,
        profilePic: req.file.path,
      });
    
      await User.insertMany([newUser]);
      res.json({status:"Success",msg:"User created succesfully."});
    
  } catch (error) {
    res.json({status:"Failed",msg:"Unable to create user.",error});
  }
 });

app.listen(1234, () => {
    console.log("Port number is 1234");
  });

let connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Ravi:Ravi@createdatabase.29g4i.mongodb.net/Postdata?retryWrites=true&w=majority&appName=createDatabase"
    );
    console.log("Successfully connected to Database");
  } catch (error) {
    console.log("Unable to connect to Database", error);
  }
};

connectToDB();
