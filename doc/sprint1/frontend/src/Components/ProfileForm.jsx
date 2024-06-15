import React, { useState } from "react";
import "../Asset/Css/profilePicture.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';



function ProfileForm() {
    const [modify, setModify] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [Institution, setInstitution] = useState("");
    const [major, setMajor] = useState("");
    const [habit, setHabit] = useState("");
    const [age, seMinore] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [Minor, setMinor] = React.useState('');
    const [minorName, setminorName] = React.useState([]);
    const [majorName, setmajorName] = React.useState([]);
    const minorNames = [
      'Economics',
      'Computer Science',
      'Statistic',
      'Ralph Hubbard',
      'Omar Alexander',
      'Carlos Abbott',
      'Miriam Wagner',
      'Bradley Wilkerson',
      'Virginia Andrews',
      'Kelly Snyder',
    ];
    const majorNames = [
      'Economics',
      'Computer Science',
      'Statistic'];

    const [nationality, setNationality] = React.useState('');

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    
    

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
        case "Institution":
          setInstitution(event.target.value);
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
      <div className="container">
        
        <div className="card">
          <div className="card-body">
            <div className="row">
              <h1 className="titleForPersonalInfo">Personal Information</h1>
              
            </div>
            <form className="row">
              <div className="col-md-4">
                <div className="d-flex flex-column justify-content-around align-items-center">
                  <h2 className="row justify-content-center">Hi, {firstName} {lastName}</h2>
                  <img src="../../public/avatarPlaceHolder.png" alt="" className="rounded-circle avatar" />
                  {modify?<input className="col-md-9" accept="image/*"  type="file" id="avatar" onChange={onChange} value={habit}  />: null}

                </div>
                
              </div>
              <div className="col-md-8 mb-3">
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="firstName">First name: </label>
                      {modify?<input className="col-md-8" type="text" id="firstName"  onChange={onChange} value={firstName}/>:<input className="col-md-8" type="text" id="firstName"    readOnly/>}
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="lastName">Last name: </label>
                      {modify?<input className="col-md-8" type="text" id="lastName" onChange={onChange} value={lastName}/>:<input className="col-md-8" type="text" id="lastName"   readOnly/>}
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="Email">Email: </label>
                      {modify?<input className="col-md-8" type="text" id="Email"  onChange={onChange} value={email}  />:<input type="text" className="col-md-8" id="Email"    readOnly/>}
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="Phone">Phone: </label>
                      {modify?<input className="col-md-8" type="tel" id="Phone"  onChange={onChange} value={phone}  />:<input type="text" className="col-md-8" id="Phone"    readOnly/>}
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="Institution">Institution: </label>
                      {modify?<input className="col-md-8" type="text" id="Institution"  onChange={onChange} value={Institution}  />:<input type="text" className="col-md-8" id="Institution"    readOnly/>}
                    </div>

                    <div style={{display:"flex", alignItems:"center"}}>
                    
                      <label className="col-md-3 col-form-label" htmlFor="Major">Major: </label>
                      <FormControl sx={{ m: 1, width: 300 }} style={{background: "white"}}>
                        <InputLabel id="Major-multiple-checkbox-label">Major</InputLabel>
                        {modify?<Select
                          labelId="Major-multiple-checkbox-label"
                          id="Major-multiple-checkbox"
                          multiple
                          value={majorName}
                          onChange=""
                          input={<OutlinedInput label="Major" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                          
                        >
                          {majorNames.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={majorName.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>:<Select
                          labelId="Major-multiple-checkbox-label"
                          id="Major-multiple-checkbox"
                          multiple
                          value={majorName}
                          onChange=""
                          input={<OutlinedInput label="Major" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                          readOnly
                        >
                          {majorNames.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={majorName.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>}
                      </FormControl>
                      
                    </div>
                    <div style={{display:"flex", alignItems:"center"}}>
                    
                      <label className="col-md-3 col-form-label" htmlFor="Minor">Minor: </label>
                      <FormControl sx={{ m: 1, width: 300 }} style={{background: "white"}}>
                        <InputLabel id="Minor-multiple-checkbox-label">Minor</InputLabel>
                        {modify?<Select
                          labelId="Minor-multiple-checkbox-label"
                          id="Minor-multiple-checkbox"
                          multiple
                          value={minorName}
                          onChange=""
                          input={<OutlinedInput label="Minor" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                          
                        >
                          {minorNames.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={minorName.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>:<Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={minorName}
                          onChange=""
                          input={<OutlinedInput label="Minor" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                          readOnly
                        >
                          {minorNames.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={minorName.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>}
                      </FormControl>
                      
                    </div>
                    <div style={{display:"flex", alignItems:"center"}}>
                    
                      <label className="col-md-3 col-form-label" htmlFor="firstName">Nationality: </label>
                      <FormControl sx= {{ m: 1, minWidth: 200 }} style={{background: "white"}}>
                        <InputLabel id="Nationality-label">Nationality</InputLabel>
                        {modify?<Select
                          labelId="Nationality-label"
                          id="Nationality-select"
                          value={nationality}
                          label="Nationality"
                          onChange=""
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>:<Select
                          labelId="Nationality-label"
                          id="Nationality-select"
                          value={nationality}
                          label="Nationality"
                          onChange=""
                          readOnly
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>}
                      </FormControl>
                      
                    </div>
                    <div style={{display:"flex", alignItems:"center"}}>
                    
                      <label className="col-md-3 col-form-label" htmlFor="firstName">Age: </label>
                      <FormControl sx= {{ m: 1, minWidth: 200 }} style={{background: "white"}}>
                        <InputLabel id="Age-label">Age</InputLabel>
                        {modify?<Select
                          labelId="Age-label"
                          id="Age-select"
                          value={age}
                          label="Age"
                          onChange=""
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>:<Select
                          labelId="Age-label"
                          id="Age-select"
                          value={age}
                          label="Age"
                          onChange=""
                          readOnly
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>}
                      </FormControl>
                      
                    </div>
                    <div style={{display:"flex", alignItems:"center"}}>
                      <label className="col-md-3 col-form-label" htmlFor="firstName">Gender: </label>
                      <FormControl sx= {{ m: 1, minWidth: 200 }} style={{background: "white"}}>
                      <InputLabel id="Gender-label">Gender</InputLabel>
                      {modify?<Select
                        labelId="Gender-label"
                        id="Gender-select"
                        value={gender}
                        label="Gender"
                        onChange=""
                        
                      >
                        <MenuItem value={"Man"}>Man</MenuItem>
                        <MenuItem value={"Woman"}>Woman</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>: <Select
                        labelId="Gender-label"
                        id="Gender-select"
                        value={gender}
                        label="Gender"
                        onChange=""
                        readOnly
                      >
                        <MenuItem value={"Man"}>Man</MenuItem>
                        <MenuItem value={"Woman"}>Woman</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>}
                    </FormControl>
                    
                    </div>
                    
                    
              </div>
            </form>
            <div className="row justify-content-center">
              <button className="col-md-2 btn btn-primary" onClick={handleModify}>{modify?"Save":"Modify"}</button>
            </div>
          </div>

        </div>

      </div>
      
    );
}
export default ProfileForm;