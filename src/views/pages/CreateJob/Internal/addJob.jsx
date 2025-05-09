import { Typography, MenuItem, TextField, Box, RadioGroup, Radio, FormControlLabel, Button, Card, IconButton } from '@mui/material';
import moment from 'moment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ErrorField from 'ui-component/ErrorField';
import { useState } from 'react';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

const ExternalJobList = () => {
    const [step, setStep] = useState(1); // NEW
    const floatRegx = /^\d*\.?\d*$/
    const [jobDetails, setJobDetails] = useState({
        job_title: "", job_description: "", job_category: "", priority_skills: "",
        expeirence_from: "", expeirence_to: "", experience_type: "", location: "",
        budget_from: "", budget_to: "", notice_period: "", hiring_process: "",
        job_duration_from: null, job_duration_to: null, interview_date_from: null, interview_date_to: null,
        // EXAMPLE second page fields
    });
    const [errors, setErrors] = useState({});
    const [errorsArray, setErrorsArray] = useState([]);
    const [questionArray, setQuestionArray] = useState([
        { question: '', answer: '', answerType: '' }
    ]);

    const handleQuestionChange = (index, field, value) => {
        const updated = [...questionArray];
        const updatedErrosArray = [...errorsArray]
        updated[index][field] = value;
        updatedErrosArray[index][field] = "";
        if(field === "answerType") updated[index]['answer'] = ""
        setQuestionArray(updated);
        setErrorsArray(updatedErrosArray)
    };

    const handleAdd = () => {
        setQuestionArray([...questionArray, { question: '', answer: '', answerType: '' }]);
    };

    const handleRemove = (index) => {
        const updated = [...questionArray];
        updated.splice(index, 1);
        setQuestionArray(updated);
    };



    // console.log("questionArray ", questionArray)
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

    const validationStep2 = () => {
        const newErrors = questionArray.map((q) => {
            const errs = {};
    
            if (!q.question.trim()) {
                errs.question = 'Question is required';
            }
    
            if (!q.answerType) {
                errs.answerType = 'Answer type is required';
            }
    
            if (
                (q.answerType === 'numeric' || q.answerType === 'text-numeric') &&
                !q.answer.trim()
            ) {
                errs.answer = 'Answer is required';
            }
    
            return errs;
        });
    
        const hasErrors = newErrors.some(err => Object.keys(err).length > 0);
    
        if (hasErrors) {
            setErrorsArray(newErrors);
            return false; 
        }
        return true
    }

    const handleFinalSubmit = () => {
        const validation = validationStep2()
        console.log("validation ",validation)
        if(validation) console.log('questionArray ',questionArray)
       
        console.log("Final Submitted Values:", jobDetails);
    };

    const handleChange = (e, field) => {
        const value = field ? e : e.target.value;
        const name = field || e.target.name;
        console.log('namevaleu ', name, value)
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
                        {[{ label: 'Job Title', name: 'job_title' }, { label: 'Job Description', name: 'job_description' }, { label: 'Job Category', name: 'job_category' }, { label: 'Top Priority Skills', name: 'priority_skills' }].map((item) => (
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
                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems:"center" }}>
                                <TextField
                                    value={jobDetails.expeirence_from}
                                    onChange={(e) => {if(floatRegx.test(e.target.value)) handleChange(e)}}
                                    name='expeirence_from'
                                    placeholder='From'
                                    error={Boolean(errors.expeirence_from)}
                                />
                                <TextField
                                    value={jobDetails.expeirence_to}
                                    onChange={(e) => {if(floatRegx.test(e.target.value)) handleChange(e)}}
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
                        <Box sx={{ display: "flex", gap: 1, flexDirection:"column" }}>
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
                                    onChange={(e) => {if(floatRegx.test(e.target.value)) handleChange(e)}}
                                    name='budget_from'
                                    placeholder='From (LPA)'
                                    error={Boolean(errors.budget_from)}
                                />
                                <Typography>To</Typography>
                                <TextField
                                    value={jobDetails.budget_to}
                                    onChange={(e) => {if(floatRegx.test(e.target.value)) handleChange(e)}}
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
                    <Typography sx={{ fontSize: "14px" }}>Writing a custom screen question.</Typography>

                    {questionArray?.map((item, index) => (
                        <Card
                            key={index}
                            sx={{
                                p: 2,
                                border: '1px solid #ccc',
                                borderRadius: 2,
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography sx={{ fontWeight: "500" }}>Question</Typography>
                                <TextField
                                    fullWidth
                                    // label="Question"
                                    value={item.question}
                                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                    error={Boolean(errorsArray[index]?.question)}
                                    helperText={errorsArray[index]?.question}
                                />
                            </Box>
                             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography sx={{ fontWeight: "500" }}>Answer Type</Typography>
                                <TextField
                                    select
                                    value={item.answerType}
                                    name='answerType'
                                    onChange={(e) => handleQuestionChange(index, 'answerType', e.target.value)}
                                    error={Boolean(errorsArray[index]?.answerType)}
                                    helperText={errorsArray[index]?.answerType}
                                >
                                    <MenuItem value="yes/no">Yes / No</MenuItem>
                                    <MenuItem value="numeric">Numeric</MenuItem>
                                    <MenuItem value="text-numeric">Text/Numeric</MenuItem>
                                </TextField>
                                {errors.answerType && <ErrorField>{errors.answerType}</ErrorField>}
                            </Box>
                        
                           {item?.answerType !== '' && item?.answerType !== 'yes/no' && <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography sx={{ fontWeight: "500" }}>Answer</Typography>
                                <TextField
                                    fullWidth
                                    value={item.answer}
                                    error={Boolean(errorsArray[index]?.answer)}
                                    helperText={errorsArray[index]?.answer}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if(item.answerType == 'numeric') {
                                            if (/^\d*$/.test(value)) {
                                                handleQuestionChange(index, 'answer', value);
                                            }
                                        } else {
                                            handleQuestionChange(index, 'answer', value);
                                        }
                                    }}
                                />
                                {errors.answerType && <ErrorField>{errors.answerType}</ErrorField>}
                            </Box>}

                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, mt: 1 }}>
                                <Button variant='outlined' color='primary' onClick={handleAdd} startIcon={<AddCircle />}>Add Question</Button>
                                <Button variant='outlined' color='error' onClick={(e) => handleRemove(index)} startIcon={<RemoveCircle />} disabled={questionArray?.length == 1}>Remove Question</Button>
                            </Box>
                        </Card>
                    ))}


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
