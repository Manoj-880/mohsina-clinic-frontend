const followUps = [
    { patientId: 1, date: "2023-09-01", lastVisited: "2023-08-15", prescription: "Low carb diet, morning walk" },
    { patientId: 2, date: "2023-09-02", lastVisited: "2023-08-18", prescription: "Nux Vomica 30C - twice daily" },
    { patientId: 3, date: "2023-09-03", lastVisited: "2023-08-19", prescription: "Paracetamol 500mg, rest advised" },
    { patientId: 4, date: "2023-09-04", lastVisited: "2023-08-20", prescription: "Hypertension control - lifestyle plan" },
    { patientId: 5, date: "2023-09-05", lastVisited: "2023-08-22", prescription: "Vitamin D supplements, sun exposure" },
    { patientId: 6, date: "2023-09-06", lastVisited: "2023-08-23", prescription: "Aconite 200C - once daily" },
    { patientId: 7, date: "2023-09-07", lastVisited: "2023-08-25", prescription: "Diabetic meal plan, Metformin 500mg" },
    { patientId: 8, date: "2023-09-08", lastVisited: "2023-08-26", prescription: "Cough syrup, salt water gargle" },
    { patientId: 9, date: "2023-09-09", lastVisited: "2023-08-27", prescription: "Allergy drops, avoid dust exposure" },
    { patientId: 10, date: "2023-09-10", lastVisited: "2023-08-28", prescription: "Bryonia 30C - thrice daily" },
    { patientId: 11, date: "2023-09-11", lastVisited: "2023-08-28", prescription: "BP check, reduce salt intake" },
    { patientId: 12, date: "2023-09-12", lastVisited: "2023-08-29", prescription: "Rest, cold compress for migraine" },
    { patientId: 13, date: "2023-09-13", lastVisited: "2023-08-29", prescription: "Kali Mur 6X - twice daily" },
    { patientId: 14, date: "2023-09-14", lastVisited: "2023-08-30", prescription: "Iron supplements, diet changes" },
    { patientId: 15, date: "2023-09-15", lastVisited: "2023-08-30", prescription: "Stretching exercises, posture check" },
    { patientId: 16, date: "2023-09-16", lastVisited: "2023-09-01", prescription: "Cholesterol-lowering medication" },
    { patientId: 17, date: "2023-09-17", lastVisited: "2023-09-01", prescription: "Hyperacidity diet, Nat Phos 6X" },
    { patientId: 18, date: "2023-09-18", lastVisited: "2023-09-02", prescription: "Glucose monitoring, insulin update" },
    { patientId: 19, date: "2023-09-19", lastVisited: "2023-09-02", prescription: "Back strengthening physio" },
    { patientId: 20, date: "2023-09-20", lastVisited: "2023-09-03", prescription: "Homeopathy combo - chronic cold" },
    { patientId: 21, date: "2023-09-21", lastVisited: "2023-09-04", prescription: "Weight tracking, portion control" },
    { patientId: 22, date: "2023-09-22", lastVisited: "2023-09-04", prescription: "Pulse check, continue walking routine" },
    { patientId: 23, date: "2023-09-23", lastVisited: "2023-09-05", prescription: "Liver detox plan, warm water routine" },
    { patientId: 24, date: "2023-09-24", lastVisited: "2023-09-05", prescription: "Arnica 30C - injury recovery" },
    { patientId: 25, date: "2023-09-25", lastVisited: "2023-09-06", prescription: "Throat lozenges, warm fluids" },
    { patientId: 26, date: "2023-09-26", lastVisited: "2023-09-06", prescription: "Hairfall treatment, Biotin" },
    { patientId: 27, date: "2023-09-27", lastVisited: "2023-09-07", prescription: "Gas trouble - avoid spicy food" },
    { patientId: 28, date: "2023-09-28", lastVisited: "2023-09-08", prescription: "Nat Mur 30C - emotional balance" },
    { patientId: 29, date: "2023-09-29", lastVisited: "2023-09-08", prescription: "Neck pain physio, pillow support" },
    { patientId: 30, date: "2023-09-30", lastVisited: "2023-09-09", prescription: "Multivitamin support, deep sleep routine" }
];


const fetchFollowups = () => {
    try {
        return followUps;
    } catch (error) {
        console.log(error);
    };
};

const getFollowupofPatient = (patientId) => {
    try {
        return followUps.filter(followUp => followUp.patientId === patientId);
    } catch (error) {
        console.log(error);
    }
};


export { fetchFollowups, getFollowupofPatient };