"use client";

import { FormEvent, useState } from "react";

export default function BriefForm() {
  const [copied, setCopied] = useState(false);

  async function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Заявка для mindmarketing",
      `Ім’я: ${data.get("name") || "—"}`,
      `Сайт: ${data.get("website") || "—"}`,
      `Послуга: ${data.get("service") || "—"}`,
      `Задача: ${data.get("task") || "—"}`,
      `Контакт: ${data.get("contact") || "—"}`,
    ].join("\n");

    await navigator.clipboard.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 3500);
  }

  return (
    <form className="brief-form" onSubmit={prepareBrief}>
      <label>
        <span>Ваше ім’я</span>
        <input name="name" type="text" autoComplete="name" placeholder="Як до вас звертатися" required />
      </label>
      <label>
        <span>Сайт магазину</span>
        <input name="website" type="url" inputMode="url" placeholder="https://" required />
      </label>
      <label>
        <span>Що потрібно</span>
        <select name="service" defaultValue="Аудит Google Ads">
          <option>Аудит Google Ads</option>
          <option>Налаштування і супровід реклами</option>
          <option>Система маркетингових сигналів</option>
          <option>Розблокування Merchant Center</option>
          <option>Маркетингова аналітика</option>
        </select>
      </label>
      <label>
        <span>Коротко про задачу</span>
        <textarea name="task" rows={3} placeholder="Що відбувається зараз і якого результату очікуєте" required />
      </label>
      <label>
        <span>Email або Telegram</span>
        <input name="contact" type="text" placeholder="Зручний контакт" required />
      </label>
      <button className="button button-dark" type="submit">
        {copied ? "Заявку скопійовано ✓" : "Підготувати заявку"}
        <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">Контакт для автоматичного надсилання буде підключено після погодження сайту.</p>
    </form>
  );
}
