"use client";

import { useEffect } from "react";
import Link from "next/link";
import { COMPANY } from "./utils/company";

// Shown instead of a blank page when a page fails while rendering.
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container az-section">
      <div className="az-state" role="alert">
        <h1 className="az-h2">مشکلی در نمایش این صفحه پیش آمد</h1>
        <p>
          لطفا دوباره تلاش کنید. اگر مشکل ادامه داشت با شماره{" "}
          <a href={COMPANY.phoneHref}>{COMPANY.phoneLabel}</a> تماس بگیرید.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <button
            type="button"
            className="az-btn az-btn--primary"
            onClick={reset}
          >
            تلاش دوباره
          </button>
          <Link href="/" className="az-btn az-btn--outline">
            صفحه اصلی
          </Link>
        </div>
      </div>
    </main>
  );
}
