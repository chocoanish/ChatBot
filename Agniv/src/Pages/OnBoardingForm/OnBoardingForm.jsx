import React, { useDebugValue, useState } from 'react';
import { ArrowRight, Users, Check, Plus, Trash2 } from 'lucide-react';
import './OnBoardingForm.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const OnBoardingForm = () => {
  const [isLoading, setIsLoading] = useState("");
    const navigate = useNavigate();
    const fn = localStorage.getItem("User_Data");
    const parsedData = JSON.parse(fn);
  const [experiences, setExperiences] = useState([{
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    startDate: '',
    endDate: ''
  }]);

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const userData = {
    firstName: parsedData.firstName,
    lastName: parsedData.lastName,
    email: parsedData.email,
    password: parsedData.password,
    role: parsedData.role,
    phone: parsedData.phone,
    gender: parsedData.gender,
    experienceList: experiences,
    skillList: skills
  };

  let steps = [
    { id: 1, name: 'Create account', status: 'completed' },
    { id: 2, name: 'Experiences', status: 'current' },
    { id: 3, name: 'Skills', status: 'upcoming' },
    { id: 4, name: 'Let\'s get you started', status: 'upcoming' }
  ];

  const addExperience = () => {
    setExperiences([...experiences, {
      companyName: '',
      jobTitle: '',
      jobDescription: '',
      startDate: '',
      endDate: ''
    }]);
  };
  
  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.find(s => s.skill === newSkill.trim())) {
      setSkills([...skills, { skill: newSkill.trim() }]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s.skill !== skillToRemove));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://philosophical-karlene-garibrath-9eb650cd.koyeb.app/auth/signup",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios(config.url, {
        method: config.method,
        data: userData, // Include userData in the request body
        maxBodyLength: config.maxBodyLength,
        headers: config.headers,
      });

      console.log(response.status, response.data.token);
      localStorage.setItem("User_Data", JSON.stringify(userData));
      navigate("/login");
    } catch (error) {
      console.log(userData);
      
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <div className="container">
      <div className="progress-sidebar">
        <div className="progress-sticky">
          {steps.map((step, index) => (
            <div key={step.id} className="progress-step">
              {index < steps.length - 1 && (
                <div className={`progress-line ${step.status === 'completed' ? 'completed' : ''}`} />
              )}
              <div className={`step-indicator ${step.status}`}>
                {step.status === 'completed' ? (
                  <Check size={16} />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span className={`step-text ${step.status}`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="main-card">
        <h2 className="form-title">Tell Us Your Experiences</h2>

        <div className="form-section">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-section">
              <div className="experience-header">
                <h3>Experience {index + 1}</h3>
                {experiences.length > 1 && (
                  <button 
                    className="delete-button"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                )}
              </div>

              <div className="form-section">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={exp.companyName}
                  onChange={(e) => updateExperience(index, 'companyName', e.target.value)}
                  placeholder="Company name"
                />
              </div>

              <div className="form-section">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={exp.jobTitle}
                  onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
                  placeholder="Job title"
                />
              </div>

              <div className="form-section">
                <label className="form-label">Job Description</label>
                <textarea
                  className="form-textarea"
                  value={exp.jobDescription}
                  onChange={(e) => updateExperience(index, 'jobDescription', e.target.value)}
                  placeholder="Describe your responsibilities"
                />
              </div>

              <div className="date-inputs">
                <div>
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                  /> 
                </div>
                <div>
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          <button className="add-button" onClick={addExperience}>
            <Plus size={16} />
            Add Experience
          </button>
        </div>

        <div className="form-section">
          <label className="form-label">Skills</label>
          <form onSubmit={addSkill} className="skill-input-group">
            <input
              type="text"
              className="form-input"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
            />
            <button type="submit" className="add-button">
              <Plus size={16} />
              Add
            </button>
          </form>
          <div className="skill-tags">
            {skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill.skill}
                <button
                  className="delete-button"
                  onClick={() => removeSkill(skill.skill)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <button
              type="submit"
              className="continue-button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
            
              {isLoading ? <div className="loader"></div> : <div>Continue <ArrowRight size={20} /></div>}
            </button>
        </div>
      </div>
    </div>
  );
}

export default OnBoardingForm;