"use client";

import style from "../../Styles/ContactUsStyle/Form.module.scss";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { submitContactForm } from "../../Store/thunks";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const EMPTY_FORM = { name: "", phone: "", message: "" };

export default function Form() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(EMPTY_FORM);

  // Honeypot field — bots fill this, humans don't
  const [honeypot, setHoneypot] = useState("");

  // Track when the form was loaded (for time-based check)
  const loadTimeRef = useRef(Date.now());

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Honeypot check — if filled, it's a bot
    if (honeypot) return;

    // Time check — reject if submitted in under 2 seconds (bot behaviour)
    const elapsedSeconds = (Date.now() - loadTimeRef.current) / 1000;
    if (elapsedSeconds < 2) {
      setErrorMsg("لطفاً فرم را با دقت پر کنید.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        submitContactForm({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),
      ).unwrap();

      setSuccess(true);
      setFormData(EMPTY_FORM);
    } catch (err) {
      setErrorMsg(
        typeof err === "string" ? err : "مشکلی پیش آمد، لطفاً دوباره تلاش کنید",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.formCard}>
      <h2 className="az-h2">ارسال پیام</h2>

      {success ? (
        <div className={style.success} role="status">
          <CheckCircleOutlineIcon aria-hidden="true" />
          <p>پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.</p>
          <button
            type="button"
            className="az-btn az-btn--outline"
            onClick={() => {
              setSuccess(false);
              loadTimeRef.current = Date.now();
            }}
          >
            ارسال پیام جدید
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={style.form}>
          {/* Honeypot — hidden from real users, visible to bots */}
          <div style={{ display: "none" }} aria-hidden="true">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className={style.row}>
            <div className="az-field">
              <label htmlFor="cf-name">نام و نام خانوادگی (الزامی)</label>
              <input
                className="az-input"
                onChange={handleChange}
                value={formData.name}
                id="cf-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                disabled={loading}
              />
            </div>
            <div className="az-field">
              <label htmlFor="cf-phone">تلفن تماس (الزامی)</label>
              <input
                className="az-input"
                onChange={handleChange}
                value={formData.phone}
                id="cf-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="az-field">
            <label htmlFor="cf-message">پیام شما (الزامی)</label>
            <textarea
              className="az-input"
              onChange={handleChange}
              value={formData.message}
              name="message"
              id="cf-message"
              rows="7"
              required
              disabled={loading}
            />
          </div>

          {errorMsg && (
            <p className="az-alert az-alert--error" role="alert">
              {errorMsg}
            </p>
          )}

          <button
            className="az-btn az-btn--primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "در حال ارسال..." : "ارسال پیام"}
          </button>
        </form>
      )}
    </div>
  );
}
