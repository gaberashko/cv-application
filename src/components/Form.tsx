
import "./Form.scss";
import InputField from './InputField';
import Button from "./Button";
import Accordion from './Accordion';

type educationData = {
    [key: string]: string;
    id: string;
    school: string;
    degree: string;
    major: string;
    startDate: string;
    endDate: string;
}

type experienceData = {
    [key: string]: string | string[];
    id: string;
    company: string;
    position: string;
    responsibilities: string;
    startDate: string;
    endDate: string;
}

type formData = {
    [key: string]: string | educationData[] | experienceData[];
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    educations: educationData[];
    experiences: experienceData[];
}

const initialData: formData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    educations: [],
    experiences: [],
}

const defaultEducationData: Partial<educationData> = {
    school: "",
    degree: "",
    major: "",
    startDate: "",
    endDate: "",
}

const defaultExperienceData: Partial<experienceData> = {
    id: "",
    company: "",
    position: "",
    responsibilities: "",
    startDate: "",
    endDate: "",
}


export default function Form({title, data, onChange, onSubmit}: {title: string, data:formData, onChange: (data: formData) => void, onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void}) {

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id?: string): void {
        const newData = {...data};
        // We do grab an ID here
        console.log(id);

        if (id) {
            newData.educations = newData.educations.map(ed => ed.id === id ? {...ed, [e.target.id]: e.target.value} : ed);
            newData.experiences = newData.experiences.map(ex => ex.id === id ? {...ex, [e.target.id]: e.target.value} : ex);
            console.log(newData);
        } else {
            newData[e.target.id as keyof formData] = e.target.value;
        }
        onChange(newData);
    }


    function addEducation(): void {
        const newEducationData = {...defaultEducationData, id: crypto.randomUUID()} as educationData;
        const newData = {...data};
        
        newData.educations.push(newEducationData);
        
        onChange(newData);
    }

    function removeEducation(id: string) {
        const newData = {...data, educations: data.educations.filter(e => e.id !== id)};
        onChange(newData);
    }

    function addExperience(): void {
        const newExperienceData = {...defaultExperienceData, id: crypto.randomUUID()} as experienceData;
        const newData = {...data};
        
        newData.experiences.push(newExperienceData);
        
        onChange(newData);
    }

    function removeExperience(id: string): void {
        const newData = {...data, experiences: data.experiences.filter(e => e.id !== id)};
        onChange(newData);
    }
    
    return (
    <form>
        <h1>{title}</h1>
        <Accordion title="General info">
            <InputField id="firstName" label="First Name" value={data.firstName}
            placeholder="John" required onChange={handleChange}/>
            <InputField id="lastName" label="Last Name" value={data.lastName}
            placeholder="Smith" required onChange={handleChange}/>
            <InputField id="email" label="Email Address" type="email" value={data.email}
            placeholder="JohnSmith83@gmail.com" required onChange={handleChange}/>
            <InputField id="phone" label="Phone Number" type="tel" value={data.phone}
            placeholder="652-389-7124" required onChange={handleChange}/>
        </Accordion>
        <Accordion title="Education">
            {data.educations.map((ed, i) =>  
               <fieldset className="educationSection">
                <legend>Education {i+1}</legend>
                <InputField id={"school"} label="School Name" value={ed.school}
                placeholder="University of Pennsylvania" onChange={(e) => {handleChange(e, ed.id)}}/>
                <InputField id="degree" label="Degree" value={ed.degree}
                placeholder="Bachelor's Degree" onChange={(e) => {handleChange(e, ed.id)}}/>
                <InputField id="major" label="Major of Study" value={ed.major}
                placeholder="Computer Science" onChange={(e) => {handleChange(e, ed.id)}}/>
                <InputField id="startDate" label="Start Date" type="date" value={ed.startDate}
                placeholder="" onChange={(e) => {handleChange(e, ed.id)}}/>
                <InputField id="endDate" label="Graduation Date" type="date" value={ed.endDate}
                placeholder="" onChange={(e) => {handleChange(e, ed.id)}}/>
                <Button id="removeEducation" text="Remove Education" type="secondary" onClick={(e) => {
                e.preventDefault();
                removeEducation(ed.id);}}/>
            </fieldset>)}
        
            <Button id="addEducation" text="Add Education" onClick={(e) => {
                e.preventDefault();
                addEducation();}}/>
        </Accordion>
        <Accordion title="Work Experience">
            {data.experiences.map((ex, i) =>  
               <fieldset className="experienceSection">
                <legend>Experience {i+1}</legend>
                <InputField id={"company"} label="Company" value={ex.company}
                placeholder="Target Coorporation" onChange={(e) => {handleChange(e, ex.id)}}/>
                <InputField id="position" label="Position" value={ex.position}
                placeholder="Guest Advocate" onChange={(e) => {handleChange(e, ex.id)}}/>
                <InputField id="responsibilities" label="Responsibilities" type="textarea" value={ex.responsibilities}
                placeholder="Ringing up guests; handling transactions." onChange={(e) => {handleChange(e, ex.id)}}/>
                <InputField id="startDate" label="Start Date" type="date" value={ex.startDate}
                placeholder="" onChange={(e) => {handleChange(e, ex.id)}}/>
                <InputField id="endDate" label="End Date" type="date" value={ex.endDate}
                placeholder="" onChange={(e) => {handleChange(e, ex.id)}}/>
                <Button id="removeExperience" text="Remove Experience" type="secondary" onClick={(e) => {
                e.preventDefault();
                removeExperience(ex.id);}}/>
            </fieldset>)}
        
            <Button id="addEducation" text="Add Experience" onClick={(e) => {
                e.preventDefault();
                addExperience();}}/>
        </Accordion>
        <Button id="submit" text="Preview" onClick={onSubmit}/>
    </form>)
}

export {initialData};
export type {formData};