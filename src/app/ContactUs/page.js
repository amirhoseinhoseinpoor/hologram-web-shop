import HeaderSeo from "../Components/HeaderSeo.js";
import Form from "../eachPageComponent/ContactUsComponent/Form.js";
import Address from "../eachPageComponent/ContactUsComponent/Address.js";
import MainLayout from "../layouts/MainLayout.js";

export default function ContactUs() {
  return (
    <>
     <MainLayout>
      <HeaderSeo />
      <Form />
      <Address />     
      </MainLayout>
    </>
  );
}
