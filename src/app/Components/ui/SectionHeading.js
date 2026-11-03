import style from "./ui.module.scss";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  as: Heading = "h2",
}) {
  return (
    <div className={style.sectionHead}>
      <div className={style.sectionHeadText}>
        {eyebrow && <span className="az-eyebrow">{eyebrow}</span>}
        <Heading className="az-h2">{title}</Heading>
        {description && <p className="az-lead">{description}</p>}
      </div>
      {action}
    </div>
  );
}
