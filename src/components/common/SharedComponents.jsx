import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export const StatCard = ({ title, value, icon, trend, color = 'primary.main' }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div">
                        {value}
                    </Typography>
                    {trend && (
                        <Typography variant="body2" color={trend > 0 ? 'success.main' : 'error.main'}>
                            {trend > 0 ? '+' : ''}{trend}% since last month
                        </Typography>
                    )}
                </Box>
                <Box sx={{ color: color }}>
                    {icon}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

import { Chip } from '@mui/material';

export const StatusChip = ({ status }) => {
    let color = 'default';
    if (['Hired', 'Completed', 'Active', 'Strong Hire', 'Low'].includes(status)) color = 'success';
    else if (['Interviewing', 'In Progress', 'Medium', 'Shortlisted'].includes(status)) color = 'primary';
    else if (['New', 'Pending', 'Hold'].includes(status)) color = 'info';
    else if (['Rejected', 'Terminated', 'High', 'High Risk'].includes(status)) color = 'error';
    else if (['Warning', 'High Attrition Risk'].includes(status)) color = 'warning';

    return <Chip label={status} color={color} size="small" variant="outlined" />;
};

import { Button } from '@mui/material';

export const PageHeader = ({ title, subtitle, action }) => (
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
            <Typography variant="h4" fontWeight="bold">{title}</Typography>
            {subtitle && <Typography variant="subtitle1" color="textSecondary">{subtitle}</Typography>}
        </Box>
        {action}
    </Box>
);
