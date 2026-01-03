import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button,
    CircularProgress,
    Divider,
    Stack,
    Alert
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PageHeader, StatusChip } from '../../components/common/SharedComponents';
import { mockRetention } from '../../data/mockRetention';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Psychology, Speed } from '@mui/icons-material';

const JOB_ROLES = [
    'Research Scientist',
    'Laboratory Technician',
    'Sales Executive',
    'Manufacturing Director',
    'Healthcare Representative',
    'Manager',
    'Sales Representative',
    'Research Director',
    'Human Resources'
];

const JOB_LEVELS = [1, 2, 3, 4, 5];

const RetentionDashboard = () => {
    const riskData = [
        { name: 'Low', value: mockRetention.filter(r => r.riskLevel === 'Low').length },
        { name: 'Medium', value: mockRetention.filter(r => r.riskLevel === 'Medium').length },
        { name: 'High', value: mockRetention.filter(r => r.riskLevel === 'High').length },
    ];
    const COLORS = ['#4caf50', '#ff9800', '#f44336'];

    // Form State
    const [formData, setFormData] = useState({
        age: 30,
        businessTravel: 'Travel_Rarely',
        jobRole: 'Research Scientist',
        jobLevel: 1,
        monthlyIncome: 5000,
        overTime: 'No'
    });

    // UI State
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState({});
    const [prediction, setPrediction] = useState(null);

    // Form Validation
    const errors = {
        age: (formData.age < 18 || formData.age > 65) ? 'Age must be between 18 and 65' : '',
        monthlyIncome: formData.monthlyIncome < 0 ? 'Income cannot be negative' : ''
    };
    const isValid = !errors.age && !errors.monthlyIncome;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const handlePredict = () => {
        setLoading(true);
        setPrediction(null);

        // Simulate Prediction Latency
        setTimeout(() => {
            // Mock Logic
            let riskScore = 15; // Base risk
            if (formData.overTime === 'Yes') riskScore += 20;
            if (formData.businessTravel === 'Travel_Frequently') riskScore += 15;
            if (formData.jobLevel === 1) riskScore += 10;
            if (formData.monthlyIncome < 3000) riskScore += 20;

            // Normalize to 0-100
            riskScore = Math.min(95, Math.max(5, riskScore + Math.random() * 10));

            let level = 'Low';
            if (riskScore > 40) level = 'Medium';
            if (riskScore > 70) level = 'High';

            setPrediction({ score: Math.round(riskScore), level });
            setLoading(false);
        }, 1500);
    };

    const columns = [
        { field: 'employeeId', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        {
            field: 'riskLevel',
            headerName: 'Risk Level',
            width: 120,
            renderCell: (params) => <StatusChip status={params.value} />
        },
        { field: 'riskScore', headerName: 'Risk Score', width: 110 },
        { field: 'lastUpdated', headerName: 'Last Scanned', width: 150 },
        {
            field: 'drivers',
            headerName: 'Top Drivers',
            width: 300,
            valueGetter: (params) => params.row?.drivers?.join(', ') || ''
        },
    ];

    return (
        <Box sx={{ pb: 5 }}>
            <PageHeader title="Retention Analytics" subtitle="Predictive Attrition Modeling" />

            {/* Individual Prediction Section (New) */}
            <Paper sx={{ mb: 4, p: 4, borderRadius: 2 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                            <Psychology color="primary" /> Individual Employee Risk Predictor
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Input employee details to simulate retention risk using our AI model.
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    {/* Input Form */}
                    <Grid item xs={12} md={7}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    error={touched.age && !!errors.age}
                                    helperText={touched.age && errors.age}
                                    inputProps={{ min: 18, max: 65 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Monthly Income"
                                    name="monthlyIncome"
                                    type="number"
                                    value={formData.monthlyIncome}
                                    onChange={handleInputChange}
                                    error={touched.monthlyIncome && !!errors.monthlyIncome}
                                    helperText={touched.monthlyIncome && errors.monthlyIncome}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Job Role"
                                    name="jobRole"
                                    value={formData.jobRole}
                                    onChange={handleInputChange}
                                >
                                    {JOB_ROLES.map(role => (
                                        <MenuItem key={role} value={role}>{role}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Job Level"
                                    name="jobLevel"
                                    value={formData.jobLevel}
                                    onChange={handleInputChange}
                                >
                                    {JOB_LEVELS.map(level => (
                                        <MenuItem key={level} value={level}>Level {level}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Business Travel"
                                    name="businessTravel"
                                    value={formData.businessTravel}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="Non-Travel">Non-Travel</MenuItem>
                                    <MenuItem value="Travel_Rarely">Travel Rarely</MenuItem>
                                    <MenuItem value="Travel_Frequently">Travel Frequently</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="OverTime"
                                    name="overTime"
                                    value={formData.overTime}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="No">No</MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handlePredict}
                                    disabled={!isValid || loading}
                                    sx={{ mt: 1 }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Calculate Attrition Risk'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Result Visualization */}
                    <Grid item xs={12} md={5}>
                        <Paper
                            variant="outlined"
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: loading ? 'action.hover' : 'background.paper',
                                p: 3,
                                position: 'relative'
                            }}
                        >
                            {!prediction && !loading && (
                                <Typography color="text.secondary" align="center">
                                    Enters details and click calculate to see the prediction.
                                </Typography>
                            )}

                            {loading && (
                                <Box textAlign="center">
                                    <CircularProgress size={60} thickness={4} />
                                    <Typography sx={{ mt: 2 }}>Analyzing Paramaters...</Typography>
                                </Box>
                            )}

                            {prediction && !loading && (
                                <Stack alignItems="center" spacing={1} sx={{ width: '100%' }}>
                                    <Typography variant="h5" fontWeight="bold">Attrition Probability</Typography>
                                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                        {/* Gauge-like visualization using PieChart */}
                                        <ResponsiveContainer width={200} height={100}>
                                            <PieChart>
                                                <Pie
                                                    data={[{ value: prediction.score }, { value: 100 - prediction.score }]}
                                                    cy={100}
                                                    startAngle={180}
                                                    endAngle={0}
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={0}
                                                    dataKey="value"
                                                >
                                                    <Cell fill={prediction.score < 40 ? COLORS[0] : prediction.score < 70 ? COLORS[1] : COLORS[2]} />
                                                    <Cell fill="#e0e0e0" />
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <Box
                                            sx={{
                                                top: 0,
                                                left: 0,
                                                bottom: -30,
                                                right: 0,
                                                position: 'absolute',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography variant="h4" component="div" color="text.primary" fontWeight="bold">
                                                {`${prediction.score}%`}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <StatusChip status={prediction.level} sx={{ fontSize: 16, px: 2, py: 2 }} />

                                    {prediction.level === 'High' && (
                                        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                                            High flight risk detected! Consider immediate retention actions.
                                        </Alert>
                                    )}
                                    {prediction.level === 'Medium' && (
                                        <Alert severity="warning" sx={{ mt: 2, width: '100%' }}>
                                            Moderate risk. Monitor workload and compensation.
                                        </Alert>
                                    )}
                                    {prediction.level === 'Low' && (
                                        <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
                                            Employee appears stable.
                                        </Alert>
                                    )}
                                </Stack>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: 300 }}>
                        <Typography variant="h6" gutterBottom>Overall Risk Distribution</Typography>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={riskData} dataKey="value" outerRadius={80} fill="#8884d8" label>
                                    {riskData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    {/* Could put a trend line here */}
                    <Paper sx={{ p: 3, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="textSecondary">Attrition Trend (Mock Chart)</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ height: 400 }}>
                <DataGrid rows={mockRetention} columns={columns} getRowId={(r) => r.employeeId} />
            </Box>
        </Box>
    );
};

export default RetentionDashboard;
