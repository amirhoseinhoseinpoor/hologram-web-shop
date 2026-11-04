import Image from "next/image";
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
          <Image
            src={mediaUrl(item.src)}
            alt={item.title}
            width={960}
            height={720}
            sizes="(max-width: 992px) 100vw, 40vw"
            priority
          />
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
