import React from 'react';
import { Box, Card, CardContent, Typography, Grid, LinearProgress } from '@mui/material';
import { PageHeader } from '../../components/common/SharedComponents';

const drivers = [
    { name: 'Compensation Ratio', impact: 85, type: 'Negative' },
    { name: 'Time Since Promotion', impact: 60, type: 'Negative' },
    { name: 'Project Satisfaction', impact: 40, type: 'Positive' },
    { name: 'Commute Time', impact: 35, type: 'Negative' },
];

const Explainability = () => {
    return (
        <Box>
            <PageHeader title="Model Explainability (XAI)" subtitle="Why is the model predicting high risk?" />

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>SHAP Values (Feature Importance)</Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                                Top factors contributing to attrition prediction for Employee E-003.
                            </Typography>

                            {drivers.map((d, i) => (
                                <Box key={i} sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                        <Typography variant="subtitle2">{d.name}</Typography>
                                        <Typography variant="caption" color={d.type === 'Negative' ? 'error' : 'success.main'}>{d.type} Impact</Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={d.impact}
                                        color={d.type === 'Negative' ? 'error' : 'success'}
                                        sx={{ height: 10, borderRadius: 5 }}
                                    />
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: '#FFF3E0' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Recommendation Engine</Typography>
                            <Typography paragraph>Based on the high impact of <strong>Compensation Ratio</strong> and <strong>Time Since Promotion</strong>, the system recommends:</Typography>
                            <ul>
                                <li>Review salary band against market rates immediately.</li>
                                <li>Schedule career growth conversation within 7 days.</li>
                                <li>Consider a retention bonus.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Explainability;
