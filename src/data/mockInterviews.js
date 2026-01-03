export const mockInterviews = [
    {
        id: 'INT-001',
        candidateId: 'C-003',
        candidateName: 'Charlie Davis',
        role: 'Product Manager',
        stage: 'Do A Behavioral',
        date: '2026-01-05',
        status: 'Pending',
        score: null,
        feedback: '',
    },
    {
        id: 'INT-002',
        candidateId: 'C-004',
        candidateName: 'Diana Evans',
        role: 'Data Scientist',
        stage: 'Technical Round',
        date: '2026-01-04',
        status: 'Completed',
        score: 85,
        feedback: 'Strong technical skills, good problem solving.',
    },
];

export const mockQuestions = [
    {
        role: 'Senior Frontend Engineer',
        questions: [
            "Explain the reconciliation process in React.",
            "How do you optimize a large list in React?",
            "What is the difference between useMemo and useCallback?"
        ]
    },
    {
        role: 'Product Manager',
        questions: [
            "How do you prioritize features?",
            "Describe a time you said no to a stakeholder.",
            "How do you measure product success?"
        ]
    }
];
