"use client";

import React from "react";

import style from "../Styles/HomeStyle/FAQ.module.scss";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";

export default function FAQ() {
  const [key, setKey] = useState("مشخصات");

  const QA = [
    { title: "آیا طرح هولوگرام در قیمت آن تاثیر دارد؟", description: "" },
    { title: "هولوگرام ها در چه رنگ های تولید میشوند؟", description: "" },
    {
      title: "آیا آذرهولوگرام محصولات دیگری غیراز هولوگرام تولید میکند ؟",
      description: "",
    },
    {
      title: "چه محصولاتی میتواند از هولوگرام استفاده کنند ؟",
      description: "",
    },
    {
      title: "آیا امکان تولید هولوگرام در هر سایزی وجود دارد ؟",
      description: "",
    },
    { title: "هولوگرام آماده چیست؟", description: "" },
    { title: "نحوه محاسبه قیمت هولوگرام چگونه است؟", description: "" },
    { title: "نحوه نصب برچسب ها روی محصول چگونه است ؟", description: "" },
  ];

  const QAObject = QA.map((url, i) => ({
    id: i,
    title: url.url,
    description: url.description,
  }));

  return (
    <section className="container mt-4 mb-5">
      <div className={`${style.titleStyle} title mt-2 mb-3`}>
        <span>همه چیز درباره‌ی </span>
        <span className={`${style.coloerdTitle}`}>هولوگرام</span>
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
                <Accordion.Header>
                  آیا طرح هولوگرام در قیمت آن تاثیر دارد؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                  بله، هر مقدار پیچیدگی طرح و آیتم های امنیتی بیشتر باشد، هزینه
                  تولید افزایش می یابد.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                  هولوگرام ها در چه رنگ های تولید میشوند؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                  آذرهولوگرام امکان تولید کلیه رنگ های موجود را دارد.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                  آیا آذرهولوگرام محصوالت دیگری غیراز هولوگرام تولید میکند؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                  بله، آذرهولوگرام با بکارگیری تجهیزات روز و بکارگیری نیروهای
                  متخصص امکان تولید انواع لیبل های امنیتی و فوق امنیتی، لیبل های
                  پلمپ، انواع اسکرچ و هولواسکرچ ، هولوگرام های کارت شناسایی ،
                  شفاف و غیره ... را دارد.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                  چه محصولاتی میتواند از هولوگرام استفاده کنند؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                  باتوجه به اینکه در بازار فعلی اجناس تقلبی بسیار زیاد شده،
                  تمامی محصولاتی که قصد تایید اصالت کالا به مشتری را دارد، می
                  توانند از برچسب هولوگرام استفاده کنند.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                  آیا امکان تولید هولوگرام در هر سایزی وجود دارد؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                  بله، با توجه به نیاز مشتری در هر سایزی تولید میگردد.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>هولوگرام آماده چیست؟</Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                  هولوگرام که اختصاصی نیست و در سایز های مختلف قابل اجراست.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                  نحوه محاسبه قیمت هولوگرام چگونه است؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                  باتوجه به تیراژ، ابعاد و جنس هولوگرام محاسبه میگردد. نحوه نصب
                  برچسب ها روی محصول چگونه است؟ هم امکان نصب به عنوان پلمپ درب
                  محصول هست و هم الصاق روی بدنه محصول.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            
          </Tab>
          <Tab eventKey="ویژگی‌های منحصر به فرد" title="ویژگی‌های منحصر به فرد">
          <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                آیا میتوان یک طرح خاص را با چند رنگ تولید کرد؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                بله در صورتی که هر رنگ حداقل تیراژ را پوشش دهد.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                چه محصولاتی میتواند از هولوگرام استفاده کنند؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                باتوجه به اینکه در بازار فعلی اجناس تقلبی بسیار زیاد شده، تمامی محصولاتی که قصد تایید اصالت کالا به مشتری را دارد، می توانند از برچسب هولوگرام استفاده کنند. 
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                آیا میتوان یک طرح خاص را با چند رنگ تولید کرد؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                بله در صورتی که هر رنگ حداقل تیراژ را پوشش دهد.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                آیا میتوان هولوگرام را با هر طرحی تولید کرد؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                بله، هولوگرام ها در هر ابعاد و یا طرحی قابل اجرا و تولید می باشد.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
           
          </Tab>
          <Tab eventKey="فرایند سفارش" title="فرایند سفارش">
          <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                نحوه طراحی برچسب و تاثیر آن توسط مشتری به چه صورت است؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                بعد از ارائه لوگو توسط مشتری، طراحی اولیه بندی هولوگرام در حداقل دو طرح انجام میگردد و بعد از تاثیر، مشتری جهت باقی مراحل به تولید ارجاع می شود. 

                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                محصول نهایی به چه صورت تحویل مشتری می شود؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                سفارش داخل کارتون های پلمپ از دفتر مرکزی با ارائه معرفی نامه تحویل میشود.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                طرح آرم و لوگو با چه فرمتی باید تحویل شود؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                فایل با فرمت کرل، فوتوشاپ با کیفیت قابل اجراست.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                آیا قیمت هولوگرامهای دارای شماره سریال با هولوگرامهای معمولی متفاوت است ؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                بله با توجه به رنگ سلایر و سایز هولوگرام محاسبه قیمت میشود.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                نحوه پرداخت مبلغ قرارداد تولید هولوگرام به چه صورت است؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                ٪50 به عنوان ودیعه و الباقی زمان تحویل محصول تسویه میگردد. 
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className={style.accordionStyle}>
              <Accordion.Item className={style.accordionItem} eventKey="0">
                <Accordion.Header>
                حداقل تیراژ برای تولید هولوگرام چقدر است؟
                </Accordion.Header>
                <Accordion.Body className={style.accordionBody}>
                جهت شروع از 200 شیت امکان تولید وجود دارد.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}
