import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import Jobs from './Jobs';
import CVScreening from './CVScreening';
import Shortlist from './Shortlist';
import { PageHeader } from '../../components/common/SharedComponents';

const RecruitmentDashboard = () => {
    return (
        <Box>
            <PageHeader title="Recruitment Dashboard" subtitle="Manage Jobs, Screen CVs, and Shortlist Candidates" />

            {/* Section 1: Jobs */}
            <Jobs />

            <Divider sx={{ my: 4, mt: 8 }} />

            {/* Section 2: CV Screening */}
            <CVScreening />

            <Divider sx={{ my: 4, mt: 8 }} />

            {/* Section 3: Shortlist */}
            <Shortlist />
        </Box>
    );
};

export default RecruitmentDashboard;
