import HeaderSeo from "../Components/HeaderSeo.js";
import Form from "../eachPageComponent/ContactUsComponent/Form.js";
import Address from "../eachPageComponent/ContactUsComponent/Address.js";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";

export default function ContactUs() {
  return (
    <>
      <Header />
      <HeaderSeo />
      <Form />
      <Address />
      <Footer />
    </>
  );
}
