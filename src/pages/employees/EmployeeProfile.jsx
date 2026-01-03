import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Grid, Button, Tabs, Tab, CircularProgress } from '@mui/material';
import { ArrowBack, Psychology } from '@mui/icons-material';
import { mockEmployees } from '../../data/mockEmployees';
import { PageHeader, StatusChip, StatCard } from '../../components/common/SharedComponents';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', score: 3.5 },
    { name: 'Feb', score: 3.8 },
    { name: 'Mar', score: 4.1 },
    { name: 'Apr', score: 4.0 },
    { name: 'May', score: 4.2 },
];

const EmployeeProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const employee = mockEmployees.find(e => e.id === id) || mockEmployees[0];
    const [tab, setTab] = useState(0);
    const [predicting, setPredicting] = useState(false);
    const [prediction, setPrediction] = useState(employee.predictedFeedback);

    const handlePredict = () => {
        setPredicting(true);
        setTimeout(() => {
            setPredicting(false);
            setPrediction((Math.random() * 2 + 3).toFixed(1)); // Random 3.0-5.0
        }, 2000);
    };

    return (
        <Box>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
            <PageHeader
                title={employee.name}
                subtitle={`${employee.role} • ${employee.department}`}
                action={<StatusChip status={employee.status} />}
            />

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Box sx={{ textAlign: 'center', mb: 3 }}>
                                <Typography variant="h1" sx={{ fontSize: 60, color: 'primary.main' }}>
                                    {employee.name.charAt(0)}
                                </Typography>
                                <Typography variant="h5">{employee.name}</Typography>
                                <Typography color="textSecondary">{employee.id}</Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={6}><Typography variant="subtitle2">Manager</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{employee.manager}</Typography></Grid>

                                <Grid item xs={6}><Typography variant="subtitle2">Joined</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{employee.joinDate}</Typography></Grid>
                            </Grid>

                            <Box sx={{ mt: 4, p: 2, bgcolor: '#f0f8ff', borderRadius: 2 }}>
                                <Typography variant="subtitle1" gutterBottom>AI Feedback Prediction</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="h4" color="secondary">{prediction}</Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={predicting ? <CircularProgress size={16} /> : <Psychology />}
                                        onClick={handlePredict}
                                        disabled={predicting}
                                    >
                                        Run
                                    </Button>
                                </Box>
                                <Typography variant="caption" color="textSecondary">Expected rating for next cycle</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ height: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                                <Tab label="Performance" />
                                <Tab label="Engagement" />
                                <Tab label="Notes" />
                            </Tabs>
                        </Box>
                        <CardContent>
                            {tab === 0 && (
                                <Box sx={{ height: 300 }}>
                                    <Typography variant="h6" gutterBottom>Performance Trend</Typography>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis domain={[0, 5]} />
                                            <ReTooltip />
                                            <Line type="monotone" dataKey="score" stroke="#1976d2" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Box>
                            )}
                            {tab === 1 && (
                                <Box>
                                    <Typography variant="h6">Engagement Score: {employee.engagementScore}/100</Typography>
                                    <LinearProgress variant="determinate" value={employee.engagementScore} sx={{ my: 2, height: 10 }} />
                                    <Typography paragraph>Employee shows consistent engagement in team meetings but lower participation in training events.</Typography>
                                </Box>
                            )}
                            {tab === 2 && (
                                <Typography>No recent notes.</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EmployeeProfile;
