const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const patientsFilePath = path.join(__dirname, 'data', 'patients.json');
let patientsData = [];

fs.readFile(patientsFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading patients.json file:', err);
        return;
    }
    patientsData = JSON.parse(data);
});

app.get('/patients', (req, res) => {
    res.json(patientsData);
});

app.get('/patients/:name', (req, res) => {
    const { name } = req.params;
    const patient = patientsData.find(patient => patient.name.toLowerCase() === name.toLowerCase());
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).json({ error: 'Patient not found' });
    }
});

app.get('/patients/:name/diagnosis', (req, res) => {
    const { name } = req.params;
    const patient = patientsData.find(patient => patient.name.toLowerCase() === name.toLowerCase());
    if (patient) {
        res.json(patient.diagnosis_history);
    } else {
        res.status(404).json({ error: 'Patient not found' });
    }
});

app.get('/patients/:name/lab-results', (req, res) => {
    const { name } = req.params;
    const patient = patientsData.find(patient => patient.name.toLowerCase() === name.toLowerCase());
    if (patient) {
        res.json(patient.lab_results);
    } else {
        res.status(404).json({ error: 'Patient not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
