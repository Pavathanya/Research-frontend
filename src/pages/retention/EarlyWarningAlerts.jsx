import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Typography, Chip } from '@mui/material';
import { Check, Warning } from '@mui/icons-material';
import { PageHeader } from '../../components/common/SharedComponents';
import { mockRetention } from '../../data/mockRetention';

const EarlyWarningAlerts = () => {
    const [alerts, setAlerts] = useState(mockRetention.filter(r => r.riskLevel === 'High' || r.riskLevel === 'Medium'));

    const handleDismiss = (id) => {
        setAlerts(alerts.filter(a => a.employeeId !== id));
    };

    return (
        <Box>
            <PageHeader title="Early Warning Alerts" subtitle="Action Required for At-Risk Employees" />

            <Paper>
                <List>
                    {alerts.length === 0 ? <Typography sx={{ p: 3 }}>No active alerts.</Typography> : alerts.map((alert) => (
                        <ListItem key={alert.employeeId} divider>
                            <Box sx={{ mr: 2 }}>
                                <Warning color={alert.riskLevel === 'High' ? 'error' : 'warning'} fontSize="large" />
                            </Box>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="h6">{alert.name} ({alert.employeeId})</Typography>
                                        <Chip label={alert.riskLevel + " Risk"} color={alert.riskLevel === 'High' ? 'error' : 'warning'} size="small" />
                                    </Box>
                                }
                                secondary={`Drivers: ${alert.drivers.join(', ')}`}
                            />
                            <ListItemSecondaryAction>
                                <Typography variant="caption" sx={{ mr: 2 }}>Score: {alert.riskScore}</Typography>
                                <IconButton edge="end" onClick={() => handleDismiss(alert.employeeId)} color="success">
                                    <Check />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default EarlyWarningAlerts;
