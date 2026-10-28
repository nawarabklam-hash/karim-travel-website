"use client";

import { startTransition, useActionState, useState } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { div as MDiv, h2 as MH2, span as MSpan } from "motion/react-m";
import { getVariant } from "@/lib/motion/presets";
import { sendContact, type ContactState } from "@/app/actions/contact";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import CountryCodeSelect, { COUNTRIES, OTHER } from "./CountryCodeSelect";

type Labels = {
  title: string;
  name: string;
  phone: string;
  countryCode: string;
  otherCountry: string;
  /** Country names by id (sa, ae, kw, qa, bh, om). */
  countries: Record<string, string>;
  otherCodePlaceholder: string;
  email: string;
  optional: string;
  message: string;
  service: string;
  submit: string;
  sending: string;
  successTitle: string;
  successCta: string;
  whatsappMessage: string;
  errorInvalid: string;
  errorSend: string;
};

type Props = {
  labels: Labels;
  services: { id: string; label: string }[];
};

/** Underline-style field: bottom border only, navy on focus. */
const field =
  "mt-1 w-full min-h-11 border-0 border-b border-field bg-transparent px-0 py-2.5 text-base text-navy placeholder:text-navy/40 focus:border-navy focus:ring-0 focus:outline-none";
const label = "block text-sm font-medium text-navy/70";

/** Contact form panel. Inputs are controlled so nothing is lost on an error. */
export default function ContactForm({ labels, services }: Props) {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    sendContact,
    { status: "idle" },
  );
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    otherCode: "+",
  });
  const [country, setCountry] = useState<string>(COUNTRIES[0].code);
  const [service, setService] = useState("");

  const set =
    (key: keyof typeof values) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set("countryCode", country === OTHER ? values.otherCode : country);
    data.set("service", service);
    startTransition(() => action(data));
  };

  if (state.status === "success") {
    // Not tagged data-motion: this appears after a click, so it must animate even on a
    // page already seen this session. Check icon pops, the text rises after it.
    return (
      <div className="flex min-h-[26rem] flex-col items-center justify-center p-8 text-center">
        <MDiv
          variants={getVariant("popIn", "ltr")}
          initial="hidden"
          animate="show"
        >
          <CircleCheck aria-hidden="true" className="size-14 text-navy" />
        </MDiv>
        <MH2
          variants={getVariant("fadeUp", "ltr", 0.2)}
          initial="hidden"
          animate="show"
          className="mt-4 text-2xl font-semibold text-navy"
        >
          {labels.successTitle}
        </MH2>
        <MDiv
          variants={getVariant("fadeUp", "ltr", 0.35)}
          initial="hidden"
          animate="show"
        >
          <WhatsAppLink
            message={labels.whatsappMessage}
            location="contact_form_success"
            className="mt-5 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#123a78] focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <WhatsAppIcon className="size-5" />
            {labels.successCta}
          </WhatsAppLink>
        </MDiv>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-navy">{labels.title}</h2>

      <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <label className={label}>
          {labels.name}
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            className={field}
          />
        </label>

        {/* WhatsApp number: country code + local number (always LTR) */}
        <div>
          <span id="phone-label" className={label}>
            {labels.phone}
          </span>
          <div dir="ltr" className="mt-1 flex items-end gap-3">
            <CountryCodeSelect
              value={country}
              onChange={setCountry}
              label={labels.countryCode}
              otherLabel={labels.otherCountry}
              names={labels.countries}
            />
            {country === OTHER && (
              <input
                aria-label={labels.countryCode}
                required
                pattern="\+\d{1,4}"
                inputMode="tel"
                placeholder={labels.otherCodePlaceholder}
                value={values.otherCode}
                onChange={set("otherCode")}
                className={`${field} w-20 shrink-0`}
              />
            )}
            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              aria-labelledby="phone-label"
              required
              pattern="[\d\s]{7,15}"
              autoComplete="tel-national"
              placeholder="5X XXX XXXX"
              value={values.phone}
              onChange={set("phone")}
              className={`${field} min-w-0 flex-1`}
            />
          </div>
        </div>

        <label className={`${label} sm:col-span-2`}>
          {labels.email}{" "}
          <span className="font-normal text-navy/40">{labels.optional}</span>
          <input
            name="email"
            type="email"
            dir="ltr"
            maxLength={200}
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            className={`${field} text-start`}
          />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className={label}>
          {labels.service}{" "}
          <span className="font-normal text-navy/40">{labels.optional}</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
          {services.map((s) => (
            <label
              key={s.id}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-navy"
            >
              <input
                type="radio"
                name="serviceChoice"
                value={s.id}
                checked={service === s.id}
                onChange={() => setService(s.id)}
                className="size-4 accent-navy"
              />
              {s.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className={`${label} mt-6`}>
        {labels.message}
        <textarea
          name="message"
          required
          minLength={2}
          maxLength={3000}
          rows={4}
          value={values.message}
          onChange={set("message")}
          className={`${field} resize-y`}
        />
      </label>

      {/* Honeypot: hidden from people, bots fill it in */}
      <div
        aria-hidden="true"
        className="absolute -start-[9999px] size-px overflow-hidden"
      >
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-8 flex flex-col items-start gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-red px-8 text-base font-semibold text-white transition-colors hover:bg-[#b01c29] focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-70"
        >
          {pending ? (
            <MSpan
              aria-hidden="true"
              className="inline-flex"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "linear", repeat: Infinity }}
            >
              <LoaderCircle className="size-5" />
            </MSpan>
          ) : (
            <Send aria-hidden="true" className="size-5 rtl:-scale-x-100" />
          )}
          {pending ? labels.sending : labels.submit}
        </button>
        {state.status === "error" && (
          <p
            role="alert"
            className="flex items-start gap-2 text-sm font-semibold text-navy"
          >
            <CircleAlert
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0"
            />
            {state.error === "invalid" ? labels.errorInvalid : labels.errorSend}
          </p>
        )}
      </div>
    </form>
  );
}
