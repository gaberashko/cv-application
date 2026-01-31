import { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
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
import Button from './components/Button';


function App() {
  const [data, setFormData] = useState<formData>(initialData);
  const [previewCV, setPreviewCV] = useState<boolean>(false);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
    <Header title="CV Generator">
      {previewCV && <Button text="Export" onClick={reactToPrintFn}/>}
    </Header>
    <SidebarButton text="Edit" onClick={() => setPreviewCV(false)} hidden={!previewCV}/>
    <Main styles={previewCV ? {gridTemplateColumns: "0fr 1fr", justifyContent:"center", justifyItems:"center"} : {}}>
      <Card hidden={previewCV} ref={contentRef}>
          <Form title="CV Info" data={data} onChange={setFormData} onSubmit = {e => {
            e.preventDefault();
            setPreviewCV(!previewCV)}}/>
      </Card>
      <Card styles={previewCV ? {width: "clamp(200px, 50vw, 800px)"} : {}}>
        <CV data={data} contentRef={contentRef}/>
      </Card>
    </Main>
    <Footer />
    </>
  )
}

export default App
