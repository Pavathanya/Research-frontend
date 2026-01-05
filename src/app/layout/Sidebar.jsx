import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Toolbar,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Work as WorkIcon,
    Assignment as AssignmentIcon, // Screening
    CheckCircle as ShortlistIcon, // Shortlist
    Mic as MicIcon, // Interview
    LibraryBooks as QuestionIcon,
    Videocam as LiveIcon,
    Assessment as AssessmentIcon,
    Badge as BadgeIcon, // Employees
    TrendingUp as PerformanceIcon,
    Psychology as PredictionIcon,
    Warning as WarningIcon, // Retention
    HealthAndSafety as ActionIcon,
    Gavel as ComplianceIcon,
    Settings as SettingsIcon,
    ExpandLess,
    ExpandMore,
    Description as CVIcon,
    Summarize as ReportIcon,
    FactCheck as AuditIcon,
    Tune as ThresholdIcon,
    Rule as BiasIcon,
    Lightbulb as ExplainIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // State for collapsible menus
    const [openRecruitment, setOpenRecruitment] = useState(false);
    const [openInterview, setOpenInterview] = useState(false);
    const [openPerformance, setOpenPerformance] = useState(false);
    const [openRetention, setOpenRetention] = useState(false);
    const [openCompliance, setOpenCompliance] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    const handleClick = (setter, state) => {
        setter(!state);
    };

    const isSelected = (path) => location.pathname === path;

    const navItem = (text, path, icon) => (
        <ListItemButton
            selected={isSelected(path)}
            onClick={() => {
                navigate(path);
                if (mobileOpen) handleDrawerToggle();
            }}
            sx={{ pl: 4 }}
        >
            <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    );

    const drawerContent = (
        <Box sx={{ overflow: 'auto', height: '100%', color: '#fff' }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ color: '#fff', fontWeight: 'bold' }}>
                    AI-HCM System
                </Typography>
            </Toolbar>
            <List component="nav">
                {/* Overview */}
                <ListItemButton onClick={() => navigate('/')} selected={isSelected('/')}>
                    <ListItemIcon sx={{ color: 'inherit' }}><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Overview" />
                </ListItemButton>

                {/* Recruitment */}
                <ListItemButton onClick={() => navigate('/recruitment/dashboard')} selected={isSelected('/recruitment/dashboard')}>
                    <ListItemIcon sx={{ color: 'inherit' }}><WorkIcon /></ListItemIcon>
                    <ListItemText primary="Recruitment" />
                </ListItemButton>

                {/* Interviews */}
                <ListItemButton onClick={() => navigate('/interview/dashboard')} selected={isSelected('/interview/dashboard')}>
                    <ListItemIcon sx={{ color: 'inherit' }}><MicIcon /></ListItemIcon>
                    <ListItemText primary="Interviews" />
                </ListItemButton>

                {/* Employees */}
                <ListItemButton onClick={() => navigate('/employees/directory')} selected={isSelected('/employees/directory')}>
                    <ListItemIcon sx={{ color: 'inherit' }}><BadgeIcon /></ListItemIcon>
                    <ListItemText primary="Employees" />
                </ListItemButton>

                {/* Performance */}
                <ListItemButton onClick={() => navigate('/performance/dashboard')} selected={isSelected('/performance/dashboard')}>
                    <ListItemIcon sx={{ color: 'inherit' }}><PerformanceIcon /></ListItemIcon>
                    <ListItemText primary="Performance" />
                </ListItemButton>

                {/* Retention */}
                <ListItemButton onClick={() => navigate('/retention/dashboard')} selected={isSelected('/retention/dashboard')}>
                    <ListItemIcon sx={{ color: 'inherit' }}><WarningIcon /></ListItemIcon>
                    <ListItemText primary="Retention" />
                </ListItemButton>

                {/* Compliance */}
                {/* <ListItemButton onClick={() => handleClick(setOpenCompliance, openCompliance)}>
                    <ListItemIcon sx={{ color: 'inherit' }}><ComplianceIcon /></ListItemIcon>
                    <ListItemText primary="Compliance" />
                    {openCompliance ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openCompliance} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {navItem('Bias & Fairness', '/compliance/bias-fairness', <BiasIcon />)}
                        {navItem('Audit Logs', '/compliance/audit-logs', <AuditIcon />)}
                    </List>
                </Collapse> */}

                {/* Settings */}
                <ListItemButton onClick={() => handleClick(setOpenSettings, openSettings)}>
                    <ListItemIcon sx={{ color: 'inherit' }}><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Settings" />
                    {openSettings ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSettings} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {navItem('System', '/settings/system', <SettingsIcon />)}
                        {navItem('Role KPI', '/settings/role-kpi', <SettingsIcon />)}
                        {navItem('Thresholds', '/settings/thresholds', <ThresholdIcon />)}
                    </List>
                </Collapse>

            </List>
        </Box>
    );

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>
            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};


export default Sidebar;
