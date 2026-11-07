// Company facts, as already published on the site.

export const COMPANY = {
  name: "آذرهولوگرام",
  legalName: "شرکت خانه چاپ چکاوک",
  logo: "/LOGO/azarhologram-logo.png",
  icon: "/LOGO/azarhologram-icon.png",
  phoneLabel: "۰۲۱-۶۶۹۷۱۴۰۲ الی ۵",
  phoneHref: "tel:+982166971402",
  phoneE164: "+982166971402",
  fax: "۶۶۹۷۱۴۰۵",
  email: "info@azarhologram.co",
  address:
    "تهران، میدان فلسطین، خیابان فلسطین جنوبی، خیابان بزرگمهر غربی، نبش کوچه حکمت، پلاک یک، طبقه ششم",
  city: "تهران",
  street:
    "میدان فلسطین، خیابان فلسطین جنوبی، خیابان بزرگمهر غربی، نبش کوچه حکمت، پلاک یک، طبقه ششم",
  hours: "همه روزه ۷ الی ۱۸",
  intro:
    "شرکت خانه چاپ چکاوک با نام تجاری آذرهولوگرام، با داشتن خط کامل تولید هولوگرام در داخل کشور، زمان چاپ و تحویل هولوگرام را کوتاه کرده است.",
};

// Where an inquiry starts: the order form for members, login for everyone else.
export const orderHref = (isLoggedIn, name, code) => {
  if (!isLoggedIn) return "/Login";
  const product =
    name && code
      ? `&name=${encodeURIComponent(name)}&code=${encodeURIComponent(code)}`
      : "";
  return `/Profile?type=makeOrder${product}`;
};
