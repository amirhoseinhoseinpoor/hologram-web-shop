"use client";

import React, { useState } from "react";
import Link from "next/link";
import style from "../../Styles/ProductPage/DynamicSearchAndItems.module.scss";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function HoleProductAndSearch({ itemsClick, matchedTitle }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const normalizeString = (str) =>
    str
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .trim() // Remove leading and trailing spaces
      .toLowerCase();

  const filteredProducts = itemsClick?.filter((item) => {
    const normalizedTitle = item.name ? normalizeString(item.name) : "";
    const normalizedSearchTerm = normalizeString(searchTerm);
    return normalizedTitle.includes(normalizedSearchTerm);
  });
  console.log(filteredProducts);

  function fixTitleSize(text) {
    if (text.length > 60) {
      return text.slice(0, 60) + "...";
    } else {
      return text;
    }
  }

  return (
    <section className="mt-3">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className={`${style.inputStyle}`}>
          <div>
            <input
              type="text"
              placeholder="جست و جو در محصولات زیر..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className={style.searchIconposition}>
            <Box
              sx={{
                width: 37,
                height: 37,
                display: "flex",
                alignItems: "center",
                padding: 1,
                marginRight: "-15px",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 22L20 20"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          </div>
        </div>
      </div>

      <div className={`${style.fixContentSizePlace} mt-2`}>
        {filteredProducts?.map((item, index) => {
          // Extract the image with type '1' from imgData
          const imageData = item.info.imgData.find((img) => img.type === "1");
          const imageSrc = imageData ? imageData.src : null;

          return (
            <React.Fragment key={index}>
              <Card className={`${style.mainCardStyle}`}>
                <Link
                  className="text-decoration-none d-flex flex-row"
                  href={`/${matchedTitle.trim()}/${item.name.split('/').pop().trim()}`}
                  passHref
                >
                  <CardMedia
                    className={`${style.fixBoxSize} gap-3`}
                    component="img"
                    image={`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${imageSrc}`}
                    alt={item.name}
                  />

                  <CardContent className={style.adjustContent}>
                    <Typography
                      className={`${style.textResetColor} QASize`}
                      gutterBottom
                      variant="p"
                      component="div"
                    >
                      {fixTitleSize(item.name)}
                    </Typography>

                    <Typography
                      className="discription"
                      gutterBottom
                      variant="p"
                      component="div"
                    >
                      {item.info.subtitleCompelete}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import style from "../../Styles/ProductPage/DynamicSearchAndItems.module.scss";

// import { Box } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";

// export default function HoleProductAndSearch({ itemsClick, matchedTitle }) {

//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // const normalizeString = (str) =>
//   //   str
//   //     .replace(/\s+/g, " ") // Replace multiple spaces with a single space
//   //     .trim() // Remove leading and trailing spaces
//   //     .toLowerCase();

//   // const filteredBlogs = itemsClick?.filter((item) => {
//   //   const normalizedTitle = item.title ? normalizeString(item.title) : "";
//   //   const normalizedSearchTerm = normalizeString(searchTerm);
//   //   return normalizedTitle.includes(normalizedSearchTerm);
//   // });

//   function fixTitleSize(text) {
//     if (text.length > 60) {
//       return text.slice(0, 60) + "...";
//     } else {
//       return text;
//     }
//   }

//   return (
//     <section className="mt-3">
//       <div className="d-flex flex-row justify-content-between align-items-center">
//         <div className={`${style.inputStyle}`}>
//           <div>
//             <input
//               type="text"
//               placeholder="جست و جو در محصولات زیر..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//           </div>
//           <div className={style.searchIconposition}>
//             <Box
//               sx={{
//                 width: 37,
//                 height: 37,
//                 display: "flex",
//                 alignItems: "center",
//                 padding: 1,
//                 marginRight: "-15px",
//               }}
//             >
//               <svg
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
//                   stroke="#333333"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M22 22L20 20"
//                   stroke="#333333"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </Box>
//           </div>
//         </div>
//       </div>

//       <div className={`${style.fixContentSizePlace} mt-2`}>
//         {filteredBlogs?.map((item, index) => (
//           <React.Fragment key={index}>
//             <Card className={`${style.mainCardStyle}`}>
//               <Link className="text-decoration-none" href={`/ShouldBeFix`} passHref>
//                 <CardMedia
//                   className={`${style.fixBoxSize} gap-3`}
//                   component="img"
//                   image={item.src}
//                   alt={item.title}
//                 />

//                 <CardContent className={style.adjustContent}>
//                   <Typography
//                     className="discription"
//                     gutterBottom
//                     variant="p"
//                     component="div"
//                   >
//                     {fixTitleSize(item.title)}
//                   </Typography>
//                 </CardContent>
//               </Link>
//             </Card>
//           </React.Fragment>
//         ))}
//       </div>
//     </section>
//   );
// }
