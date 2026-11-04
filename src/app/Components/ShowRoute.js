"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import style from "./ui/ui.module.scss";

// Route segments that aren't readable as breadcrumb labels on their own.
const SEGMENT_LABELS = {
  AboutUs: "درباره ما",
  ContactUs: "تماس با ما",
  Blog: "مقالات",
  Honors: "افتخارات",
  Exhibition: "نمایشگاه‌ها",
  EffectType: "افکت‌ها",
  Guide: "راهنما",
};

// `currentLabel` names the current page when its URL segment is not readable as a label.
const ShowRoute = ({ currentLabel }) => {
  const pathname = usePathname() || "/";
  const segments = decodeURIComponent(pathname).split("/").filter(Boolean);

  return (
    <nav aria-label="مسیر صفحه">
      <ol className={style.breadcrumb}>
        <li>
          <Link href="/">خانه</Link>
          <ChevronLeftIcon aria-hidden="true" />
        </li>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const label =
            (isLast && currentLabel) || SEGMENT_LABELS[segment] || segment;
          return (
            <li key={segment}>
              {isLast ? (
                <span
                  className={style.breadcrumbCurrent}
                  title={label}
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <>
                  <Link href={`/${segments.slice(0, index + 1).join("/")}`}>
                    {label}
                  </Link>
                  <ChevronLeftIcon aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ShowRoute;
