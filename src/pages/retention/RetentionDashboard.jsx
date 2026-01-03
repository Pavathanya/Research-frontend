import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PageHeader, StatusChip } from '../../components/common/SharedComponents';
import { mockRetention } from '../../data/mockRetention';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const RetentionDashboard = () => {
    const riskData = [
        { name: 'Low', value: mockRetention.filter(r => r.riskLevel === 'Low').length },
        { name: 'Medium', value: mockRetention.filter(r => r.riskLevel === 'Medium').length },
        { name: 'High', value: mockRetention.filter(r => r.riskLevel === 'High').length },
    ];
    const COLORS = ['#4caf50', '#ff9800', '#f44336'];

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
        <Box>
            <PageHeader title="Retention Analytics" subtitle="Predictive Attrition Modeling" />

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: 300 }}>
                        <Typography variant="h6" gutterBottom>Risk Distribution</Typography>
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
