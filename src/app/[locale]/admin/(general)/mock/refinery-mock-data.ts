import RefineryType from "@/admin/(general)/types/refinery.type";

export const INITIAL_STATE: RefineryType = {
  name: "پالایشگاه آبادان",
  logo: "/logos/abadan-refinery.png", // آدرس آزمایشی لوگو
  sites: [
    {
      id: "site-1",
      name: "سایت شمالی",
      zones: [
        {
          id: "zone-1-1",
          name: "زون تقطیر",
          units: [
            { id: "unit-1-1-1", name: "واحد تقطیر اتمسفریک" },
            { id: "unit-1-1-2", name: "واحد تقطیر خلاء" },
            { id: "unit-1-1-3", name: "واحد تثبیت میعانات" },
          ],
        },
        {
          id: "zone-1-2",
          name: "زون تبدیل کاتالیستی",
          units: [
            { id: "unit-1-2-1", name: "واحد رفرمینگ کاتالیستی" },
            { id: "unit-1-2-2", name: "واحد هیدروکراکر" },
            { id: "unit-1-2-3", name: "واحد ایزومریزاسیون" },
          ],
        },
        {
          id: "zone-1-3",
          name: "زون تصفیه",
          units: [
            { id: "unit-1-3-1", name: "واحد مراکس" },
            { id: "unit-1-3-2", name: "واحد آمین" },
            { id: "unit-1-3-3", name: "واحد گوگردزدایی (HDS)" },
          ],
        },
      ],
    },
    {
      id: "site-2",
      name: "سایت جنوبی",
      zones: [
        {
          id: "zone-2-1",
          name: "زون پلیمر و پتروشیمی",
          units: [
            { id: "unit-2-1-1", name: "واحد پلی‌پروپیلن" },
            { id: "unit-2-1-2", name: "واخت واحد پلی‌اتیلن" },
            { id: "unit-2-1-3", name: "واحد آروماتیک" },
          ],
        },
        {
          id: "zone-2-2",
          name: "زون آب و بخار",
          units: [
            { id: "unit-2-2-1", name: "واحد تصفیه آب" },
            { id: "unit-2-2-2", name: "واحد تولید بخار (بویلر)" },
            { id: "unit-2-2-3", name: "واخت واحد برج خنک‌کن" },
          ],
        },
      ],
    },
    {
      id: "site-3",
      name: "سایت شرقی",
      zones: [
        {
          id: "zone-3-1",
          name: "زون ذخیره‌سازی",
          units: [
            { id: "unit-3-1-1", name: "مخازن نفت خام" },
            { id: "unit-3-1-2", name: "مخازن محصولات میانی" },
            { id: "unit-3-1-3", name: "مخازن محصولات نهایی" },
          ],
        },
        {
          id: "zone-3-2",
          name: "زون بارگیری",
          units: [
            { id: "unit-3-2-1", name: "اسکله بارگیری" },
            { id: "unit-3-2-2", name: "واحد بارگیری کامیون" },
            { id: "unit-3-2-3", name: "واحد بارگیری ریلی" },
          ],
        },
      ],
    },
    {
      id: "site-4",
      name: "سایت غربی",
      zones: [
        {
          id: "zone-4-1",
          name: "زون انرژی",
          units: [
            { id: "unit-4-1-1", name: "واحد تولید برق (پاورپلنت)" },
            { id: "unit-4-1-2", name: "واحد هوای فشرده" },
            { id: "unit-4-1-3", name: "واخت واحد نیتروژن" },
          ],
        },
        {
          id: "zone-4-2",
          name: "زون تعمیرات و نگهداری",
          units: [
            { id: "unit-4-2-1", name: "کارگاه مرکزی" },
            { id: "unit-4-2-2", name: "انبار قطعات یدکی" },
            { id: "unit-4-2-3", name: "واحد کالیبراسیون" },
          ],
        },
      ],
    },
    {
      id: "site-5",
      name: "سایت مرکزی",
      zones: [
        {
          id: "zone-5-1",
          name: "زون مدیریت و اداری",
          units: [
            { id: "unit-5-1-1", name: "ساختمان مرکزی" },
            { id: "unit-5-1-2", name: "مرکز کنترل اصلی (CCR)" },
            { id: "unit-5-1-3", name: "آزمایشگاه مرکزی" },
          ],
        },
        {
          id: "zone-5-2",
          name: "زون آتش‌نشانی و ایمنی",
          units: [
            { id: "unit-5-2-1", name: "ایستگاه آتش‌نشانی" },
            { id: "unit-5-2-2", name: "سیستم اعلام حریق" },
            { id: "unit-5-2-3", name: "واحد امداد و نجات" },
          ],
        },
      ],
    },
  ],
};
