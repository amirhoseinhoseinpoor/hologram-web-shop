# انتقال azarhologram.co و azarhologram.ir به azarhologram.net

تصمیم: دامنه اصلی فقط `azarhologram.net` است (۲۰۲۶-۱۱-۰۷).

## آنچه آماده و روی سرور نصب است

- `zz-legacy-domains` در nginx: هر نشانی قدیمی با ۳۰۱ به نزدیک‌ترین صفحه `.net` می‌رود. جدول ۱۵۷۷ نشانی از آرشیو Wayback ساخته شده است (`redirect-map.js`).
- گواهی موقت self-signed برای هر دو دامنه.
- `/root/legacy-domains/issue-certs.sh` برای گرفتن گواهی Let's Encrypt.
- محتوای ارزشمند `.co` منتقل شد: لوح IHMA ۲۰۱۶، لوح جشنواره صنعت چاپ و حضور در Labelexpo ۲۰۱۷ و ۲۰۱۹. مقاله‌های `.co` کیفیت کافی نداشتند؛ به‌جایشان ۴ مقاله تازه نوشته شد و نشانی‌های قدیمی به آن‌ها می‌رسند.

تا وقتی DNS این دو دامنه به سرور ما اشاره نکند، این تنظیمات هیچ اثری ندارند.

## کاری که شما باید انجام دهید

### ۱. azarhologram.co در Cloudflare

1. در بخش DNS، رکورد `A` برای `azarhologram.co` را روی `45.139.11.95` بگذارید و Proxy را روشن (ابر نارنجی) نگه دارید.
2. برای `www` هم همین کار را بکنید: یا رکورد `A` روی `45.139.11.95`، یا `CNAME` به `azarhologram.co`.
3. رکوردهای `A` و `AAAA` دیگرِ `@` و `www` را حذف کنید.
4. در SSL/TLS حالت را روی **Full** بگذارید، نه Full (strict) و نه Flexible.

### ۲. azarhologram.ir در پنل radcom یا Plesk

1. در DNS، رکورد `A` برای `azarhologram.ir` و `www.azarhologram.ir` را روی `45.139.11.95` بگذارید.
2. بعد از اعمال DNS، روی سرور این دستور را با ایمیل خودتان اجرا کنید:

   ```bash
   /root/legacy-domains/issue-certs.sh azarhologram.ir your-email@example.com
   ```

   این دستور با ایمیل شما در Let's Encrypt ثبت‌نام می‌کند؛ اجرای آن یعنی پذیرش شرایط Let's Encrypt. به همین دلیل این مرحله را خودم انجام ندادم.

### ۳. Google Search Console

1. ویژگی `azarhologram.net` را تأیید کنید و نقشه سایت `https://azarhologram.net/sitemap.xml` را ثبت کنید.
2. ویژگی `azarhologram.co` را هم اضافه کنید. تأیید Domain با رکورد TXT در Cloudflare ساده‌تر است.
3. وقتی ریدایرکت‌ها زنده شدند، در تنظیمات ویژگی `.co` از ابزار **Change of address** مقصد را `azarhologram.net` بگذارید.

## تست پس از تغییر DNS

```bash
curl -sI https://azarhologram.co/about-us/ | grep -i location
```

خروجی باید `https://azarhologram.net/AboutUs` باشد.

## برگشت

```bash
rm /etc/nginx/sites-enabled/zz-legacy-domains && systemctl reload nginx
```

سپس DNS را به حالت قبل برگردانید.
