'use client'

import style from "../../Styles/ContactUsStyle/Form.module.scss";
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { submitContactForm } from '../../Store/thunks';

export default function Form() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  // Honeypot field — bots fill this, humans don't
  const [honeypot, setHoneypot] = useState('');

  // Track when the form was loaded (for time-based check)
  const loadTimeRef = useRef(Date.now());

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Honeypot check — if filled, it's a bot
    if (honeypot) return;

    // Time check — reject if submitted in under 2 seconds (bot behaviour)
    const elapsedSeconds = (Date.now() - loadTimeRef.current) / 1000;
    if (elapsedSeconds < 2) {
      setErrorMsg('لطفاً فرم را با دقت پر کنید.');
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        submitContactForm({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        })
      ).unwrap();

      setSuccess(true);
      setFormData({ name: '', phone: '', message: '' });
    } catch (err) {
      setErrorMsg(
        typeof err === 'string'
          ? err
          : 'مشکلی پیش آمد، لطفاً دوباره تلاش کنید'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`${style.MainBackground} container pt-3 pb-3`}>
      <div className={style.toggleBackground}>
        <div>
          <p className="title">ارتباط با ما</p>
        </div>

        {success ? (
          <div className={style.successMessage}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#43a047" strokeWidth="2"/>
              <path d="M7 12.5L10.5 16L17 9" stroke="#43a047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.</p>
            <button
              className={style.submitButton}
              onClick={() => { setSuccess(false); loadTimeRef.current = Date.now(); }}
            >
              ارسال پیام جدید
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`${style.formStyle} mt-2`}>
            {/* Honeypot — hidden from real users, visible to bots */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className={`${style.adjustFormDirection} d-flex flex-row gap-4`}>
              <div className="d-flex flex-column w-50">
                <label htmlFor="cf-name">نام و نام خانوادگی*</label>
                <input
                  onChange={handleChange}
                  value={formData.name}
                  id="cf-name"
                  name="name"
                  type="text"
                  placeholder="نام خانوادگی خود را بنویسید."
                  required
                  disabled={loading}
                />
              </div>
              <div className="d-flex flex-column w-50">
                <label htmlFor="cf-phone">تلفن تماس*</label>
                <input
                  onChange={handleChange}
                  value={formData.phone}
                  id="cf-phone"
                  name="phone"
                  type="text"
                  placeholder="شماره تلفن خود را بنویسید."
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="cf-message" style={{ display: 'block' }}>پیام شما*</label>
              <textarea
                onChange={handleChange}
                value={formData.message}
                className={style.textArea}
                placeholder="متن مورد نظر را اینجا بنویسید."
                name="message"
                id="cf-message"
                cols="30"
                rows="10"
                required
                disabled={loading}
              />
            </div>

            {errorMsg && (
              <p className={style.errorMessage}>{errorMsg}</p>
            )}

            <div>
              <button
                className={style.submitButton}
                type="submit"
                disabled={loading}
              >
                {loading ? 'در حال ارسال...' : 'تماس با ما'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
