import { Typography, MenuItem, TextField, Box, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
import moment from 'moment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ErrorField from 'ui-component/ErrorField';
import { useState } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';

const ExternalJobList = () => {
    const [step, setStep] = useState(1); // NEW
    const [jobDetails, setJobDetails] = useState({
        job_title: "", job_description: "", job_category: "", priority_skills: "",
        expeirence_from: "", expeirence_to: "", experience_type: "", location: "",
        budget_from: "", budget_to: "", notice_period: "", hiring_process: "",
        job_duration_from: null, job_duration_to: null, interview_date_from: null, interview_date_to: null,
        company_name: "", job_type: "", work_mode: "", client_name: "",  // EXAMPLE second page fields
    });
    const [errors, setErrors] = useState({});
console.log("jobDetails ",jobDetails)
    const validateFields = (fieldsToValidate) => {
        let newErrors = {};

        fieldsToValidate.forEach(field => {
            if (!jobDetails[field]) {
                newErrors[field] = "Field is Required";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        const fieldsPage1 = [
            "job_title", "job_description", "job_category", "priority_skills",
            "expeirence_from", "expeirence_to", "experience_type", "location",
            "notice_period", "hiring_process", "job_duration_from", "job_duration_to",
            "interview_date_from", "interview_date_to", "budget_from", "budget_to"
        ];
        if (validateFields(fieldsPage1)) {
            setStep(2);
        }
    };

    const handleFinalSubmit = () => {
        const fieldsPage2 = ["company_name", "job_type", "work_mode", "client_name"];
        if (validateFields(fieldsPage2)) {
            console.log("Final Submitted Values:", jobDetails);
            // Your submit logic here (API call etc.)
        }
    };

    const handleChange = (e, field) => {
        const value = field ? e : e.target.value;
        const name = field || e.target.name;
        console.log('namevaleu ',name,value)
        setJobDetails(prev => ({ ...prev, [name]: value }));

        // Clear error immediately for this field
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    return (
        <MainCard>
            {step === 1 && (
                <Box sx={{ display: "flex", width: "100%", gap: 2, justifyContent: "space-between", flexDirection: { xs: 'column', sm: "row" } }}>
                    {/* Left Side */}
                    <Box sx={{ display: "flex", flexDirection: "column", width: { xs: "100%", sm: "45%" }, gap: 2 }}>
                        {/* (your first page fields - as you wrote earlier) */}
                        {/* Job Title, Job Description etc */}
                        {[ { label: 'Job Title', name: 'job_title' }, { label: 'Job Description', name: 'job_description' }, { label: 'Job Category', name: 'job_category' }, { label: 'Top Priority Skills', name: 'priority_skills' }].map((item) => (
                            <Box key={item.name} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography sx={{ fontWeight: "500" }}>{item.label}</Typography>
                                <TextField
                                    value={jobDetails[item.name]}
                                    onChange={handleChange}
                                    name={item.name}
                                    error={Boolean(errors[item.name])}
                                    helperText={item.name == "priority_skills" ? "Php, React js, Nextjs ..." : ""}
                                />
                                {errors[item.name] && <ErrorField>{errors[item.name]}</ErrorField>}
                            </Box>
                        ))}

                        {/* Experience */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography sx={{ fontWeight: "500" }}>Experience</Typography>
                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                <TextField
                                    value={jobDetails.expeirence_from}
                                    onChange={handleChange}
                                    name='expeirence_from'
                                    placeholder='From'
                                    error={Boolean(errors.expeirence_from)}
                                />
                                <TextField
                                    value={jobDetails.expeirence_to}
                                    onChange={handleChange}
                                    name='expeirence_to'
                                    placeholder='To'
                                    error={Boolean(errors.expeirence_to)}
                                />
                                <Typography sx={{ fontWeight: "500" }}>Years</Typography>
                            </Box>
                            {(errors.expeirence_from || errors.expeirence_to) && (
                                <ErrorField>{errors.expeirence_from || errors.expeirence_to}</ErrorField>
                            )}
                        </Box>

                        {/* Experience Type */}
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <RadioGroup
                                row
                                name='experience_type'
                                value={jobDetails.experience_type}
                                onChange={(e) => handleChange(e.target.value, 'experience_type')}
                            >
                                <FormControlLabel value="Fresher" control={<Radio />} label="Fresher" />
                                <FormControlLabel value="Experienced" control={<Radio />} label="Experienced" />
                            </RadioGroup>
                            {errors.experience_type && <ErrorField>{errors.experience_type}</ErrorField>}
                        </Box>

                        {/* Location */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography sx={{ fontWeight: "500" }}>Location</Typography>
                            <TextField
                                value={jobDetails.location}
                                onChange={handleChange}
                                name='location'
                                error={Boolean(errors.location)}
                            />
                            {errors.location && <ErrorField>{errors.location}</ErrorField>}
                        </Box>
                    </Box>

                    {/* Right Side */}
                    <Box sx={{ display: "flex", flexDirection: "column", width: { xs: "100%", sm: "45%" }, gap: 2 }}>
                        {/* Budget */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography sx={{ fontWeight: "500" }}>Budget</Typography>
                            <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "space-between" }}>
                                <TextField
                                    value={jobDetails.budget_from}
                                    onChange={handleChange}
                                    name='budget_from'
                                    placeholder='From (LPA)'
                                    error={Boolean(errors.budget_from)}
                                />
                                <Typography>To</Typography>
                                <TextField
                                    value={jobDetails.budget_to}
                                    onChange={handleChange}
                                    name='budget_to'
                                    placeholder='To (LPA)'
                                    error={Boolean(errors.budget_to)}
                                />
                            </Box>
                            {(errors.budget_from || errors.budget_to) && (
                                <ErrorField>{errors.budget_from || errors.budget_to}</ErrorField>
                            )}
                        </Box>

                        {/* Notice Period */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography sx={{ fontWeight: "500" }}>Notice Period</Typography>
                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                <TextField
                                    value={jobDetails.notice_period}
                                    onChange={handleChange}
                                    placeholder='30,45,60'
                                    name='notice_period'
                                    error={Boolean(errors.notice_period)}
                                />
                                <Typography sx={{ fontWeight: "500" }}>Days</Typography>
                            </Box>
                            {errors.notice_period && <ErrorField>{errors.notice_period}</ErrorField>}
                        </Box>

                        {/* Hiring Process */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography sx={{ fontWeight: "500" }}>Hiring Process</Typography>
                            <TextField
                                select
                                value={jobDetails.hiring_process}
                                name='hiring_process'
                                onChange={(e) => handleChange(e.target.value, 'hiring_process')}
                                error={Boolean(errors.hiring_process)}
                            >
                                <MenuItem value="Screen Call">Screen Call</MenuItem>
                                <MenuItem value="Skill Fit">Skill Fit</MenuItem>
                                <MenuItem value="Tech Fit">Tech Fit</MenuItem>
                                <MenuItem value="Culture Fit">Culture Fit</MenuItem>
                                <MenuItem value="Cross Fit">Cross Fit</MenuItem>
                                <MenuItem value="Panel Interview">Panel Interview</MenuItem>
                                <MenuItem value="Final HR">Final HR</MenuItem>
                            </TextField>
                            {errors.hiring_process && <ErrorField>{errors.hiring_process}</ErrorField>}
                        </Box>

                        {/* Job Duration */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <Typography sx={{ fontWeight: "500" }}>Job Duration*</Typography>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                        label="From"
                                        value={jobDetails.job_duration_from}
                                        onChange={(newValue) => handleChange(newValue, 'job_duration_from')}
                                    />
                                    <DatePicker
                                        label="To"
                                        value={jobDetails.job_duration_to}
                                        onChange={(newValue) => handleChange(newValue, 'job_duration_to')}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            {(errors.job_duration_from || errors.job_duration_to) && (
                                <ErrorField>{errors.job_duration_from || errors.job_duration_to}</ErrorField>
                            )}
                        </Box>

                        {/* Interview Timeline */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <Typography sx={{ fontWeight: "500" }}>Interview Timeline</Typography>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                        label="From"
                                        value={jobDetails.interview_date_from}
                                        onChange={(newValue) => handleChange(newValue, 'interview_date_from')}
                                    />
                                    <DatePicker
                                        label="To"
                                        value={jobDetails.interview_date_to}
                                        onChange={(newValue) => handleChange(newValue, 'interview_date_to')}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>

                        {/* Next Button */}
                        <Box sx={{ mt: 2, display: "flex", justifyContent: "end" }}>
                            <Button variant='contained' onClick={handleNext}>Next</Button>
                        </Box>
                    </Box>
                </Box>
            )}

            {step === 2 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant='h5'>Screening Questionnaire</Typography>
                    <Typography sx={{fontSize:"14px"}}>Writing a custom screen</Typography>

                    <TextField
                        label="Company Name"
                        name="company_name"
                        value={jobDetails.company_name}
                        onChange={handleChange}
                        error={Boolean(errors.company_name)}
                    />
                    {errors.company_name && <ErrorField>{errors.company_name}</ErrorField>}

                    <TextField
                        label="Job Type"
                        name="job_type"
                        value={jobDetails.job_type}
                        onChange={handleChange}
                        error={Boolean(errors.job_type)}
                    />
                    {errors.job_type && <ErrorField>{errors.job_type}</ErrorField>}

                    <TextField
                        label="Work Mode (Remote/On-site)"
                        name="work_mode"
                        value={jobDetails.work_mode}
                        onChange={handleChange}
                        error={Boolean(errors.work_mode)}
                    />
                    {errors.work_mode && <ErrorField>{errors.work_mode}</ErrorField>}

                    <TextField
                        label="Client Name"
                        name="client_name"
                        value={jobDetails.client_name}
                        onChange={handleChange}
                        error={Boolean(errors.client_name)}
                    />
                    {errors.client_name && <ErrorField>{errors.client_name}</ErrorField>}

                    <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                        <Button variant="outlined" onClick={() => setStep(1)}>Back</Button>
                        <Button variant="contained" onClick={handleFinalSubmit}>Submit</Button>
                    </Box>
                </Box>
            )}
        </MainCard>
    );
};

export default ExternalJobList;
