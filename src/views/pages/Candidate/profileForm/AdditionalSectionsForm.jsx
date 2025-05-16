import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Chip,
  Stack,
  TextField,
} from '@mui/material';

const AdditionalSectionsForm = () => {
  const [skills, setSkills] = useState('');
  const [languages, setLanguages] = useState({ language: '', proficiency: '' });
  const [volunteer, setVolunteer] = useState({
    role: '',
    organization: '',
    location: '',
    dates: '',
    achievements: '',
  });
  const [publications, setPublications] = useState({
    title: '',
    name: '',
    date: '',
    description: '',
  });

  const [skillsList, setSkillsList] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [volunteerList, setVolunteerList] = useState([]);
  const [publicationsList, setPublicationsList] = useState([]);

  const [errors, setErrors] = useState({
    skills: '',
    language: '',
    proficiency: '',
    role: '',
    organization: '',
    location: '',
    dates: '',
    achievements: '',
    title: '',
    name: '',
    date: '',
    description: '',
  });

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    switch (section) {
      case 'skills':
        setSkills(value);
        break;
      case 'languages':
        setLanguages((prev) => ({ ...prev, [name]: value }));
        break;
      case 'volunteer':
        setVolunteer((prev) => ({ ...prev, [name]: value }));
        break;
      case 'publications':
        setPublications((prev) => ({ ...prev, [name]: value }));
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = (section) => {
    const newErrors = {};
    if (section === 'skills' && !skills.trim()) newErrors.skills = 'Skills are required.';
    if (section === 'languages') {
      if (!languages.language.trim()) newErrors.language = 'Language is required.';
      if (!languages.proficiency.trim()) newErrors.proficiency = 'Proficiency level is required.';
    }
    if (section === 'volunteer') {
      if (!volunteer.role.trim()) newErrors.role = 'Role is required.';
      if (!volunteer.organization.trim()) newErrors.organization = 'Organization is required.';
      if (!volunteer.location.trim()) newErrors.location = 'Location is required.';
      if (!volunteer.dates.trim()) newErrors.dates = 'Dates are required.';
      if (!volunteer.achievements.trim()) newErrors.achievements = 'Achievements are required.';
    }
    if (section === 'publications') {
      if (!publications.title.trim()) newErrors.title = 'Title is required.';
      if (!publications.name.trim()) newErrors.name = 'Publication/Conference name is required.';
      if (!publications.date.trim()) newErrors.date = 'Date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSkills = () => {
    if (validate('skills')) {
      setSkillsList([...skillsList, skills]);
      setSkills('');
    }
  };

  const handleAddLanguage = () => {
    if (validate('languages')) {
      setLanguagesList([...languagesList, languages]);
      setLanguages({ language: '', proficiency: '' });
    }
  };

  const handleAddVolunteer = () => {
    if (validate('volunteer')) {
      setVolunteerList([...volunteerList, volunteer]);
      setVolunteer({
        role: '',
        organization: '',
        location: '',
        dates: '',
        achievements: '',
      });
    }
  };

  const handleAddPublication = () => {
    if (validate('publications')) {
      setPublicationsList([...publicationsList, publications]);
      setPublications({
        title: '',
        name: '',
        date: '',
        description: '',
      });
    }
  };

  const handleRemoveItem = (section, index) => {
    switch (section) {
      case 'skills':
        setSkillsList((prev) => prev.filter((_, i) => i !== index));
        break;
      case 'languages':
        setLanguagesList((prev) => prev.filter((_, i) => i !== index));
        break;
      case 'volunteer':
        setVolunteerList((prev) => prev.filter((_, i) => i !== index));
        break;
      case 'publications':
        setPublicationsList((prev) => prev.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      skillsList.length === 0 &&
      languagesList.length === 0 &&
      volunteerList.length === 0 &&
      publicationsList.length === 0
    ) {
      setErrors({ form: 'Please add at least one section item.' });
      return;
    }
    console.log('Skills:', skillsList);
    console.log('Languages:', languagesList);
    console.log('Volunteer Experience:', volunteerList);
    console.log('Publications:', publicationsList);
    // Handle form submission logic here
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
     

      {/* Skills Section */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Skills"
          value={skills}
          onChange={(e) => handleChange(e, 'skills')}
          error={Boolean(errors.skills)}
          helperText={errors.skills}
        />
        <Button variant="outlined" onClick={handleAddSkills} sx={{ mt: 2 }}>
          Add Skill
        </Button>
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
          {skillsList.map((skill, index) => (
            <Chip
              key={index}
              label={skill} // Only the skill name
              onDelete={() => handleRemoveItem('skills', index)}
              color="primary"
            />
          ))}
        </Stack>
      </Grid>

      {/* Languages Section */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Language"
          name="language"
          value={languages.language}
          onChange={(e) => handleChange(e, 'languages')}
          error={Boolean(errors.language)}
          helperText={errors.language}
        />
        <TextField
          fullWidth
          label="Proficiency"
          name="proficiency"
          value={languages.proficiency}
          onChange={(e) => handleChange(e, 'languages')}
          error={Boolean(errors.proficiency)}
          helperText={errors.proficiency}
          sx={{ mt: 2 }}
        />
        <Button variant="outlined" onClick={handleAddLanguage} sx={{ mt: 2 }}>
          Add Language
        </Button>
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
          {languagesList.map((lang, index) => (
            <Chip
              key={index}
              label={`${lang.language} — ${lang.proficiency}`} // Full language & proficiency
              onDelete={() => handleRemoveItem('languages', index)}
              color="primary"
            />
          ))}
        </Stack>
      </Grid>

      {/* Volunteer Experience Section */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Role"
          name="role"
          value={volunteer.role}
          onChange={(e) => handleChange(e, 'volunteer')}
          error={Boolean(errors.role)}
          helperText={errors.role}
        />
        <TextField
          fullWidth
          label="Organization"
          name="organization"
          value={volunteer.organization}
          onChange={(e) => handleChange(e, 'volunteer')}
          error={Boolean(errors.organization)}
          helperText={errors.organization}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={volunteer.location}
          onChange={(e) => handleChange(e, 'volunteer')}
          error={Boolean(errors.location)}
          helperText={errors.location}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Dates"
          name="dates"
          value={volunteer.dates}
          onChange={(e) => handleChange(e, 'volunteer')}
          error={Boolean(errors.dates)}
          helperText={errors.dates}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Achievements"
          name="achievements"
          multiline
          rows={3}
          value={volunteer.achievements}
          onChange={(e) => handleChange(e, 'volunteer')}
          error={Boolean(errors.achievements)}
          helperText={errors.achievements}
          sx={{ mt: 2 }}
        />
        <Button variant="outlined" onClick={handleAddVolunteer} sx={{ mt: 2 }}>
          Add Volunteer Experience
        </Button>
        <Stack direction="row" spacing={1} sx={{ mt: 2,mb:2, flexWrap: 'wrap' }}>
          {volunteerList.map((vol, index) => (
            <Chip
              key={index}
              label={`${vol.role} — ${vol.organization} — ${vol.location} — ${vol.dates} — ${vol.achievements}`} // Full volunteer details
              onDelete={() => handleRemoveItem('volunteer', index)}
              color="primary"
            />
          ))}
        </Stack>
      </Grid>

      {/* Publications Section */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={publications.title}
          onChange={(e) => handleChange(e, 'publications')}
          error={Boolean(errors.title)}
          helperText={errors.title}
        />
        <TextField
          fullWidth
          label="Publication/Conference Name"
          name="name"
          value={publications.name}
          onChange={(e) => handleChange(e, 'publications')}
          error={Boolean(errors.name)}
          helperText={errors.name}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Date"
          name="date"
          value={publications.date}
          onChange={(e) => handleChange(e, 'publications')}
          error={Boolean(errors.date)}
          helperText={errors.date}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={3}
          value={publications.description}
          onChange={(e) => handleChange(e, 'publications')}
          error={Boolean(errors.description)}
          helperText={errors.description}
          sx={{ mt: 2 }}
        />
        <Button variant="outlined" onClick={handleAddPublication} sx={{ mt: 2 }}>
          Add Publication
        </Button>
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
          {publicationsList.map((pub, index) => (
            <Chip
              key={index}
              label={`${pub.title} — ${pub.name} — ${pub.date} — ${pub.description}`} // Full publication details
              onDelete={() => handleRemoveItem('publications', index)}
              color="primary"
            />
          ))}
        </Stack>
      </Grid>

      {/* Submit Button */}
      <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
};

export default AdditionalSectionsForm;
