import React from 'react';
import { Box, Tooltip, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Visibility } from '@mui/icons-material';
import { mockEmployees } from '../../data/mockEmployees';
import { PageHeader, StatusChip } from '../../components/common/SharedComponents';
import { useNavigate } from 'react-router-dom';

const EmployeeDirectory = () => {
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'role', headerName: 'Role', width: 180 },
        { field: 'department', headerName: 'Department', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => <StatusChip status={params.value} />
        },
        { field: 'performanceScore', headerName: 'Perf. Score', width: 120 },
        {
            field: 'predictedFeedback',
            headerName: 'Pred. Feedb.',
            width: 120,
            renderCell: (params) => (
                <Box sx={{ fontWeight: 'bold', color: params.value < 3 ? 'red' : 'green' }}>
                    {params.value}
                </Box>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <Tooltip title="View Profile">
                    <IconButton onClick={() => navigate(`/employees/${params.row.id}`)}>
                        <Visibility fontSize="small" />
                    </IconButton>
                </Tooltip>
            )
        }
    ];

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <PageHeader title="Employee Directory" subtitle="Manage Workforce & Performance" />
            <DataGrid
                rows={mockEmployees}
                columns={columns}
                pageSize={10}
                autoHeight
            />
        </Box>
    );
};

export default EmployeeDirectory;
