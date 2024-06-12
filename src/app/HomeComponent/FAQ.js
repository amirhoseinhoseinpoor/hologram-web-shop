'use client'
import style from '../Styles/HomeStyle/FAQ.module.scss'
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
 


export default function FAQ() {

    const [key, setKey] = useState('مشخصات');

    const QA = [
      {title : 'آیا طرح هولوگرام در قیمت آن تاثیر دارد؟' , description : ''},
      {title : 'هولوگرام ها در چه رنگ های تولید میشوند؟' , description : ''},
      {title : 'آیا آذرهولوگرام محصولات دیگری غیراز هولوگرام تولید میکند ؟' , description : ''},
      {title : 'چه محصولاتی میتواند از هولوگرام استفاده کنند ؟' , description : ''},
      {title : 'آیا امکان تولید هولوگرام در هر سایزی وجود دارد ؟' , description : ''},
      {title : 'هولوگرام آماده چیست؟' , description : ''},
      {title : 'نحوه محاسبه قیمت هولوگرام چگونه است؟' , description : ''},
      {title : 'نحوه نصب برچسب ها روی محصول چگونه است ؟' , description : ''},

      
    ];

    const QAObject = QA.map((url , i)=>({
      id : i ,
      title : url.url,
      description : url.description,
    }))

    return(
        <section className="container mt-4 mb-5"> 
            <div className={`${style.titleStyle} fs-5 mt-2 mb-3`}>
                <span>همه چیز درباره‌ی </span><span className={`${style.coloerdTitle}`}>هولوگرام</span>
            </div>

            <div>
              <Tabs
                 id="controlled-tab-example"
                 activeKey={key}
                 onSelect={(k) => setKey(k)}
                 className={style.buttonsTabbed}
              >
                 <Tab eventKey="مشخصات" title="مشخصات">
                    <Accordion className={style.accordionStyle}>
                       <Accordion.Item className={style.accordionItem} eventKey="0">
                         <Accordion.Header>آیا طرح هولوگرام در قیمت آن تاثیر دارد؟</Accordion.Header>                  
                          <Accordion.Body className={style.accordionBody}>
                           بله، هر مقدار پیچیدگی طرح و آیتم های امنیتی بیشتر باشد، هزینه تولید افزایش می یابد.
                         </Accordion.Body>
                       </Accordion.Item>                      
                    </Accordion>
                    <Accordion className={style.accordionStyle}>
                       <Accordion.Item className={style.accordionItem} eventKey="0">
                         <Accordion.Header>آیا طرح هولوگرام در قیمت آن تاثیر دارد؟</Accordion.Header>                  
                          <Accordion.Body className={style.accordionBody}>
                           بله، هر مقدار پیچیدگی طرح و آیتم های امنیتی بیشتر باشد، هزینه تولید افزایش می یابد.
                         </Accordion.Body>
                       </Accordion.Item>                      
                    </Accordion>
                    <Accordion className={style.accordionStyle}>
                       <Accordion.Item className={style.accordionItem} eventKey="0">
                         <Accordion.Header>آیا طرح هولوگرام در قیمت آن تاثیر دارد؟</Accordion.Header>                  
                          <Accordion.Body className={style.accordionBody}>
                           بله، هر مقدار پیچیدگی طرح و آیتم های امنیتی بیشتر باشد، هزینه تولید افزایش می یابد.
                         </Accordion.Body>
                       </Accordion.Item>                      
                    </Accordion>
                    <Accordion className={style.accordionStyle}>
                       <Accordion.Item className={style.accordionItem} eventKey="0">
                         <Accordion.Header>آیا طرح هولوگرام در قیمت آن تاثیر دارد؟</Accordion.Header>                  
                          <Accordion.Body className={style.accordionBody}>
                           بله، هر مقدار پیچیدگی طرح و آیتم های امنیتی بیشتر باشد، هزینه تولید افزایش می یابد.
                         </Accordion.Body>
                       </Accordion.Item>                      
                    </Accordion>
                    <Accordion className={style.accordionStyle}>
                       <Accordion.Item className={style.accordionItem} eventKey="0">
                         <Accordion.Header>آیا طرح هولوگرام در قیمت آن تاثیر دارد؟</Accordion.Header>                  
                          <Accordion.Body className={style.accordionBody}>
                           بله، هر مقدار پیچیدگی طرح و آیتم های امنیتی بیشتر باشد، هزینه تولید افزایش می یابد.
                         </Accordion.Body>
                       </Accordion.Item>                      
                    </Accordion>
                    <Accordion className={style.accordionStyle}>
                       <Accordion.Item className={style.accordionItem} eventKey="0">
                         <Accordion.Header>آیا طرح هولوگرام در قیمت آن تاثیر دارد؟</Accordion.Header>                  
                          <Accordion.Body className={style.accordionBody}>
                           بله، هر مقدار پیچیدگی طرح و آیتم های امنیتی بیشتر باشد، هزینه تولید افزایش می یابد.
                         </Accordion.Body>
                       </Accordion.Item>                      
                    </Accordion>
                    <Accordion className={style.accordionStyle}>
                       <Accordion.Item className={style.accordionItem} eventKey="0">
                         <Accordion.Header>آیا طرح هولوگرام در قیمت آن تاثیر دارد؟</Accordion.Header>                  
                          <Accordion.Body className={style.accordionBody}>
                           بله، هر مقدار پیچیدگی طرح و آیتم های امنیتی بیشتر باشد، هزینه تولید افزایش می یابد.
                         </Accordion.Body>
                       </Accordion.Item>                      
                    </Accordion>
                    <Accordion className={style.accordionStyle}>
                       <Accordion.Item className={style.accordionItem} eventKey="0">
                         <Accordion.Header>آیا طرح هولوگرام در قیمت آن تاثیر دارد؟</Accordion.Header>                  
                          <Accordion.Body className={style.accordionBody}>
                           بله، هر مقدار پیچیدگی طرح و آیتم های امنیتی بیشتر باشد، هزینه تولید افزایش می یابد.
                         </Accordion.Body>
                       </Accordion.Item>                      
                    </Accordion>


                 </Tab>
                 <Tab eventKey="ویژگی‌های منحصر به فرد" title="ویژگی‌های منحصر به فرد">
                   Tab content for Profile
                 </Tab>
                 <Tab eventKey="فرایند سفارش" title="فرایند سفارش">
                   Tab content for Contact
                 </Tab>
               </Tabs>
            </div>
           

        </section>
    )
}