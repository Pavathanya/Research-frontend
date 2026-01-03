import React from 'react';
import { Grid, Paper, Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { StatCard } from '../../components/common/SharedComponents';
import {
    People as PeopleIcon,
    Work as WorkIcon,
    CheckCircle as HiredIcon,
    Warning as RiskIcon,
} from '@mui/icons-material';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
} from 'recharts';

const funnelData = [
    { name: 'Applied', value: 450 },
    { name: 'Screened', value: 200 },
    { name: 'Interviewed', value: 80 },
    { name: 'Offered', value: 20 },
    { name: 'Hired', value: 15 },
];

const riskData = [
    { name: 'Low Risk', value: 70 },
    { name: 'Medium Risk', value: 20 },
    { name: 'High Risk', value: 10 },
];
const COLORS = ['#4caf50', '#ff9800', '#f44336'];

const Overview = () => {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Dashboard Overview</Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Applicants" value="450" trend={12} icon={<PeopleIcon fontSize="large" />} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Open Jobs" value="8" trend={-2} icon={<WorkIcon fontSize="large" />} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Hired This Month" value="15" trend={5} icon={<HiredIcon fontSize="large" />} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="High Attrition Risk" value="10" trend={2} color="error.main" icon={<RiskIcon fontSize="large" />} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Recruitment Funnel */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" gutterBottom>Recruitment Funnel</Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={100} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#1976d2" barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Attrition Risk */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" gutterBottom>Attrition Risk Distribution</Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={riskData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {riskData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Recent Activity */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar><Avatar sx={{ bgcolor: 'primary.main' }}>AJ</Avatar></ListItemAvatar>
                                <ListItemText primary="Alice Johnson applied for Senior Frontend Engineer" secondary="2 hours ago" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar><Avatar sx={{ bgcolor: 'success.main' }}>CD</Avatar></ListItemAvatar>
                                <ListItemText primary="Charlie Davis shortlisted for Product Manager" secondary="5 hours ago" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar><Avatar sx={{ bgcolor: 'warning.main' }}>RB</Avatar></ListItemAvatar>
                                <ListItemText primary="Robert Brown flagged for High Attrition Risk" secondary="1 day ago" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                {/* Alerts */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom color="error">Alerts & Actions Needed</Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar><Avatar sx={{ bgcolor: 'error.main' }}><RiskIcon /></Avatar></ListItemAvatar>
                                <ListItemText primary="3 High Performance Employees at Risk" secondary="Check Retention Module" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar><Avatar sx={{ bgcolor: 'warning.main' }}><RiskIcon /></Avatar></ListItemAvatar>
                                <ListItemText primary="Low Engagement Scores in Sales Dept" secondary="Review Dept Report" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
};

export default Overview;
