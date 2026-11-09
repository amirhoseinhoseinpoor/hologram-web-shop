import style from "./ui.module.scss";

// The action (usually "see all") sits beside the heading on larger screens. Phones
// hide it there; pages repeat it after their list with <SectionMore>.
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
      {action && <div className={style.sectionAction}>{action}</div>}
    </div>
  );
}

// The same action shown after a section's list, on phones only.
export function SectionMore({ children }) {
  return <div className={style.sectionMore}>{children}</div>;
}
