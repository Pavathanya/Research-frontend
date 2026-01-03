import React from 'react';
import { Box, Card, CardContent, Typography, Switch, FormControlLabel, Button, TextField, Slider } from '@mui/material';
import { PageHeader } from '../../components/common/SharedComponents';

export const SystemSettings = () => (
    <Box>
        <PageHeader title="System Settings" />
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>General</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControlLabel control={<Switch defaultChecked />} label="Enable Email Notifications" />
                    <FormControlLabel control={<Switch />} label="Dark Mode" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Data Retention: Auto-archive after 2 years" />
                </Box>
            </CardContent>
        </Card>
    </Box>
);

export const RoleKPIConfig = () => (
    <Box>
        <PageHeader title="Role KPI Configuration" />
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>Senior Frontend Engineer</Typography>
                <Typography gutterBottom>Coding Skill Weight</Typography>
                <Slider defaultValue={40} step={10} marks min={0} max={100} valueLabelDisplay="auto" />
                <Typography gutterBottom>System Design Weight</Typography>
                <Slider defaultValue={30} step={10} marks min={0} max={100} valueLabelDisplay="auto" />
                <Typography gutterBottom>Communication Weight</Typography>
                <Slider defaultValue={30} step={10} marks min={0} max={100} valueLabelDisplay="auto" />

                <Button variant="contained" sx={{ mt: 2 }}>Save Weights</Button>
            </CardContent>
        </Card>
    </Box>
);

export const ThresholdConfig = () => (
    <Box>
        <PageHeader title="Threshold Configuration" />
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>Risk Thresholds</Typography>
                <TextField label="High Attrition Risk Score (>)" defaultValue="80" fullWidth sx={{ mb: 2, mt: 1 }} />
                <TextField label="Low Performance Score (<)" defaultValue="3.0" fullWidth sx={{ mb: 2 }} />
                <Button variant="contained">Update Thresholds</Button>
            </CardContent>
        </Card>
    </Box>
);
