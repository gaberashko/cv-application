import { useState } from 'react'
import './styles/base/_index.scss';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import Card from './components/Card';
import Form from './components/Form';
import CV from './components/CV';
import SidebarButton from './components/SidebarButton';
import { initialData } from './components/Form';
import type { formData } from './components/Form';


function App() {
  const [data, setFormData] = useState<formData>(initialData);
  const [previewCV, setPreviewCV] = useState<boolean>(false);

  return (
    <>
    <Header title="CV Generator"/>
    <SidebarButton text="Edit" onClick={() => setPreviewCV(false)}/>
    <Main styles={previewCV ? {gridTemplateColumns: "0fr 1fr", justifyContent:"center", justifyItems:"center"} : {}}>
      <Card hidden={previewCV}>
          <Form title="CV Info" data={data} onChange={setFormData} onSubmit = {e => {
            e.preventDefault();
            setPreviewCV(!previewCV)}}/>
      </Card>
      <Card styles={previewCV ? {width: "clamp(200px, 50vw, 800px)"} : {}}>
        <CV data={data} />
      </Card>
    </Main>
    <Footer />
    </>
  )
}

export default App
