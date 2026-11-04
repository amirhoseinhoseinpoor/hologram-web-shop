import ShowRoute from "../ShowRoute";
import Guilloche from "./Guilloche";
import style from "./ui.module.scss";

// Shared top band of inner pages: breadcrumb, title and optional summary.
export default function PageIntro({
  title,
  description,
  eyebrow,
  crumbLabel,
  children,
}) {
  return (
    <>
      <section className={style.pageIntro}>
        <Guilloche className={style.pageIntroMotif} />
        <div className={`container ${style.pageIntroBody}`}>
          <ShowRoute currentLabel={crumbLabel} />
          {eyebrow &&<span className="az-eyebrow">{eyebrow}</span>}
          <h1 className="az-h1">{title}</h1>
          {description && <p className={style.pageIntroText}>{description}</p>}
          {children}
        </div>
      </section>
      <span className={style.spectrumLine} aria-hidden="true" />
    </>
  );
}
