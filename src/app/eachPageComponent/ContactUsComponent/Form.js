'use client'

import style from "../../Styles/ContactUsStyle/Form.module.scss";
import { useState } from 'react';

export default function Form() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',    
        message: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to an API
        console.log('Form data:', formData);
      };
  

  return (
    <section className={`${style.MainBackground} container pt-3 pb-3`}>
      <div>
        <div>
          <p className="title">ارتباط با ما</p>
        </div>
        <form  onSubmit={handleSubmit} className={`${style.formStyle} mt-2`}>
          <div className={`${style.adjustFormDirection} d-flex flex-row gap-4`}>
            <div className="d-flex flex-column w-50">
              <label htmlFor="name">نام و نام خانوادگی*</label>
              <input onChange={handleChange} value={formData.name} id="name" name="name" type="text" placeholder="نام خانوادگی خود را بنویسید." required/>
            </div>
            <div className="d-flex flex-column w-50">
              <label htmlFor="phone">تلفن تماس*</label>
              <input onChange={handleChange} value={formData.phone} id="phone" name="phone"  type="text" placeholder="شماره تلفن خود را بنویسید." required />
            </div>
          </div>

           <div className="mt-3">
            <label htmlFor="message" style={{display:'block'}}>پیام شما*</label>
            <textarea onChange={handleChange} value={formData.message} className={style.textArea} placeholder="متن مورد نظر را اینجا بنویسید." name="message" id="message" cols="30" rows="10" required></textarea>
          </div>
          <div>
            <button className={style.submitButton} type="submit">
              تماس با ما  
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
