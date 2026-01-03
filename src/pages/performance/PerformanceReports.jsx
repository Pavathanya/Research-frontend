import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Divider } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import { PageHeader } from '../../components/common/SharedComponents';

const ReportCard = ({ title, date }) => (
    <Card>
        <CardContent>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Typography color="textSecondary" sx={{ mb: 2 }}>Generated on: {date}</Typography>
            <Divider sx={{ mb: 2 }} />
            <Button startIcon={<PictureAsPdf />} variant="outlined" fullWidth color="error">Download PDF</Button>
        </CardContent>
    </Card>
);

const PerformanceReports = () => {
    return (
        <Box>
            <PageHeader title="Performance Reports" subtitle="Monthly & Quarterly Analytics" />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <ReportCard title="Q4 2025 Performance Summary" date="2026-01-01" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ReportCard title="December 2025 Team Productivity" date="2026-01-02" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ReportCard title="Annual Talent Review 2025" date="2025-12-30" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PerformanceReports;
