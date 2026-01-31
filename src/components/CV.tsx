import "./CV.scss";
import type { formData } from "./Form"

type cvProps = {
    data: formData;
    contentRef?: React.RefObject<null>
}

function formatDate(str: string): string {
    if (str === "") return str;
    
    const date = new Date(str);
    console.log("Date object created:", date);

    const formattedDate: string = date.toLocaleString("en-US", {month: "long", year: "numeric"});
    

    return formattedDate;
}

export default function CV({data, contentRef}: cvProps) {
    return (
        <div className="CV" ref={contentRef}>
            <div className="CV__header">
                <h1>{data.firstName + " " + data.lastName}</h1>
            </div>
            {(data.firstName || data.lastName) && <hr></hr>}
            <div className="CV__content">
                <div className="CV__column--primary" style={(data.email || data.phone) ? {borderRight:"2px solid", height:"100%" } : {height:0}}>
                    <section id="education" className="CV__education">
                        {data.educations.length > 0 && <h2>Education</h2>}
                        {data.educations.map((ed, i) =>
                            <article id={`education${i}`}>
                                <h3><b>{ed.degree + (ed.degree ? " in " : "") + ed.major}</b></h3>
                                <p>{ed.school}</p>
                                <p><i>{formatDate(ed.startDate) + ((ed.startDate || ed.endDate) ? " - " : "") + formatDate(ed.endDate)}</i></p>
                            </article>
                        )}
                    </section>
                    <section id="experience" className="CV__experience">
                        {data.experiences.length > 0 && (<><h2>Work Experience</h2><hr></hr></>)}
                        {data.experiences.map((ex, i) =>
                            <article id={`experience${i}`}>
                                <h3><b>{ex.position}</b></h3>
                                <p>{ex.company}</p>
                                <p><i>{formatDate(ex.startDate) + ((ex.startDate || ex.endDate) ? " - " : "") + formatDate(ex.endDate)}</i></p>
                                <ul>
                                    {ex.responsibilities != "" ? ex.responsibilities.split(/\n/).map(line => (<li>{line}</li>)): null}
                                </ul>
                            </article>
                        )}
                    </section>
                </div>
                <div className="CV__column--secondary">
                    <section id="contact" className="CV__contact">
                        {(data.email || data.phone) && <h2>Contact</h2>}
                        {data.phone && <p><b>Phone: </b>{data.phone}</p>}
                        {data.email && <p><b>Email: </b>{data.email}</p>}
                    </section>
                </div>
            </div>
        </div>
    )
}