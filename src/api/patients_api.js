let patients = [
    {
        id: "P001", name: "Ravi", mobile: "9876543210", age: 34, gender: "Male", occupation: "Engineer",
        education: "B.Tech", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 60000,
        address: "123, MG Road, Hyderabad", isNew: false, lastVisited: "2025-07-10",
        lastVisitDescription: "Blood pressure check", nextVisit: "2025-07-19"
    },
    {
        id: "P002", name: "Sana", mobile: "9123456781", age: 28, gender: "Female", occupation: "Teacher",
        education: "M.A.", maritalStatus: "Single", religion: "Muslim", monthlyIncome: 40000,
        address: "45, Banjara Hills, Hyderabad", isNew: true, lastVisited: "", lastVisitDescription: "",
        nextVisit: "2025-07-19"
    },
    {
        id: "P003", name: "John", mobile: "9891234567", age: 45, gender: "Male", occupation: "Accountant",
        education: "B.Com", maritalStatus: "Married", religion: "Christian", monthlyIncome: 55000,
        address: "789, Jubilee Hills, Hyderabad", isNew: false, lastVisited: "2025-07-01",
        lastVisitDescription: "Annual checkup", nextVisit: "2025-07-25"
    },
    {
        id: "P004", name: "Divya", mobile: "9012345678", age: 30, gender: "Female", occupation: "Designer",
        education: "B.Des", maritalStatus: "Single", religion: "Hindu", monthlyIncome: 48000,
        address: "32, Madhapur, Hyderabad", isNew: true, lastVisited: "", lastVisitDescription: "",
        nextVisit: "2025-07-19"
    },
    {
        id: "P005", name: "Farah", mobile: "9988776655", age: 38, gender: "Female", occupation: "Nurse",
        education: "Diploma in Nursing", maritalStatus: "Married", religion: "Muslim", monthlyIncome: 35000,
        address: "7, Abids, Hyderabad", isNew: false, lastVisited: "2025-07-05",
        lastVisitDescription: "Fever and weakness", nextVisit: "2025-07-22"
    },
    {
        id: "P006", name: "Amit", mobile: "9876123450", age: 29, gender: "Male", occupation: "Developer",
        education: "MCA", maritalStatus: "Single", religion: "Hindu", monthlyIncome: 72000,
        address: "120, SR Nagar, Hyderabad", isNew: false, lastVisited: "2025-07-10",
        lastVisitDescription: "Back pain", nextVisit: "2025-07-19"
    },
    {
        id: "P007", name: "Priya", mobile: "9823123456", age: 26, gender: "Female", occupation: "Student",
        education: "MBA", maritalStatus: "Single", religion: "Christian", monthlyIncome: 0,
        address: "88, Begumpet, Hyderabad", isNew: true, lastVisited: "", lastVisitDescription: "",
        nextVisit: "2025-07-19"
    },
    {
        id: "P008", name: "Manoj", mobile: "9981234567", age: 41, gender: "Male", occupation: "Businessman",
        education: "B.Com", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 100000,
        address: "22, Ameerpet, Hyderabad", isNew: false, lastVisited: "2025-07-11",
        lastVisitDescription: "Diabetes checkup", nextVisit: "2025-07-24"
    },
    {
        id: "P009", name: "Geeta", mobile: "9834567890", age: 35, gender: "Female", occupation: "HR Manager",
        education: "MBA", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 65000,
        address: "11, Panjagutta, Hyderabad", isNew: false, lastVisited: "2025-07-14",
        lastVisitDescription: "Thyroid review", nextVisit: "2025-07-19"
    },
    {
        id: "P010", name: "Ali", mobile: "9998887776", age: 33, gender: "Male", occupation: "Driver",
        education: "10th Pass", maritalStatus: "Married", religion: "Muslim", monthlyIncome: 25000,
        address: "18, Old City, Hyderabad", isNew: true, lastVisited: "", lastVisitDescription: "",
        nextVisit: "2025-07-19"
    },
    {
        id: "P011", name: "Neha", mobile: "9812345678", age: 27, gender: "Female", occupation: "Receptionist",
        education: "12th Pass", maritalStatus: "Single", religion: "Hindu", monthlyIncome: 22000,
        address: "98, Somajiguda, Hyderabad", isNew: true, lastVisited: "", lastVisitDescription: "",
        nextVisit: "2025-07-19"
    },
    {
        id: "P012", name: "Vikram", mobile: "9870001234", age: 37, gender: "Male", occupation: "Electrician",
        education: "10th Pass", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 30000,
        address: "12, Miyapur, Hyderabad", isNew: false, lastVisited: "2025-07-06",
        lastVisitDescription: "Hand injury", nextVisit: "2025-07-20"
    },
    {
        id: "P013", name: "Fatima", mobile: "9765432109", age: 31, gender: "Female", occupation: "Housewife",
        education: "B.A.", maritalStatus: "Married", religion: "Muslim", monthlyIncome: 0,
        address: "6, Charminar, Hyderabad", isNew: true, lastVisited: "", lastVisitDescription: "",
        nextVisit: "2025-07-19"
    },
    {
        id: "P014", name: "Harish", mobile: "9832109876", age: 42, gender: "Male", occupation: "Painter",
        education: "8th Pass", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 18000,
        address: "55, Uppal, Hyderabad", isNew: false, lastVisited: "2025-07-09",
        lastVisitDescription: "Knee pain", nextVisit: "2025-07-22"
    },
    {
        id: "P015", name: "Zara", mobile: "9977554433", age: 24, gender: "Female", occupation: "Intern",
        education: "B.Sc", maritalStatus: "Single", religion: "Muslim", monthlyIncome: 12000,
        address: "33, Tolichowki, Hyderabad", isNew: true, lastVisited: "", lastVisitDescription: "",
        nextVisit: "2025-07-19"
    },
    {
        id: "P016", name: "Naveen", mobile: "9888877665", age: 36, gender: "Male", occupation: "Sales Executive",
        education: "BBA", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 42000,
        address: "64, Dilsukhnagar, Hyderabad", isNew: false, lastVisited: "2025-07-08",
        lastVisitDescription: "Fatigue", nextVisit: "2025-07-23"
    },
    {
        id: "P017", name: "Rekha", mobile: "9821346578", age: 40, gender: "Female", occupation: "Bank Clerk",
        education: "M.Com", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 58000,
        address: "77, KPHB, Hyderabad", isNew: false, lastVisited: "2025-07-13",
        lastVisitDescription: "Migraine", nextVisit: "2025-07-19"
    },
    {
        id: "P018", name: "Imran", mobile: "9991234567", age: 39, gender: "Male", occupation: "Mechanic",
        education: "10th Pass", maritalStatus: "Married", religion: "Muslim", monthlyIncome: 27000,
        address: "45, Falaknuma, Hyderabad", isNew: true, lastVisited: "", lastVisitDescription: "",
        nextVisit: "2025-07-19"
    },
    {
        id: "P019", name: "Kavita", mobile: "9874561230", age: 33, gender: "Female", occupation: "Pharmacist",
        education: "B.Pharm", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 48000,
        address: "89, Chandanagar, Hyderabad", isNew: false, lastVisited: "2025-07-12",
        lastVisitDescription: "Acidity", nextVisit: "2025-07-21"
    },
    {
        id: "P020", name: "Sameer", mobile: "9765123409", age: 25, gender: "Male", occupation: "Student",
        education: "B.Tech", maritalStatus: "Single", religion: "Muslim", monthlyIncome: 0,
        address: "12, Mehdipatnam, Hyderabad", isNew: true, lastVisited: "", lastVisitDescription: "",
        nextVisit: "2025-07-19"
    },
    {
        id: "P021", name: "Jyoti", mobile: "9887766554", age: 29, gender: "Female", occupation: "Teacher",
        education: "M.A.", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 35000,
        address: "43, Kukatpally, Hyderabad", isNew: false, lastVisited: "2025-07-11",
        lastVisitDescription: "Routine checkup", nextVisit: "2025-07-19"
    },
    {
        id: "P022", name: "Arjun", mobile: "9811122233", age: 32, gender: "Male", occupation: "Software Tester",
        education: "M.Tech", maritalStatus: "Single", religion: "Hindu", monthlyIncome: 70000,
        address: "55, Madhapur, Hyderabad", isNew: true, lastVisited: "", lastVisitDescription: "",
        nextVisit: "2025-07-19"
    },
    {
        id: "P023", name: "Deepa", mobile: "9833445566", age: 44, gender: "Female", occupation: "Housewife",
        education: "12th Pass", maritalStatus: "Married", religion: "Christian", monthlyIncome: 0,
        address: "99, Bowenpally, Hyderabad", isNew: false, lastVisited: "2025-07-07",
        lastVisitDescription: "High BP", nextVisit: "2025-07-20"
    },
    {
        id: "P024", name: "Rakesh", mobile: "9876567890", age: 31, gender: "Male", occupation: "Security Guard",
        education: "10th Pass", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 22000,
        address: "73, L.B. Nagar, Hyderabad", isNew: false, lastVisited: "2025-07-13",
        lastVisitDescription: "Cold & cough", nextVisit: "2025-07-19"
    },
    {
        id: "P025", name: "Anjali", mobile: "9812456789", age: 36, gender: "Female", occupation: "Dentist",
        education: "BDS", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 95000,
        address: "24, Tarnaka, Hyderabad", isNew: true, lastVisited: "", lastVisitDescription: "",
        nextVisit: "2025-07-19"
    },
    {
        id: "P026", name: "Kabir", mobile: "9911122334", age: 38, gender: "Male", occupation: "Chef",
        education: "Diploma in Hotel Mgmt", maritalStatus: "Married", religion: "Muslim", monthlyIncome: 50000,
        address: "8, Himayatnagar, Hyderabad", isNew: false, lastVisited: "2025-07-05",
        lastVisitDescription: "Skin rash", nextVisit: "2025-07-22"
    },
    {
        id: "P027", name: "Lata", mobile: "9820012345", age: 42, gender: "Female", occupation: "Clerk",
        education: "B.A.", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 39000,
        address: "19, Secunderabad", isNew: false, lastVisited: "2025-07-10",
        lastVisitDescription: "Diabetes review", nextVisit: "2025-07-19"
    },
    {
        id: "P028", name: "Nikhil", mobile: "9877700011", age: 23, gender: "Male", occupation: "Intern",
        education: "BBA", maritalStatus: "Single", religion: "Hindu", monthlyIncome: 15000,
        address: "63, Tarnaka, Hyderabad", isNew: true, lastVisited: "", lastVisitDescription: "",
        nextVisit: "2025-07-19"
    },
    {
        id: "P029", name: "Pooja", mobile: "9767889988", age: 31, gender: "Female", occupation: "Graphic Designer",
        education: "BFA", maritalStatus: "Single", religion: "Hindu", monthlyIncome: 47000,
        address: "37, Gachibowli, Hyderabad", isNew: false, lastVisited: "2025-07-12",
        lastVisitDescription: "Vision issues", nextVisit: "2025-07-23"
    },
    {
        id: "P030", name: "Rohit", mobile: "9878887766", age: 34, gender: "Male", occupation: "Marketing Executive",
        education: "MBA", maritalStatus: "Married", religion: "Hindu", monthlyIncome: 62000,
        address: "58, Kondapur, Hyderabad", isNew: false, lastVisited: "2025-07-15",
        lastVisitDescription: "Consultation", nextVisit: "2025-07-19"
    }
];

// let patientMedicalData = [];

const getAllPatients = async () => {
    try {
        return patients;
    } catch (error) {
        console.log(error);
    }
}

const addPatient = async (patientData) => {
    try {
        patients.push({ id: `P00${patients.length + 1}`, ...patientData });
    } catch (error) {
        console.log(error);
    }
}

const getPatientById = async(id) => {
    try {
        return patients.find(patient => patient.id === id);
    } catch (error) {
        console.log(error);
    }
}

export { getAllPatients, addPatient, getPatientById };