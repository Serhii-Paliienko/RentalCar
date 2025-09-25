// Типы для CSS Modules — ОБЯЗАТЕЛЬНО оставляем
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

// ОПЦИОНАЛЬНО: если редактор/TS вдруг ругается на обычные CSS
declare module "*.css";

// Чтобы не было подчёркиваний на normalize
declare module "modern-normalize";
declare module "modern-normalize/modern-normalize.css";
