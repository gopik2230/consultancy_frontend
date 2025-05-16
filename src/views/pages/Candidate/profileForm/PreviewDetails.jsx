import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
  Chip
} from '@mui/material';
import { Download, Email, Phone, LinkedIn, LocationOn } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PreviewDetails = ({ resumeData }) => {
  const resumeRef = useRef();

  const handleDownloadPDF = () => {
    const input = resumeRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Resume.pdf`);
    });
  };

  // Default data structure
  const defaultData = {
    fullName: "John Doe",
    phone: "(123) 456-7890",
    email: "john.doe@example.com",
    linkedIn: "linkedin.com/in/johndoe",
    location: "New York, NY",
    summary: "Results-driven professional with 5+ years of experience in digital marketing. Specialized in SEO, content strategy, and data analytics. Proven track record of increasing organic traffic by 150% and improving conversion rates.",
    skills: [
      "Digital Marketing", "SEO/SEM", "Google Analytics", 
      "Content Strategy", "Social Media Marketing", "Data Analysis"
    ],
    experience: [
      {
        title: "Digital Marketing Manager",
        company: "Tech Solutions Inc.",
        location: "New York, NY",
        startDate: "Jan 2020",
        endDate: "Present",
        responsibilities: [
          "Increased organic traffic by 150% through strategic SEO implementation",
          "Managed $50k monthly ad budget with 3.5x ROI",
          "Led team of 5 marketing specialists"
        ]
      },
      {
        title: "Marketing Specialist",
        company: "Digital Agency LLC",
        location: "Boston, MA",
        startDate: "Jun 2017",
        endDate: "Dec 2019",
        responsibilities: [
          "Developed and executed social media campaigns",
          "Created content marketing strategy",
          "Analyzed campaign performance data"
        ]
      }
    ],
    education: [
      {
        degree: "MBA in Marketing",
        institution: "New York University",
        location: "New York, NY",
        graduationDate: "May 2017"
      },
      {
        degree: "BA in Communications",
        institution: "Boston College",
        location: "Boston, MA",
        graduationDate: "May 2015"
      }
    ],
    certifications: [
      {
        name: "Google Analytics Certification",
        organization: "Google",
        date: "2021"
      },
      {
        name: "HubSpot Content Marketing Certification",
        organization: "HubSpot",
        date: "2020"
      }
    ],
    projects: [
      {
        title: "Website Redesign Project",
        role: "Project Lead",
        date: "2022",
        description: "Led complete redesign of company website resulting in 40% increase in conversions"
      }
    ],
    languages: [
      { language: "English", proficiency: "Native" },
      { language: "Spanish", proficiency: "Fluent" }
    ],
    volunteer: [
      {
        role: "Marketing Volunteer",
        organization: "Non-Profit ABC",
        location: "New York, NY",
        startDate: "2021",
        endDate: "Present",
        description: "Managed social media accounts and increased engagement by 60%"
      }
    ],
    awards: [
      "Marketer of the Year 2022 - Tech Solutions Inc.",
      "Best Campaign Award 2021 - Digital Marketing Association"
    ]
  };

  const data = resumeData || defaultData;

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        variant="contained" 
        startIcon={<Download />} 
        onClick={handleDownloadPDF}
        sx={{ mb: 3 }}
      >
        Download PDF
      </Button>

      <Paper 
        ref={resumeRef} 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: '210mm', 
          margin: '0 auto',
          backgroundColor: 'white',
          color: 'black'
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h3" fontWeight="bold" sx={{ color: '#1976d2' }}>
            {data.fullName}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 1 }}>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <Email fontSize="small" sx={{ mr: 0.5 }} /> {data.email}
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone fontSize="small" sx={{ mr: 0.5 }} /> {data.phone}
            </Typography>
            {data.linkedIn && (
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <LinkedIn fontSize="small" sx={{ mr: 0.5 }} /> {data.linkedIn}
              </Typography>
            )}
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn fontSize="small" sx={{ mr: 0.5 }} /> {data.location}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderColor: '#1976d2', borderWidth: 1 }} />

        {/* Professional Summary */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
            Professional Summary
          </Typography>
          <Typography>{data.summary}</Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            {/* Skills */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
                Core Competencies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {data.skills.map((skill, index) => (
                  <Chip 
                    key={index} 
                    label={skill} 
                    variant="outlined" 
                    sx={{ borderColor: '#1976d2', color: 'black' }}
                  />
                ))}
              </Box>
            </Box>

            {/* Experience */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
                Professional Experience
              </Typography>
              {data.experience.map((exp, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography fontWeight="bold">{exp.title}</Typography>
                  <Typography>
                    {exp.company} | {exp.location} | {exp.startDate} - {exp.endDate}
                  </Typography>
                  <List dense sx={{ listStyleType: 'disc', pl: 2 }}>
                    {exp.responsibilities.map((item, i) => (
                      <ListItem key={i} sx={{ display: 'list-item', p: 0, pl: 1 }}>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </Box>

            {/* Education */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
                Education
              </Typography>
              {data.education.map((edu, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography fontWeight="bold">{edu.degree}</Typography>
                  <Typography>
                    {edu.institution} | {edu.location} | {edu.graduationDate}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            {/* Certifications */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
                Certifications
              </Typography>
              {data.certifications.map((cert, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography fontWeight="bold">{cert.name}</Typography>
                  <Typography>
                    {cert.organization} | {cert.date}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Projects */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
                Projects
              </Typography>
              {data.projects.map((project, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography fontWeight="bold">{project.title}</Typography>
                  <Typography fontStyle="italic">
                    {project.role} | {project.date}
                  </Typography>
                  <Typography>{project.description}</Typography>
                </Box>
              ))}
            </Box>

            {/* Languages */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
                Languages
              </Typography>
              <List dense>
                {data.languages.map((lang, index) => (
                  <ListItem key={index} sx={{ p: 0 }}>
                    <ListItemText 
                      primary={`${lang.language} (${lang.proficiency})`} 
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Volunteer Experience */}
            {data.volunteer && data.volunteer.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
                  Volunteer Experience
                </Typography>
                {data.volunteer.map((vol, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography fontWeight="bold">{vol.role}</Typography>
                    <Typography>
                      {vol.organization} | {vol.location} | {vol.startDate} - {vol.endDate}
                    </Typography>
                    <Typography>{vol.description}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Awards */}
            {data.awards && data.awards.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
                  Awards
                </Typography>
                <List dense>
                  {data.awards.map((award, index) => (
                    <ListItem key={index} sx={{ display: 'list-item', p: 0, pl: 1 }}>
                      <ListItemText primary={award} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PreviewDetails;