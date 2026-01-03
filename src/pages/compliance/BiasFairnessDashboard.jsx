import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Switch, FormControlLabel } from '@mui/material';
import { PageHeader, StatCard } from '../../components/common/SharedComponents';
import { VerifiedUser } from '@mui/icons-material';

const BiasFairnessDashboard = () => {
    return (
        <Box>
            <PageHeader title="Bias & Fairness Monitoring" subtitle="Ensuring Equitable AI Decisions" />

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <StatCard title="Fairness Score" value="98/100" trend={1} icon={<VerifiedUser fontSize="large" color="success" />} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Controls</Typography>
                            <FormControlLabel control={<Switch defaultChecked />} label="Anonymize CVs (Blind Hiring)" />
                            <FormControlLabel control={<Switch defaultChecked />} label="Gender-Neutral Language Filter" />
                            <FormControlLabel control={<Switch defaultChecked />} label="Demographic Parity Check" />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BiasFairnessDashboard;
