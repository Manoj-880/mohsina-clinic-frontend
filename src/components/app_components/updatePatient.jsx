import React, { useState } from 'react';
import { Input, Select, Button, Steps, Row, Col, DatePicker } from 'antd';
import { updatePatient } from '../../api/patients_api';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const { Step } = Steps;

const UpdatePatient = ({patient, onFinish, fetchPatients }) => {
    const [current, setCurrent] = useState(0);
    const [formValues, setFormValues] = useState(() => {
        const p = patient || {};
        const prelim = (p.priliminaryDetails && p.priliminaryDetails[0]) || {};
        const menstrual = p.patientAsPerson?.menstrualHistory?.menses || {};
        const concomitance = p.patientAsPerson?.menstrualHistory?.concomitance || {};

        return {
            name: prelim.name || "",
            age: prelim.age || "",
            gender: prelim.gender || "",
            occupation: prelim.occupation || "",
            education: prelim.education || "",
            maritalStatus: prelim.maritalStatus || "",
            religion: prelim.religion || "",
            monthlyIncome: prelim.monthlyIncome || "",
            address: prelim.address || "",
            doctor: prelim.doctor || "Mohasina",
            dateOfCase: prelim.dateOfCase ? dayjs(prelim.dateOfCase) : dayjs(),
            mobileNumber: prelim.mobileNumber || "",

            chiefComplaint: p.chiefComplaint || "",
            historyOfChiefComplaint: p.historyOfChiefComplaint || "",
            pastHistory: p.pastHistory || "",
            familyHistory: p.familyHistory || "",

            physicalBuilt: p.patientAsPerson?.appearance?.physicalBuilt || "",
            skin: p.patientAsPerson?.appearance?.skin || "",
            hair: p.patientAsPerson?.appearance?.hair || "",
            nail: p.patientAsPerson?.appearance?.nail || "",
            face: p.patientAsPerson?.appearance?.face || "",

            appetite: p.patientAsPerson?.digestion?.appetite || "",
            diet: p.patientAsPerson?.digestion?.diet || "",
            diseases: p.patientAsPerson?.digestion?.diseases || "",
            cravings: p.patientAsPerson?.digestion?.cravings || "",
            aversions: p.patientAsPerson?.digestion?.aversions || "",
            thirst: p.patientAsPerson?.digestion?.thirst || "",

            stool: p.patientAsPerson?.elimination?.stool || "",
            perspiration: p.patientAsPerson?.elimination?.perspiration || "",
            urine: p.patientAsPerson?.elimination?.urine || "",

            menarche: p.patientAsPerson?.menstrualHistory?.menarche || "",
            LMP: p.patientAsPerson?.menstrualHistory?.LMP || "",
            menopause: p.patientAsPerson?.menstrualHistory?.menopause || "",
            leucorrhea: p.patientAsPerson?.menstrualHistory?.leucorrhea || "",

            mensesDuration: menstrual.duration || "",
            mensesCycle: menstrual.cycle || "",
            mensesFlow: menstrual.flow || "",
            mensesColor: menstrual.color || "",
            mensesCloths: menstrual.cloths || "",
            mensesOdour: menstrual.odour || "",
            mensesStains: menstrual.stains || "",

            concomitanceBefore: concomitance.before || "",
            concomitanceDuring: concomitance.during || "",
            concomitanceAfter: concomitance.after || "",

            sexualFunctions: p.patientAsPerson?.sexualFunctions || "",

            lifeSpace: p.lifeSpace || "",
            thermals: p.thermals || "",
            diagnosis: p.diagnosis || ""
        };
    });


    const updateField = (field, value) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
    };

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const handleSubmit = async () => {
        try {
        const payload = {
            priliminaryDetails: {
            name: formValues.name,
            age: formValues.age,
            gender: formValues.gender,
            occupation: formValues.occupation,
            education: formValues.education,
            maritalStatus: formValues.maritalStatus,
            religion: formValues.religion,
            monthlyIncome: formValues.monthlyIncome,
            address: formValues.address,
            doctor: formValues.doctor,
            dateOfCase: formValues.dateOfCase,
            mobileNumber: formValues.mobileNumber,
            },
            chiefComplaint: formValues.chiefComplaint,
            historyOfChiefComplaint: formValues.historyOfChiefComplaint,
            pastHistory: formValues.pastHistory,
            familyHistory: formValues.familyHistory,
            patientAsPerson: {
            appearance: {
                physicalBuilt: formValues.physicalBuilt,
                skin: formValues.skin,
                hair: formValues.hair,
                nail: formValues.nail,
                face: formValues.face
            },
            digestion: {
                appetite: formValues.appetite,
                diet: formValues.diet,
                diseases: formValues.diseases,
                cravings: formValues.cravings,
                aversions: formValues.aversions,
                thirst: formValues.thirst
            },
            elimination: {
                stool: formValues.stool,
                perspiration: formValues.perspiration,
                urine: formValues.urine
            },
            menstrualHistory: {
                menarche: formValues.menarche,
                LMP: formValues.LMP,
                menopause: formValues.menopause,
                leucorrhea: formValues.leucorrhea,
                menses: {
                    duration: formValues.mensesDuration,
                    cycle: formValues.mensesCycle,
                    flow: formValues.mensesFlow,
                    color: formValues.mensesColor,
                    cloths: formValues.mensesCloths,
                    odour: formValues.mensesOdour,
                    stains: formValues.mensesStains,
                },
                concomitance: {
                before: formValues.concomitanceBefore,
                during: formValues.concomitanceDuring,
                after: formValues.concomitanceAfter,
                },
            },
            sexualFunctions: formValues.sexualFunctions
            },
            lifeSpace: formValues.lifeSpace,
            thermals: formValues.thermals,
            diagnosis: formValues.diagnosis
        };

        const user = JSON.parse(localStorage.getItem('user'));
        const response = await updatePatient(patient.priliminaryDetails[0].patientId, payload, user.secretKey);

        if (response.success) {
            toast.success(response.message);
            setFormValues({});
            fetchPatients();
            onFinish();
        } else {
            toast.error(response.message);
        }
        } catch (err) {
        console.log(err);
        toast.error("Please fill all required fields.");
        }
    };

    const steps = [
        {
        title: 'Priliminary',
        content: (
            <>
                <Col style={{ marginBottom: 16 }} span={24}><Input placeholder="Name" value={formValues.name} onChange={e => updateField('name', e.target.value)} /></Col>
                <Row style={{ marginBottom: 16 }}  gutter={16}>
                    <Col span={8}><Input placeholder="Age" value={formValues.age} onChange={e => updateField('age', e.target.value)} /></Col>
                    <Col span={8}><Select placeholder="Gender" value={formValues.gender} onChange={v => updateField('gender', v)} options={[{value: 'Male'}, {value: 'Female'}]} /></Col>
                    <Col span={8}><Select placeholder="Marital Status" value={formValues.maritalStatus} onChange={v => updateField('maritalStatus', v)} options={[{value: 'Single'}, {value: 'Married'}, {value: 'Divorced'}]} /></Col>
                </Row>
                <Row style={{ marginBottom: 16 }}  gutter={16}>
                    <Col span={8}><Input placeholder="Occupation" value={formValues.occupation} onChange={e => updateField('occupation', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Education" value={formValues.education} onChange={e => updateField('education', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Monthly Income" value={formValues.monthlyIncome} onChange={e => updateField('monthlyIncome', e.target.value)} /></Col>
                </Row>
                <Row style={{ marginBottom: 16 }}  gutter={16}>
                    <Col span={8}><Input placeholder="Religion" value={formValues.religion} onChange={e => updateField('religion', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Address" value={formValues.address} onChange={e => updateField('address', e.target.value)} /></Col>
                </Row>
                <Row style={{ marginBottom: 16 }}  gutter={16}>
                    <Col span={8}><Input placeholder="Doctor" value={formValues.doctor || "Mohasina"} onChange={e => updateField('doctor', e.target.value)} /></Col>
                    <Col span={8}><DatePicker style={{ width: '100%' }} placeholder="Date of Case" value={formValues.dateOfCase ? dayjs(formValues.dateOfCase) : dayjs()} onChange={(_, dateString) => updateField('dateOfCase', dateString)} /></Col>
                    <Col span={8}><Input placeholder="Mobile Number" value={formValues.mobileNumber} onChange={e => updateField('mobileNumber', e.target.value)} /></Col>
                </Row>
            </>
        )
        },
        {
        title: 'Complaints',
        content: (
            <>
                    <Col style={{ marginBottom: 16 }} ><Input placeholder="Chief Complaint" value={formValues.chiefComplaint} onChange={e => updateField('chiefComplaint', e.target.value)} /></Col>
                    <Col style={{ marginBottom: 16 }} ><Input placeholder="Past History" value={formValues.pastHistory} onChange={e => updateField('pastHistory', e.target.value)} /></Col>
                    <Col style={{ marginBottom: 16 }} ><Input placeholder="History of Chief Complaint" value={formValues.historyOfChiefComplaint} onChange={e => updateField('historyOfChiefComplaint', e.target.value)} /></Col>
                    <Col style={{ marginBottom: 16 }} ><Input placeholder="Family History" value={formValues.familyHistory} onChange={e => updateField('familyHistory', e.target.value)} /></Col>
            </>
        )
        },
        {
            title: 'Patient As Person',
            content: (
                <>
                <Row gutter={16}  style={{ marginBottom: 10 }} >
                    <Col span={8}><Input placeholder="Physical Built" value={formValues.physicalBuilt} onChange={e => updateField('physicalBuilt', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Skin" value={formValues.skin} onChange={e => updateField('skin', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Hair" value={formValues.hair} onChange={e => updateField('hair', e.target.value)} /></Col>
                </Row>
                <Row gutter={16}  style={{ marginBottom: 10 }} >
                    <Col span={8}><Input placeholder="Nail" value={formValues.nail} onChange={e => updateField('nail', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Face" value={formValues.face} onChange={e => updateField('face', e.target.value)} /></Col>
                </Row>
                <p style={{fontSize: "1rem", color: "grey"}}>Digestion</p>
                <Row gutter={16} style={{ marginBottom: 10 }} >
                    <Col span={8}><Input placeholder="Appetite" value={formValues.appetite} onChange={e => updateField('appetite', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Diet" value={formValues.diet} onChange={e => updateField('diet', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Diseases" value={formValues.diseases} onChange={e => updateField('diseases', e.target.value)} /></Col>
                </Row>
                <Row gutter={16} style={{ marginBottom: 10 }} >
                    <Col span={8}><Input placeholder="Cravings" value={formValues.cravings} onChange={e => updateField('cravings', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Aversions" value={formValues.aversions} onChange={e => updateField('aversions', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Thirst" value={formValues.thirst} onChange={e => updateField('thirst', e.target.value)} /></Col>
                </Row>
                <p style={{fontSize: "1rem", color: "grey"}}>Elimination</p>
                <Row gutter={16} style={{ marginBottom: 10 }} >
                    <Col span={8}><Input placeholder="Stool" value={formValues.stool} onChange={e => updateField('stool', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Perspiration" value={formValues.perspiration} onChange={e => updateField('perspiration', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Urine" value={formValues.urine} onChange={e => updateField('urine', e.target.value)} /></Col>
                </Row>

                <p style={{fontSize: "1rem", color: "grey"}}>Menstrual History</p>
                <Row gutter={16} style={{ marginBottom: 10 }} >
                    <Col span={8}><Input placeholder="Menarche" value={formValues.menarche} onChange={e => updateField('menarche', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="LMP" value={formValues.LMP} onChange={e => updateField('LMP', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Menopause" value={formValues.menopause} onChange={e => updateField('menopause', e.target.value)} /></Col>
                </Row>
                <Row gutter={16} style={{marginBottom: 10}}>
                    <Col span={8}><Input placeholder="Leucorrhea" value={formValues.leucorrhea} onChange={e => updateField('leucorrhea', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Menses Duration" value={formValues.mensesDuration} onChange={e => updateField('mensesDuration', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Menses Cycle" value={formValues.mensesCycle} onChange={e => updateField('mensesCycle', e.target.value)} /></Col>
                </Row>
                <Row gutter={16} style={{marginBottom: 10}}>
                    <Col span={8}><Input placeholder="Menses Flow" value={formValues.mensesFlow} onChange={e => updateField('mensesFlow', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Menses Color" value={formValues.mensesColor} onChange={e => updateField('mensesColor', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Menses Cloths" value={formValues.mensesCloths} onChange={e => updateField('mensesCloths', e.target.value)} /></Col>
                </Row>
                <Row gutter={16} style={{marginBottom: 10}}>
                    <Col span={8}><Input placeholder="Menses Odour" value={formValues.mensesOdour} onChange={e => updateField('mensesOdour', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="Menses Stains" value={formValues.mensesStains} onChange={e => updateField('mensesStains', e.target.value)} /></Col>
                </Row>

                <p style={{fontSize: "1rem", color: "grey"}}>Concomitance</p>
                <Row gutter={16} style={{marginBottom:10}}>
                    <Col span={8}><Input placeholder="Before Menses" value={formValues.concomitanceBefore} onChange={e => updateField('concomitanceBefore', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="During Menses" value={formValues.concomitanceDuring} onChange={e => updateField('concomitanceDuring', e.target.value)} /></Col>
                    <Col span={8}><Input placeholder="After Menses" value={formValues.concomitanceAfter} onChange={e => updateField('concomitanceAfter', e.target.value)} /></Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}><Input placeholder="Sexual Functions" value={formValues.sexualFunctions} onChange={e => updateField('sexualFunctions', e.target.value)} /></Col>
                </Row>
                </>
            )
            },
        {
        title: 'Other Details',
        content: (
            <Row gutter={16}>
            <Col span={8}><Input placeholder="Life Space" value={formValues.lifeSpace} onChange={e => updateField('lifeSpace', e.target.value)} /></Col>
            <Col span={8}><Input placeholder="Thermals" value={formValues.thermals} onChange={e => updateField('thermals', e.target.value)} /></Col>
            <Col span={8}><Input placeholder="Diagnosis" value={formValues.diagnosis} onChange={e => updateField('diagnosis', e.target.value)} /></Col>
            </Row>
        )
        }
    ];

    return (
        <div>
            <Steps current={current} style={{ marginBottom: 24 }}>
                {steps.map(item => (<Step key={item.title} title={item.title} />))}
            </Steps>
            <div style={{ marginBottom: 24 }}>
                {steps.map((step, index) => (
                <div key={index} style={{ display: current === index ? 'block' : 'none' }}>{step.content}</div>
                ))}
            </div>
            <div>
                {current > 0 && <Button onClick={prev} style={{ marginRight: 8 }}>Previous</Button>}
                {current < steps.length - 1 && <Button type="primary" onClick={next}>Next</Button>}
                {current === steps.length - 1 && <Button type="primary" onClick={handleSubmit}>Submit</Button>}
            </div>
        </div>
    );
}

export default UpdatePatient