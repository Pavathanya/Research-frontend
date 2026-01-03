import React, { useState } from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Videocam, Assessment } from '@mui/icons-material';
import { mockInterviews } from '../../data/mockInterviews';
import { PageHeader, StatusChip } from '../../components/common/SharedComponents';
import { useNavigate } from 'react-router-dom';

const InterviewDashboard = () => {
    const navigate = useNavigate();

    const columns = [
        { field: 'candidateName', headerName: 'Candidate', width: 180 },
        { field: 'role', headerName: 'Role', width: 200 },
        { field: 'stage', headerName: 'Stage', width: 150 },
        { field: 'date', headerName: 'Date', width: 120 },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => <StatusChip status={params.value} />
        },
        { field: 'score', headerName: 'Score', width: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            renderCell: (params) => (
                <Box>
                    {params.row.status === 'Pending' && (
                        <Button
                            startIcon={<Videocam />}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/interview/live/${params.row.candidateId}`)}
                        >
                            Start Live
                        </Button>
                    )}
                    {params.row.status === 'Completed' && (
                        <Button
                            startIcon={<Assessment />}
                            size="small"
                            variant="outlined"
                            onClick={() => navigate(`/interview/evaluation/${params.row.candidateId}`)}
                        >
                            Report
                        </Button>
                    )}
                </Box>
            )
        }
    ];

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <PageHeader title="Interview Dashboard" subtitle="Scheduled & Completed Interviews" />
            <DataGrid
                rows={mockInterviews}
                columns={columns}
                pageSize={10}
                autoHeight
            />
        </Box>
    );
};

export default InterviewDashboard;
