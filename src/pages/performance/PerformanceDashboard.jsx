import React from 'react';
import { Box, Grid, Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Divider } from '@mui/material';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, Legend, PieChart, Pie, Cell
} from 'recharts';
import { Warning } from '@mui/icons-material';
import { mockPerformanceStats } from '../../data/mockPerformance';
import { PageHeader } from '../../components/common/SharedComponents';
import FeedbackPrediction from './FeedbackPrediction';
import PerformanceReports from './PerformanceReports';

const COLORS = ['#4caf50', '#ff9800', '#f44336'];

const PerformanceDashboard = () => {
    return (
        <Box>
            <PageHeader title="Performance Dashboard" subtitle="Departmental Overview & Advanced Analytics" />

            {/* Section 1: Overview */}
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>Departmental Overview</Typography>
            <Grid container spacing={3}>
                {/* 1. Performance Score (Bar Chart) - Half Width */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: 500, width: '100%' }}>
                        <Typography variant="h6" gutterBottom>Performance By Department (Score)</Typography>
                        <ResponsiveContainer width={500} height={400}>
                            <BarChart data={mockPerformanceStats.departmentPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 5]} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="score" fill="#1976d2" name="Avg Score" barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* 2. Productivity Prediction (Line Chart) - Half Width */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: 500, width: '100%' }}>
                        <Typography variant="h6" gutterBottom>Productivity Prediction Trend</Typography>
                        <ResponsiveContainer width={500} height={400}>
                            <LineChart data={mockPerformanceStats.monthlyTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis domain={[0, 5]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="score" stroke="#1976d2" strokeWidth={3} name="Actual Score" />
                                <Line type="monotone" dataKey="predicted" stroke="#ff9800" strokeWidth={2} strokeDasharray="5 5" name="Predicted Productivity" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* 3. Performance Level (Pie Chart) - Half Width */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: 400, width: '100%' }}>
                        <Typography variant="h6" gutterBottom>Performance Level Distribution</Typography>
                        <ResponsiveContainer width={500} height={400}>
                            <PieChart>
                                <Pie
                                    data={mockPerformanceStats.performanceLevelDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label
                                >
                                    {mockPerformanceStats.performanceLevelDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Alerts Section - Half Width to balance grid */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: 400, width: '100%' }}>
                        <Typography variant="h6" gutterBottom color="error">Low Performance Alerts</Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar><Avatar sx={{ bgcolor: 'error.main' }}><Warning /></Avatar></ListItemAvatar>
                                <ListItemText primary="Robert Brown (Sales)" secondary="Score: 2.8 (Critical) - Immediate Attention Required" />
                                <Button size="small" variant="contained" color="error">Flag for Review</Button>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar><Avatar sx={{ bgcolor: 'warning.main' }}><Warning /></Avatar></ListItemAvatar>
                                <ListItemText primary="Jane Smith (Marketing)" secondary="Score: 3.5 (Review) - Performance Dipping" />
                                <Button size="small" variant="outlined" color="warning">Monitor</Button>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            <Divider sx={{ my: 4, mt: 8 }} />

            {/* Section 2: Prediction */}
            <FeedbackPrediction />

            <Divider sx={{ my: 4 }} />

            {/* Section 3: Reports */}
            <PerformanceReports />
        </Box>
    );
};

export default PerformanceDashboard;
