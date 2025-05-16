import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Chip,
  Paper,
  Alert
} from '@mui/material';

const CoreCompetenciesForm = () => {
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [category, setCategory] = useState('technical');
  const [error, setError] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      if (category === 'technical') {
        setTechnicalSkills([...technicalSkills, skillInput.trim()]);
      } else {
        setSoftSkills([...softSkills, skillInput.trim()]);
      }
      setSkillInput('');
      setError('');
    }
  };

  const handleRemoveSkill = (skill, categoryType) => {
    if (categoryType === 'technical') {
      setTechnicalSkills(technicalSkills.filter(item => item !== skill));
    } else {
      setSoftSkills(softSkills.filter(item => item !== skill));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (technicalSkills.length === 0 || softSkills.length === 0) {
      setError('Please add at least one Technical Skill and one Soft Skill.');
      return;
    }
    setError('');
    console.log('Technical Skills:', technicalSkills);
    console.log('Soft Skills:', softSkills);
    // You can handle saving to backend/state here
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* Skill Type Buttons */}
        <Grid item xs={12}>
          
          <Button
            variant={category === 'technical' ? 'contained' : 'outlined'}
            onClick={() => setCategory('technical')}
            sx={{ marginRight: 2 }}
          >
            Technical Skills
          </Button>
          <Button
            variant={category === 'soft' ? 'contained' : 'outlined'}
            onClick={() => setCategory('soft')}
          >
            Soft Skills
          </Button>
        </Grid>

        {/* Skill Input */}
        <Grid item xs={12}>
          <TextField
            label={`Enter a ${category === 'technical' ? 'Technical' : 'Soft'} Skill`}
            fullWidth
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
          />
        </Grid>

        {/* Add Skill Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSkill}
          >
            Add Skill
          </Button>
        </Grid>

        {/* Show Validation Error */}
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {/* Display Technical Skills */}
        {technicalSkills.length > 0 && (
          <Grid item xs={12}>
            <Paper >
              <Typography variant="subtitle1">Technical Skills</Typography>
              <Box sx={{ mt: 1 }}>
                {technicalSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill(skill, 'technical')}
                    sx={{ margin: 0.5, backgroundColor: '#EDE7F6', }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Display Soft Skills */}
        {softSkills.length > 0 && (
          <Grid item xs={12}>
            <Paper>
              <Typography variant="subtitle1">Soft Skills</Typography>
              <Box sx={{ mt: 1 }}>
                {softSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill(skill, 'soft')}
                    sx={{ margin: 0.5 , backgroundColor: '#EDE7F6'}}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoreCompetenciesForm;
