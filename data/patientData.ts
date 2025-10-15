export const patientData = {
  profile: {
    name: 'Jane Doe',
    dob: '1985-05-15',
    age: 39,
    gender: 'Female',
    bloodType: 'O+',
    contact: {
      phone: '555-123-4567',
      email: 'jane.doe@example.com',
      address: '123 Health St, Wellness City, 12345',
    },
    primaryCarePhysician: 'Dr. Emily Carter',
    insurance: {
      provider: 'HealthGuard Inc.',
      policyNumber: 'HG123456789',
    },
  },
  medicalHistory: {
    conditions: ['Hypertension', 'Type 2 Diabetes', 'Hyperlipidemia', 'Asthma (Mild)'],
    allergies: ['Penicillin (causes rash)', 'Pollen (seasonal)'],
    surgeries: [
      { year: 2018, procedure: 'Appendectomy' },
      { year: 2021, procedure: 'Knee Arthroscopy (Left)' },
    ],
    familyHistory: ['Heart Disease (Father)', 'Diabetes (Mother)', 'Hypertension (Father)'],
  },
  currentMedications: [
    { name: 'Lisinopril', dosage: '20 mg', frequency: 'Once daily', reason: 'Hypertension' },
    { name: 'Metformin', dosage: '1000 mg', frequency: 'Twice daily', reason: 'Type 2 Diabetes' },
    { name: 'Atorvastatin', dosage: '40 mg', frequency: 'Once daily (evening)', reason: 'Hyperlipidemia' },
    { name: 'Albuterol Inhaler', dosage: '2 puffs', frequency: 'As needed for shortness of breath', reason: 'Asthma' },
  ],
  vitals: {
    lastChecked: '2024-07-15',
    bloodPressure: '130/85 mmHg',
    heartRate: '72 bpm',
    respiratoryRate: '16 breaths/min',
    temperature: '98.6°F (37°C)',
    oxygenSaturation: '98%',
    height: "5' 6\" (168 cm)",
    weight: '155 lbs (70.3 kg)',
    bmi: 25.0,
  },
  recentLabs: [
    {
      date: '2024-06-20',
      test: 'HbA1c',
      result: '6.8%',
      referenceRange: '4.0% - 5.6%',
      status: 'High',
    },
    {
      date: '2024-06-20',
      test: 'Lipid Panel - LDL',
      result: '95 mg/dL',
      referenceRange: '< 100 mg/dL',
      status: 'Normal',
    },
    {
      date: '2024-06-20',
      test: 'Lipid Panel - HDL',
      result: '55 mg/dL',
      referenceRange: '> 40 mg/dL',
      status: 'Normal',
    },
    {
      date: '2024-06-20',
      test: 'Comprehensive Metabolic Panel (CMP)',
      result: 'All values within normal limits',
      referenceRange: 'N/A',
      status: 'Normal',
    },
  ],
  lifestyle: {
      diet: "Generally balanced diet, tries to limit processed foods and sugars.",
      exercise: "Walks 30-45 minutes, 3-4 times a week.",
      smokingStatus: "Non-smoker",
      alcoholConsumption: "Socially, 1-2 drinks per week.",
  }
};
