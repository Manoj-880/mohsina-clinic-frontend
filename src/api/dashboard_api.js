
let patientsData = [
            {
                id: 1,
                name: "John Doe",
                age: 35,
                gender: "Male",
                createdAt: "2024-05-20T10:00:00Z",
                lastVisited: "2024-06-10",
                lastVisitDescription: "Complained of headaches and mild fever lasting over a week. Recommended rest and hydration.",
                isNew: false,
                mobileNumber: "9876543210",
                nextVisit: "2025-07-19"
            },
            {
                id: 2,
                name: "Jane Smith",
                age: 28,
                gender: "Female",
                createdAt: "2025-07-05T09:30:00Z",
                lastVisited: null,
                lastVisitDescription: "",
                isNew: true,
                mobileNumber: "9123456780",
                nextVisit: "2025-07-19"
            },
            {
                id: 3,
                name: "Michael Johnson",
                age: 42,
                gender: "Male",
                createdAt: "2023-11-15T14:20:00Z",
                lastVisited: "2024-06-08",
                lastVisitDescription: "Follow-up for blood pressure monitoring and medication adjustment.",
                isNew: false,
                mobileNumber: "9012345678",
                nextVisit: "2025-07-09"
            },
            {
                id: 4,
                name: "Emily Davis",
                age: 31,
                gender: "Female",
                createdAt: "2025-07-06T08:15:00Z",
                lastVisited: null,
                lastVisitDescription: "",
                isNew: true,
                mobileNumber: "9876501234",
                nextVisit: "2025-07-19"
            },
            {
                id: 5,
                name: "Robert Brown",
                age: 50,
                gender: "Male",
                createdAt: "2024-02-18T11:10:00Z",
                lastVisited: "2024-06-01",
                lastVisitDescription: "Routine diabetes checkup and medication renewal.",
                isNew: false,
                mobileNumber: "9845612345",
                nextVisit: "2025-07-09"
            },
            {
                id: 6,
                name: "Olivia Wilson",
                age: 26,
                gender: "Female",
                createdAt: "2025-07-07T10:45:00Z",
                lastVisited: null,
                lastVisitDescription: "",
                isNew: true,
                mobileNumber: "9798451230",
                nextVisit: "2025-07-19"
            },
            {
                id: 7,
                name: "David Lee",
                age: 38,
                gender: "Male",
                createdAt: "2024-06-22T09:30:00Z",
                lastVisited: "2024-06-25",
                lastVisitDescription: "Reported back pain due to long sitting hours. Suggested exercises and pain reliever.",
                isNew: false,
                mobileNumber: "9898897766"
            },
            {
                id: 8,
                name: "Sophia Martinez",
                age: 33,
                gender: "Female",
                createdAt: "2025-07-07T07:50:00Z",
                lastVisited: null,
                lastVisitDescription: "",
                isNew: true,
                mobileNumber: "9823456789",
                nextVisit: "2025-07-19"
            },
            {
                id: 9,
                name: "Daniel Anderson",
                age: 45,
                gender: "Male",
                createdAt: "2024-01-15T13:00:00Z",
                lastVisited: "2024-06-03",
                lastVisitDescription: "High blood pressure evaluation. Prescribed medication and diet control.",
                isNew: false,
                mobileNumber: "9765432198"
            },
            {
                id: 10,
                name: "Isabella Thomas",
                age: 29,
                gender: "Female",
                createdAt: "2025-07-06T12:20:00Z",
                lastVisited: null,
                lastVisitDescription: "",
                isNew: true,
                mobileNumber: "9899988776",
                nextVisit: "2025-07-19"
            },
            {
                id: 11,
                name: "Matthew Jackson",
                age: 40,
                gender: "Male",
                createdAt: "2023-08-10T10:00:00Z",
                lastVisited: "2024-05-20",
                lastVisitDescription: "Chest pain and anxiety. Advised ECG and relaxation therapy.",
                isNew: false,
                mobileNumber: "9898123456"
            },
            {
                id: 12,
                name: "Mia White",
                age: 34,
                gender: "Female",
                createdAt: "2025-07-01T11:30:00Z",
                lastVisited: null,
                lastVisitDescription: "",
                isNew: true,
                mobileNumber: "9777334455",
                nextVisit: "2025-07-19"
            },
            {
                id: 13,
                name: "Ethan Harris",
                age: 37,
                gender: "Male",
                createdAt: "2024-09-10T09:00:00Z",
                lastVisited: "2024-06-11",
                lastVisitDescription: "Chronic migraine treatment. Advised MRI and pain management.",
                isNew: false,
                mobileNumber: "9845672310"
            },
            {
                id: 14,
                name: "Ava Martin",
                age: 25,
                gender: "Female",
                createdAt: "2025-07-05T14:40:00Z",
                lastVisited: null,
                lastVisitDescription: "",
                isNew: true,
                mobileNumber: "9767894561",
                nextVisit: "2025-07-19"
            },
            {
                id: 15,
                name: "William Garcia",
                age: 48,
                gender: "Male",
                createdAt: "2023-12-01T08:25:00Z",
                lastVisited: "2024-06-06",
                lastVisitDescription: "Complained of joint stiffness. Suggested physiotherapy and supplements.",
                isNew: false,
                nextVisit: "2025-07-19",
                mobileNumber: "9886543210"
            }
        ];

const getDashboardPatientData = async () => {
    try {
        return patientsData;
    } catch (error) {
        console.log(error);
    }
};

export { getDashboardPatientData };