import React from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CalendarToday, Visibility } from '@mui/icons-material';
import { mockCandidates } from '../../data/mockCandidates';
import { PageHeader, StatusChip } from '../../components/common/SharedComponents';
import { useNavigate } from 'react-router-dom';

const Shortlist = () => {
    const navigate = useNavigate();
    const shortlisted = mockCandidates.filter(c => c.status === 'Shortlisted' || c.status === 'Interviewing');

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'role', headerName: 'Role', width: 200 },
        { field: 'matchScore', headerName: 'Score', width: 100 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => <StatusChip status={params.value} />
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box>
                    <Tooltip title="View Profile">
                        <IconButton onClick={() => navigate(`/recruitment/candidates/${params.row.id}`)}>
                            <Visibility fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Button
                        startIcon={<CalendarToday />}
                        size="small"
                        onClick={() => navigate('/interview/dashboard')}
                        sx={{ ml: 1 }}
                    >
                        Schedule
                    </Button>
                </Box>
            )
        }
    ];

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <PageHeader title="Shortlisted Candidates" subtitle="Ready for Interview Scheduling" />
            <DataGrid
                rows={shortlisted}
                columns={columns}
                pageSize={10}
                autoHeight
            />
        </Box>
    );
};

export default Shortlist;
