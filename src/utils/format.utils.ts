export const hourMinuteFormatter = new Intl.DateTimeFormat("fa-IR", {
  hour: "2-digit",
  hour12: false,
  hourCycle: "h23",
  minute: "2-digit",
});

export const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
