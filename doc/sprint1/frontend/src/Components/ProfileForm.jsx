import React, { useState } from "react";
import "../Asset/Css/profilePicture.css";

function ProfileForm() {
    const [modify, setModify] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [university, setUniversity] = useState("");
    const [major, setMajor] = useState("");
    const [habit, setHabit] = useState("");
    
    

    function handleModify(event){
      event.preventDefault();

      setModify(!modify);
    }
    function onChange(event){
      console.log(event.target.id);
      console.log(event.target.value);
      switch(event.target.id){
        case "firstName":
          setFirstName(event.target.value);
          break;
        case "lastName":
          setLastName(event.target.value);
          break;
        case "Email":
          setEmail(event.target.value);
          break;
        case "Phone":
          setPhone(event.target.value);
          break;
        case "University":
          setUniversity(event.target.value);
          break;
        case "Major":
          setMajor(event.target.value);
          break;
        case "Habit":
          setHabit(event.target.value);
          break;
        default:
          break;
      }
    }
    
    return (
      <form className="container">
            <h1 className="row justify-content-center">Profile</h1>
            <h2 className="row justify-content-center">Hi, {firstName} {lastName}</h2>
            <div className="row justify-content-end">
              <div className="col ">
                <img src="../../public/avatarPlaceHolder.png" alt="" className="rounded-circle avatar" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="mr-3" htmlFor="firstName">First name: </label>
                {modify?<input type="text" id="firstName" placeholder="Harry" onChange={onChange} value={firstName}/>:<input type="text" id="firstName" placeholder="Harry"   readOnly/>}
                <br/>
                <label htmlFor="lastName">Last name: </label>
                {modify?<input type="text" id="lastName" placeholder="Potter"  onChange={onChange} value={lastName}  />:<input type="text" id="lastName" placeholder="Potter"   readOnly/>}
                <br/>
                <label htmlFor="Email">Email: </label>
                {modify?<input type="email" id="Email" placeholder="abc@mail.com" onChange={onChange} value={email}  />: <input type="text" id="htmlhtmlFor" placeholder="abc@mail.com"   readOnly/>}
                <br/>
                <label htmlFor="Phone">Phone: </label>
                {modify?<input type="tel" id="Phone" placeholder="(123)-456-7890" onChange={onChange} value={phone}  />:<input type="text" id="Phone" placeholder="(123)-456-7890"   readOnly/>}
                <br/>
                <label htmlFor="University">University: </label>
                {modify?<input type="text" id="University" placeholder="Hogwarts" onChange={onChange} value={university}  />:<input type="text" id="University" placeholder="Hogwarts"   readOnly/>}
                <br/>
                <label htmlFor="Major">Major: </label>
                { modify?<input type="text" id="Major" placeholder="Magic" onChange={onChange} value={major}  />:<input type="text" id="Major" placeholder="Magic"   readOnly/>}
                <br/>
                <label htmlFor="Habit">Habit: </label>
                {modify?<input type="text" id="Habit" placeholder="Quidditch"  onChange={onChange} value={habit} />:<input type="text" id="Habit" placeholder="Quidditch"   readOnly/>}

              </div>
            </div>
                    
            <div >
                <button  onClick={handleModify}>{!modify?"Modified":"Confirm"}</button>
            </div>

          </form>
    );
}
export default ProfileForm;