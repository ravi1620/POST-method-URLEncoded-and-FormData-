import React, { useRef, useState } from "react";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let ageInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic,setprofilePic] = useState("/images/noImg.png")

  let onClickJSON = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let sendData = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobileNo: mobileNoInputRef.current.value,
      age: ageInputRef.current.value,
    };

    let requestOptions = {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify(sendData),
    };

    let jsonData = await fetch("http://localhost:1234/signup", requestOptions);
    let jsoData = await jsonData.json();
    console.log(jsoData);
    alert(jsoData.msg);
  };

  let onClickURLEncoded = async () => {
    let myHeaders = new Headers();
    myHeaders.append("content-type", "application/x-www-form-urlencoded");

    let dataToSend = new URLSearchParams();

    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: dataToSend,
    };

    let jsonData = await fetch("http://localhost:1234/signup", requestOptions);
    let jsoData = await jsonData.json();
    console.log(jsoData);
    alert(jsoData.msg);
  };

  let onClickFormData = async ()=>{

    let dataToSend = new FormData(); 
  
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    for(let i=0;i<profilePicInputRef.current.files.length; i++){
      dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
    };

    let requestOptions = {
      method: "POST",
      body:dataToSend,
    };

    let jsonData = await fetch("http://localhost:1234/signup", requestOptions);
    let jsoData = await jsonData.json();
    console.log(jsoData);
    alert(jsoData.msg);
  }
  return (
    <div>
      <form className="form">
        <div>
          <label className="label">First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label className="label">Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label className="label">Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label className="label">Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label className="label">Mobile Number</label>
          <input ref={mobileNoInputRef}></input>
        </div>
        <div>
          <label className="label">Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label className="label">Profile Pic</label>
          <input type="file" 
          ref={profilePicInputRef} 
          accept="image/*"
          onChange={(eo)=>{
let selectedImagePath = URL.createObjectURL(eo.target.files[0]);
setprofilePic(selectedImagePath);
          }}></input>
<img className="profilePicPreview" src={profilePic}></img>
        
        </div>
        <div className="buttonDiv">
          <button
            type="button"
            onClick={() => {
              onClickJSON();
            }}
          >
            Signup(JSON)
          </button>
        </div>
        <div className="buttonDiv">
          <button
            type="button"
            onClick={() => {
              onClickURLEncoded();
            }}
          >
            Signup(URLEncoded)
          </button>
        </div>
        <div className="buttonDiv">
          <button type="button" onClick={() => {
            onClickFormData();
          }}>
            Signup(Form Data)
          </button>
        </div>
        <br></br>
        <h1></h1>
      </form>
    </div>
  );
}

export default Signup;
