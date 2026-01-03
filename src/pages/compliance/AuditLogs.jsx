import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PageHeader } from '../../components/common/SharedComponents';
import { mockAuditLogs } from '../../data/mockAudit';

const AuditLogs = () => {
    const columns = [
        { field: 'id', headerName: 'Log ID', width: 100 },
        { field: 'timestamp', headerName: 'Time', width: 180 },
        { field: 'user', headerName: 'User', width: 150 },
        { field: 'action', headerName: 'Action', width: 200 },
        { field: 'module', headerName: 'Module', width: 120 },
        { field: 'details', headerName: 'Details', width: 300 },
    ];

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <PageHeader title="Audit Logs" subtitle="System Activity Tracking" />
            <DataGrid
                rows={mockAuditLogs}
                columns={columns}
                pageSize={20}
                autoHeight
            />
        </Box>
    );
};

export default AuditLogs;
