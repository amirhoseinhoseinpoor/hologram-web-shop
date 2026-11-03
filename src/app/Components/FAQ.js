"use client";

import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SectionHeading from "./ui/SectionHeading";
import style from "../Styles/MainStyle/FAQ.module.scss";
import { FAQ_GROUPS } from "../utils/faqData";

export default function FAQ() {
  const [activeKey, setActiveKey] = useState(FAQ_GROUPS[0].key);
  const [openQuestion, setOpenQuestion] = useState(null);

  const group = FAQ_GROUPS.find((item) => item.key === activeKey);

  return (
    <section className={`az-section ${style.section}`}>
      <div className={`container ${style.layout}`}>
        <div className={style.side}>
          <SectionHeading
            eyebrow="پرسش‌های متداول"
            title="همه چیز درباره‌ی هولوگرام"
          />
          <div className={style.tabs} role="tablist" aria-label="دسته پرسش‌ها">
            {FAQ_GROUPS.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={item.key === activeKey}
                className={`${style.tab} ${item.key === activeKey ? style.tabActive : ""}`}
                onClick={() => {
                  setActiveKey(item.key);
                  setOpenQuestion(null);
                }}
              >
                {item.title}
                <span>{item.items.length.toLocaleString("fa-IR")}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={style.list} role="tabpanel">
          {group.items.map((item) => {
            const isOpen = openQuestion === item.q;
            return (
              <div
                key={item.q}
                className={`${style.item} ${isOpen ? style.itemOpen : ""}`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenQuestion(isOpen ? null : item.q)}
                  >
                    <span>{item.q}</span>
                    <KeyboardArrowDownIcon aria-hidden="true" />
                  </button>
                </h3>
                {isOpen && <p>{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
