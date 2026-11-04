"use client";

import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SectionHeading from "./ui/SectionHeading";
import style from "../Styles/MainStyle/FAQ.module.scss";
import { FAQ_GROUPS } from "../utils/faqData";

export default function FAQ() {
  const [activeKey, setActiveKey] = useState(FAQ_GROUPS[0].key);
  const [openQuestion, setOpenQuestion] = useState(null);

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

        {/* Every answer stays in the DOM so the text is readable without clicking. */}
        <div>
          {FAQ_GROUPS.map((group) => (
            <div
              key={group.key}
              className={style.list}
              role="tabpanel"
              hidden={group.key !== activeKey}
            >
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
                    <p hidden={!isOpen}>{item.a}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
