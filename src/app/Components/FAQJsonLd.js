// Server component — injects FAQ structured data for Google rich results
// Place <FAQJsonLd /> next to <FAQ /> on any page that shows the FAQ section
export default function FAQJsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "آیا طرح هولوگرام در قیمت آن تاثیر دارد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "بله، هر مقدار پیچیدگی طرح و آیتم های امنیتی بیشتر باشد، هزینه تولید افزایش می یابد.",
        },
      },
      {
        "@type": "Question",
        name: "هولوگرام ها در چه رنگ های تولید میشوند؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "آذرهولوگرام امکان تولید کلیه رنگ های موجود را دارد.",
        },
      },
      {
        "@type": "Question",
        name: "آیا آذرهولوگرام محصولات دیگری غیراز هولوگرام تولید میکند؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "بله، آذرهولوگرام با بکارگیری تجهیزات روز امکان تولید انواع لیبل های امنیتی و فوق امنیتی، لیبل های پلمپ، انواع اسکرچ و هولواسکرچ، هولوگرام های کارت شناسایی، شفاف و غیره را دارد.",
        },
      },
      {
        "@type": "Question",
        name: "چه محصولاتی میتواند از هولوگرام استفاده کنند؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تمامی محصولاتی که قصد تایید اصالت کالا به مشتری را دارند می توانند از برچسب هولوگرام استفاده کنند.",
        },
      },
      {
        "@type": "Question",
        name: "آیا امکان تولید هولوگرام در هر سایزی وجود دارد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "بله، با توجه به نیاز مشتری در هر سایزی تولید میگردد.",
        },
      },
      {
        "@type": "Question",
        name: "هولوگرام آماده چیست؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "هولوگرامی که اختصاصی نیست و در سایزهای مختلف قابل اجراست.",
        },
      },
      {
        "@type": "Question",
        name: "نحوه محاسبه قیمت هولوگرام چگونه است؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "باتوجه به تیراژ، ابعاد و جنس هولوگرام محاسبه میگردد.",
        },
      },
      {
        "@type": "Question",
        name: "نحوه نصب برچسب ها روی محصول چگونه است؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "هم امکان نصب به عنوان پلمپ درب محصول هست و هم الصاق روی بدنه محصول.",
        },
      },
      {
        "@type": "Question",
        name: "حداقل تیراژ برای تولید هولوگرام چقدر است؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "جهت شروع از ۲۰۰ شیت امکان تولید وجود دارد.",
        },
      },
      {
        "@type": "Question",
        name: "نحوه پرداخت مبلغ قرارداد تولید هولوگرام به چه صورت است؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "۵۰٪ به عنوان ودیعه و الباقی زمان تحویل محصول تسویه میگردد.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
