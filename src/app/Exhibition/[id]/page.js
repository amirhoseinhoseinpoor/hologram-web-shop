import fs from "fs";
import path from "path";

import style from "../../Styles/ExhibitionPageStyle/ExhibitionDynamicContent.module.scss";
import HeaderSeo from "../../Components/HeaderSeo";
import Box from "@mui/material/Box";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CopyLinkButton  from "../../Components/CopyLinkButton"

function findSpeceficIteminjson(id) {
  const filepath = path.join(
    process.cwd(),
    "public",
    "json",
    "ExhibitionContent.json"
  );
  const readFile = fs.readFileSync(filepath, "utf8");
  const honors = JSON.parse(readFile);
  const found = honors.find((item) => item.id === id);
  if (found) {
    return found;
  }
  return null;
}

export default function innerExhibition({ params }) {
  const { id } = params;
  const honors = findSpeceficIteminjson(id);

  return (
    <>
      <HeaderSeo />
      <section className={style.customContainer}>
        <div>
          <h3 className="title mt-3 mb-1">{honors.title}</h3>
        </div>
        <div>
          <p className={`${style.discriptionColor} discription mb-3`}>
            {honors.date}
          </p>
        </div>
        <div>
          <Box
            component="img"
            sx={{
              width: "100%",
              maxHeight: "10000px",
              objectFit: "cover",
              aspectRatio: 2,
              borderRadius: "4px",
            }}
            alt={honors.title}
            src={honors.src}
          />
        </div>
        <div>
          <p>{honors.content1}</p>
        </div>
        <div className={`${style.boldContentStyle} mt-2 mb-2 purchesSize`}>
          <p>{honors.boldContent}</p>
        </div>

        <div className={`${style.socialMediaIcon} d-flex flex-row mt-3 gap-3`}>
          <CopyLinkButton />
          <a href="#">
            <WhatsAppIcon />
          </a>
          <a href="#">
            <TelegramIcon />
          </a>
          <a href="#">
            <LinkedInIcon />
          </a>
        </div>
        <div className="mt-3">
          <ul className={`${style.tagsStyle} d-flex flex-row gap-3`}>
            {honors.tags.split(",").map((tag) => (
              <>
                <li>{tag.trim()}</li>
              </>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
