import CopyLinkButton from "../CopyLinkButton";
import PageIntro from "../ui/PageIntro";
import style from "./Content.module.scss";
import { mediaUrl } from "../../utils/productContent";
import { formatPersianDate } from "../../utils/persionDateUtils";

export default function ContentDetail({ item }) {
  return (
    <>
      <PageIntro
        title={item.title}
        description={formatPersianDate(item.date)}
      />
      <section className={`container ${style.detail}`}>
        <div className={style.detailMedia}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mediaUrl(item.src)} alt={item.title} />
        </div>
        <div className={style.detailBody}>
          <div
            className="az-rich-content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
          <CopyLinkButton />
        </div>
      </section>
    </>
  );
}
