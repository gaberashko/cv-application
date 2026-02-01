import { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import './styles/base/_index.scss';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import Card from './components/Card';
import Form from './components/Form';
import CV from './components/CV';
import FloatContainer from './components/FloatContainer';
import FloatButton from './components/FloatButton';
import { initialData } from './components/Form';
import type { formData } from './components/Form';


function App() {
  const [data, setFormData] = useState<formData>(initialData);
  const [previewCV, setPreviewCV] = useState<boolean>(false);

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ documentTitle: `${data.firstName}_${data.lastName}_Resume`,contentRef });

  return (
    <>
    <Header title="CV Generator">
    </Header>
    <Main styles={previewCV ? {gridTemplateColumns: "0fr 1fr", justifyContent:"center", justifyItems:"center"} : {}}>
      <FloatContainer>
        <FloatButton type="secondary" imgSrc="public/pencil.svg" alt="Edit CV" onClick={() => setPreviewCV(false)} hidden={!previewCV}/>
        <FloatButton type="primary" imgSrc="public/download.svg" alt="Edit CV" onClick={reactToPrintFn} hidden={!previewCV}/>
      </FloatContainer>
      <Card hidden={previewCV} ref={contentRef}>
          <Form title="CV Info" data={data} onChange={setFormData} onSubmit = {e => {
            e.preventDefault();
            setPreviewCV(!previewCV)}}/>
      </Card>
      <Card styles={previewCV ? {width: "clamp(200px, 90vw, 800px)"} : {}}>
        <CV data={data} contentRef={contentRef}/>
      </Card>
    </Main>
    <Footer />
    </>
  )
}

export default App
