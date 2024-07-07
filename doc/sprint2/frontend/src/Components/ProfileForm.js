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
import { useEffect } from 'react';

import { api_profile_fetch } from './api';
import { api_profile_update } from './api';

const uid = "Richie_Hsieh";

function ProfileForm() {
    const [modify, setModify] = useState(false);
    const [profiles, setProfiles] = useState({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      nationality: '',
      institution: '',
      age: 20,
      gender: '',
      major: [],
      minor: []
    });

    const callback = (data) => {
      setProfiles(data.profiles);
    };

    // Preload the data
    useEffect(() => {
        api_profile_fetch({uid: uid}, callback);
    }, []);

    const [habit, setHabit] = useState("");
    const minorNames = [
      'Mathematics',
      'Computer Science',
      'Statistics',
    ];
    const majorNames = [
      'Mathematics',
      'Computer Science',
      'Statistics',
    ];
    const nationalityNames = [
      'Canada',
      'Japan'
    ];


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
      if (modify){
        api_profile_update({uid: uid, profiles: profiles}, (data) => {
          console.log(data);
        });
      }
      setModify(!modify);
    }

    const onChange = (event) => {
      const { name, value } = event.target;
      setProfiles(prevProfiles => ({
        ...prevProfiles,
        [name]: value
      }));
    };
    
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
                  <h2 className="row justify-content-center">Hi, {profiles.first_name} {profiles.last_name}</h2>
                  <img src="../../public/avatarPlaceHolder.png" alt="" className="rounded-circle avatar" />
                  {modify?<input className="col-md-9" accept="image/*"  type="file" id="avatar" onChange={onChange} value={habit}  />: null}

                </div>
                
              </div>
              <div className="col-md-8 mb-3">
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="first_name">First name: </label>
                      <input className="col-md-8" type="text" id="first_name" name="first_name" onChange={onChange} value={profiles.first_name} readOnly={!modify}/>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="last_name">Last name: </label>
                      <input className="col-md-8" type="text" id="last_name" name="last_name" onChange={onChange} value={profiles.last_name} readOnly={!modify}/>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="email">Email: </label>
                      <input className="col-md-8" type="text" id="email" name="email" onChange={onChange} value={profiles.email} readOnly={!modify}/>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="phone_number">Phone Number: </label>
                      <input className="col-md-8" type="tel" id="phone_number" name="phone_number" onChange={onChange} value={profiles.phone_number} readOnly={!modify}/>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label" htmlFor="institution">Institution: </label>
                      <input className="col-md-8" type="text" id="institution" name="institution" onChange={onChange} value={profiles.institution} readOnly={!modify}/>  
                    </div>

                    <div style={{display:"flex", alignItems:"center"}}>
                      <label className="col-md-3 col-form-label" htmlFor="Major">Major: </label>
                      <FormControl sx={{ m: 1, width: 300 }} style={{background: "white"}}>
                        <InputLabel id="Major-multiple-checkbox-label">Major</InputLabel>
                        <Select
                          labelId="Major-multiple-checkbox-label"
                          id="Major-multiple-checkbox"
                          name="major"
                          multiple
                          value={profiles.major}
                          onChange={onChange}
                          input={<OutlinedInput label="Major" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                          readOnly={!modify}
                        >
                          {majorNames.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={profiles.major.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div style={{display:"flex", alignItems:"center"}}>
                      <label className="col-md-3 col-form-label" htmlFor="Minor">Minor: </label>
                      <FormControl sx={{ m: 1, width: 300 }} style={{background: "white"}}>
                        <InputLabel id="Minor-multiple-checkbox-label">Minor</InputLabel>
                        <Select
                          labelId="Minor-multiple-checkbox-label"
                          id="Minor-multiple-checkbox"
                          name="minor"
                          multiple
                          value={profiles.minor}
                          onChange={onChange}
                          input={<OutlinedInput label="Minor" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                          readOnly={!modify}
                        >
                          {minorNames.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={profiles.minor.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div style={{display:"flex", alignItems:"center"}}>
                      <label className="col-md-3 col-form-label" htmlFor="Nationality">Nationality: </label>
                      <FormControl sx= {{ m: 1, minWidth: 200 }} style={{background: "white"}}>
                        <InputLabel id="Nationality-label">Nationality</InputLabel>
                        <Select
                          labelId="Nationality-label"
                          id="Nationality-select"
                          name="nationality"
                          value={profiles.nationality}
                          label="Nationality"
                          onChange={onChange}
                          readOnly={!modify}
                        >
                          {nationalityNames.map((name) => (
                            <MenuItem key={name} value={name}>{name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>  
                    </div>

                    <div style={{display:"flex", alignItems:"center"}}>
                      <label className="col-md-3 col-form-label" htmlFor="Age">Age: </label>
                      <FormControl sx= {{ m: 1, minWidth: 200 }} style={{background: "white"}}>
                        <InputLabel id="Age-label">Age</InputLabel>
                        <Select
                          labelId="Age-label"
                          id="Age-select"
                          name="age"
                          value={profiles.age}
                          label="Age"
                          onChange={onChange}
                          readOnly={!modify}
                        >
                          <MenuItem value={18}>18</MenuItem>
                          <MenuItem value={19}>19</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                          <MenuItem value={21}>21</MenuItem>
                          <MenuItem value={22}>22</MenuItem>
                          <MenuItem value={23}>23</MenuItem>
                          <MenuItem value={24}>24</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    <div style={{display:"flex", alignItems:"center"}}>
                      <label className="col-md-3 col-form-label" htmlFor="Gender">Gender: </label>
                      <FormControl sx= {{ m: 1, minWidth: 200 }} style={{background: "white"}}>
                        <InputLabel id="Gender-label">Gender</InputLabel>
                        <Select
                          labelId="Gender-label"
                          id="Gender-select"
                          name="gender"
                          value={profiles.gender}
                          label="Gender"
                          onChange={onChange}
                          readOnly={!modify}
                        >
                          <MenuItem value={"Male"}>Male</MenuItem>
                          <MenuItem value={"Female"}>Female</MenuItem>
                          <MenuItem value={"Non-binary"}>Non-binary</MenuItem>
                        </Select>
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