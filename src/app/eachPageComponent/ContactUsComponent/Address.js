import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import style from "../../Styles/ContactUsStyle/Form.module.scss";
import { COMPANY } from "@/app/utils/company";

const DETAILS = [
  {
    icon: CallOutlinedIcon,
    label: "شماره تماس",
    value: COMPANY.phoneLabel,
    href: COMPANY.phoneHref,
  },
  {
    icon: MailOutlineIcon,
    label: "ایمیل",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
  },
  { icon: PlaceOutlinedIcon, label: "آدرس", value: COMPANY.address },
  { icon: ScheduleIcon, label: "ساعت کاری", value: COMPANY.hours },
  { icon: PrintOutlinedIcon, label: "فکس", value: COMPANY.fax },
];

export default function Address() {
  return (
    <div className={style.details}>
      <h2 className="az-h2">راه‌های ارتباطی</h2>
      <ul>
        {DETAILS.map(({ icon: Icon, label, value, href }) => (
          <li key={label}>
            <Icon aria-hidden="true" />
            <div>
              <span>{label}</span>
              {href ? <a href={href}>{value}</a> : <p>{value}</p>}
            </div>
          </li>
        ))}
      </ul>
      <iframe
        title="موقعیت آذرهولوگرام روی نقشه"
        className={style.map}
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3239.9064675876466!2d51.40370990213015!3d35.703919218164344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDQyJzEzLjAiTiA1McKwMjQnMDYuOCJF!5e0!3m2!1sfa!2s!4v1720280623034!5m2!1sfa!2s"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
