import React, { useState } from 'react'
// import profileImg from '../../images/Picsart_22-08-28_04-42-23-038.jpg'
import './writePost.css'
import { Row } from 'react-bootstrap'
export default function WritePost({ image, img = true, text }) {
  const [show, setshow] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    
  // console.log();
    const handleFileChange = (event) => {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);
      const filePreviews = files.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise(resolve => {
          reader.onload = () => resolve(reader.result);
        });
      });
      Promise.all(filePreviews).then(previews => setPreviews(previews));
      console.log(selectedFiles);
    };


  const handleShow = () => setshow(true);
  const handleClose = () => setshow(false);

  return (
    <>
      <div className='box p-3'>
        <Row className='d-flex align-item-center' >
          {img && <div className=' col-lg-2'>
            <img src={image} alt="profile" className='img-profile-post img-fluid rounded-circle  mx-auto' />
          </div>}

          <div className={` ${img ? 'col-lg-8' : 'col-lg-12 col-12'} rounded-pill d-flex align-items-center justify-content-center`}>
            <div className='add-post btn btn-primary px-3 py-4 rounded-pill d-flex align-items-center justify-content-center' onClick={handleShow} >
              {text}
            </div>
          </div>
        </Row>

      </div>
      {show &&<div className='window-add-post' >
        <div className='overlay' onClick={handleClose}>
          
        </div>
        <form className='form-add-post d-flex flex-column'>
          <textarea type="text-box" name="" className='p-3 py-2' rows="5" cols="40"  />
          <label htmlFor="fileInput" className="custom-file-upload">
            Chooce photo
          </label>
          <input type="file" name="" id='fileInput' className='p-3 py-2' multiple onChange={handleFileChange} />
          <div className="imagePreview d-flex ">
            {previews.map((src, index) => (
              <img key={index} src={src} alt={`preview-${index}`} className='img-fluid ' />
            ))}
          </div>
            <input type="button" name="" value="add post" className='btn btn-primary'  />
        </form>
      </div>}
    </>
  )
}
