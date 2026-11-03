"use client";

import style from "../Styles/MainStyle/Header.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  token,
  firstName,
  lastName,
  phoneNumber,
  resetToken,
  headerListData,
} from "../Store/slice";
import { headerList } from "../Store/thunks";
import { COMPANY, orderHref } from "../utils/company";

const PROFILE_LINKS = [
  { type: "makeOrder", label: "ثبت سفارش" },
  { type: "SeeOrder", label: "پیگیری سفارش" },
  { type: "userInfo", label: "اطلاعات کاربری" },
  { type: "message", label: "پیغام‌ها" },
  { type: "favorite", label: "لیست‌های مورد علاقه" },
];

// remembered so login / the order form can return the visitor to this page
const storeLastVisitedPage = () => {
  const path = window.location.pathname;
  if (path !== "/Profile" && path !== "/Login") {
    sessionStorage.setItem("lastPage", path);
  }
};

const decode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

function isActiveLink(pathname, link) {
  if (!link || link.startsWith("#")) return false;
  if (link === "/") return pathname === "/";
  return pathname === link || pathname.startsWith(`${link}/`);
}

function DesktopMenu({ item, pathname }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const closeTimer = useRef(null);

  const hasActiveChild = item.subItems.some(
    (sub) =>
      isActiveLink(pathname, sub.link) ||
      sub.subItems?.some((leaf) => isActiveLink(pathname, leaf.link)),
  );

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        rootRef.current?.querySelector("button")?.focus();
      }
    };
    const onClick = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={rootRef}
      className={style.menuRoot}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        type="button"
        className={`${style.navLink} ${hasActiveChild ? style.navLinkActive : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        {item.title}
        <KeyboardArrowDownIcon
          className={open ? style.chevronOpen : style.chevron}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className={style.megaMenu}>
          <div className={`container ${style.megaGrid}`}>
            {item.subItems.map((sub) => (
              <div key={sub.link} className={style.megaColumn}>
                <Link href={sub.link} className={style.megaHeading}>
                  {sub.title}
                  <ArrowBackIcon aria-hidden="true" />
                </Link>
                {sub.subItems?.length > 0 && (
                  <ul>
                    {sub.subItems.map((leaf) => (
                      <li key={leaf.link}>
                        <Link
                          href={leaf.link}
                          className={
                            isActiveLink(pathname, leaf.link)
                              ? style.megaLinkActive
                              : style.megaLink
                          }
                        >
                          {leaf.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AccountMenu({ name, fullName, phone, onLogout, pathname }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onClick = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={style.accountRoot}>
      <button
        type="button"
        className={style.iconAction}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        <PersonOutlineIcon aria-hidden="true" />
        <span className={style.accountName}>{name || "حساب کاربری"}</span>
        <KeyboardArrowDownIcon
          className={open ? style.chevronOpen : style.chevron}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className={style.accountPanel}>
          <div className={style.accountSummary}>
            <p>{fullName}</p>
            <span>{phone}</span>
          </div>
          <ul>
            {PROFILE_LINKS.map((link) => (
              <li key={link.type}>
                <Link
                  href={`/Profile?type=${link.type}`}
                  onClick={storeLastVisitedPage}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button type="button" className={style.logout} onClick={onLogout}>
            خروج از حساب
          </button>
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ item, depth = 0, onNavigate }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.subItems?.length > 0;

  return (
    <li className={depth === 0 ? style.mobileItem : style.mobileSubItem}>
      {hasChildren && item.link.startsWith("#") ? (
        <button
          type="button"
          className={style.mobileRow}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {item.title}
          <KeyboardArrowDownIcon
            className={open ? style.chevronOpen : style.chevron}
            aria-hidden="true"
          />
        </button>
      ) : (
        <div className={style.mobileRow}>
          <Link href={item.link} onClick={onNavigate}>
            {item.title}
          </Link>
          {hasChildren && (
            <button
              type="button"
              className={style.mobileToggle}
              aria-expanded={open}
              aria-label={`زیرمجموعه ${item.title}`}
              onClick={() => setOpen((value) => !value)}
            >
              <KeyboardArrowDownIcon
                className={open ? style.chevronOpen : style.chevron}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      )}
      {hasChildren && open && (
        <ul>
          {item.subItems.map((sub) => (
            <MobileNavItem
              key={sub.link}
              item={sub}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Header() {
  const rawPathname = usePathname() || "/";
  const pathname = decode(rawPathname);
  const dispatch = useDispatch();

  const isLoggedIn = Boolean(useSelector(token));
  const firstNameU = useSelector(firstName);
  const lastNameU = useSelector(lastName);
  const phoneNumberU = useSelector(phoneNumber);
  const headerData = useSelector(headerListData);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!headerData) {
      dispatch(headerList());
    }
  }, [dispatch, headerData]);

  const items = headerData?.content || [];
  const closeMobile = () => setMobileOpen(false);
  const handleLogout = () => {
    closeMobile();
    dispatch(resetToken());
  };

  return (
    <header className={style.header}>
      <span className={style.spectrum} aria-hidden="true" />
      <div className={`container ${style.bar}`}>
        <Link href="/" className={style.brand} aria-label={COMPANY.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={COMPANY.logo} alt="" width={44} height={44} />
          <span className={style.brandName}>{COMPANY.name}</span>
        </Link>

        <nav className={style.nav} aria-label="منوی اصلی">
          {items.map((item) =>
            item.subItems?.length > 0 ? (
              <DesktopMenu key={item.link} item={item} pathname={pathname} />
            ) : (
              <Link
                key={item.link}
                href={item.link}
                className={`${style.navLink} ${
                  isActiveLink(pathname, item.link) ? style.navLinkActive : ""
                }`}
                aria-current={
                  isActiveLink(pathname, item.link) ? "page" : undefined
                }
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>

        <div className={style.actions}>
          <a
            href={COMPANY.phoneHref}
            className={style.phone}
            aria-label={`تماس: ${COMPANY.phoneLabel}`}
          >
            <CallOutlinedIcon aria-hidden="true" />
            <span>{COMPANY.phoneLabel}</span>
          </a>

          {isLoggedIn ? (
            <AccountMenu
              name={firstNameU}
              fullName={`${firstNameU || ""} ${lastNameU || ""}`.trim()}
              phone={phoneNumberU}
              onLogout={handleLogout}
              pathname={pathname}
            />
          ) : (
            <Link
              href="/Login"
              className={style.iconAction}
              onClick={storeLastVisitedPage}
            >
              <PersonOutlineIcon aria-hidden="true" />
              <span className={style.accountName}>ورود</span>
            </Link>
          )}

          <Link
            href={orderHref(isLoggedIn)}
            className={`az-btn az-btn--primary az-btn--sm ${style.cta}`}
            onClick={storeLastVisitedPage}
          >
            استعلام قیمت
          </Link>

          <button
            type="button"
            className={style.burger}
            aria-label="باز کردن منو"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon aria-hidden="true" />
          </button>
        </div>
      </div>

      <Offcanvas
        show={mobileOpen}
        onHide={closeMobile}
        placement="end"
        className={style.drawer}
        aria-label="منو"
      >
        <div className={style.drawerHead}>
          <Link href="/" className={style.brand} onClick={closeMobile}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={COMPANY.logo} alt="" width={40} height={40} />
            <span className={style.brandNameAlways}>{COMPANY.name}</span>
          </Link>
          <button
            type="button"
            className={style.burger}
            aria-label="بستن منو"
            onClick={closeMobile}
          >
            <CloseIcon aria-hidden="true" />
          </button>
        </div>

        <nav className={style.drawerBody} aria-label="منوی موبایل">
          <ul className={style.mobileList}>
            {items.map((item) => (
              <MobileNavItem
                key={item.link}
                item={item}
                onNavigate={closeMobile}
              />
            ))}
          </ul>

          {isLoggedIn && (
            <div className={style.drawerAccount}>
              <p>
                {firstNameU} {lastNameU}
              </p>
              <ul>
                {PROFILE_LINKS.map((link) => (
                  <li key={link.type}>
                    <Link
                      href={`/Profile?type=${link.type}`}
                      onClick={() => {
                        storeLastVisitedPage();
                        closeMobile();
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={style.logout}
                onClick={handleLogout}
              >
                خروج از حساب
              </button>
            </div>
          )}
        </nav>

        <div className={style.drawerFoot}>
          <Link
            href={orderHref(isLoggedIn)}
            className="az-btn az-btn--primary az-btn--block"
            onClick={() => {
              storeLastVisitedPage();
              closeMobile();
            }}
          >
            استعلام قیمت
          </Link>
          {!isLoggedIn && (
            <Link
              href="/Login"
              className="az-btn az-btn--outline az-btn--block"
              onClick={() => {
                storeLastVisitedPage();
                closeMobile();
              }}
            >
              ورود به حساب
            </Link>
          )}
          <a href={COMPANY.phoneHref} className={style.drawerPhone}>
            <CallOutlinedIcon aria-hidden="true" />
            {COMPANY.phoneLabel}
          </a>
        </div>
      </Offcanvas>
    </header>
  );
}
