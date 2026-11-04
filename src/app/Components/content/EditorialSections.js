import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "./Editorial.module.scss";

function SectionItems({ section }) {
  const List = section.ordered ? "ol" : "ul";
  return (
    <List className={style.items}>
      {section.items.map((item) => (
        <li key={item.label}>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <strong>{item.label}</strong>
          )}
          {item.text && <span>: {item.text}</span>}
        </li>
      ))}
    </List>
  );
}

function SectionTable({ table }) {
  return (
    <div className={style.tableWrap}>
      <table className={style.table}>
        <thead>
          <tr>
            {table.headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map(([need, option, reason]) => (
            <tr key={need}>
              <td>{need}</td>
              <td>
                <Link href={option.href}>{option.label}</Link>
              </td>
              <td>{reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Written copy of category pages and guides, from utils/seoContent.js.
export default function EditorialSections({ sections = [], faq = [], links = [] }) {
  return (
    <div className={style.article}>
      {sections.map((section) => (
        <section key={section.heading} className={style.block}>
          <h2 className="az-h3">{section.heading}</h2>
          {section.paragraphs?.map((text) => (
            <p key={text}>{text}</p>
          ))}
          {section.items && <SectionItems section={section} />}
          {section.table && <SectionTable table={section.table} />}
        </section>
      ))}

      {faq.length > 0 && (
        <section className={style.block}>
          <h2 className="az-h3">پرسش‌های متداول</h2>
          <div className={style.faq}>
            {faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {links.length > 0 && (
        <nav className={style.block} aria-label="مطالب مرتبط">
          <h2 className="az-h3">مطالب مرتبط</h2>
          <ul className={style.links}>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  {link.label}
                  <ArrowBackIcon aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
