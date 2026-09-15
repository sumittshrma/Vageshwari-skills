import React, { useState, useMemo } from "react";

/* ============================================================
   BUSINESS DETAILS
   ============================================================ */
const businessDetails = {
  firmName: "VAGESHWARI SKILL SOLUTION",
  tagline: "Training & Skill Development",
  addressLine1: "44-45 SKY DECK, BHOPALPURA MATH, UDAIPUR, RAJASTHAN",
  phone: "+91-9772162275",
  gstin: "08BDAPD7925B1ZZ",
  state: "Rajasthan",
  stateCode: "08",
};

/* ============================================================
   BUYER DETAILS
   ============================================================ */
const buyerDetails = {
  name: "4BOI SOLUTIONS PRIVATE LIMITED",
  address: "D 472, Kagdamba Nagar, Ajmer Road, Jaipur, Rajasthan 302033",
  gstin: "08AABCZ5792Q1ZA",
  state: "Rajasthan",
};

/* ============================================================
   LOCATION SUGGESTIONS — All 41 Districts of Rajasthan
   ============================================================ */
const locationSuggestions = [
  "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Balotra", "Beawar",
  "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu",
  "Dausa", "Deeg", "Dholpur", "Didwana-Kuchaman", "Dungarpur", "Hanumangarh",
  "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur",
  "Karauli", "Khairthal-Tijara", "Kota", "Kotputli-Behror", "Nagaur", "Pali",
  "Phalodi", "Pratapgarh", "Rajsamand", "Salumber", "Sawai Madhopur", "Sikar",
  "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur",
];

/* ============================================================
   DESCRIPTION OPTIONS
   ============================================================ */
const descriptionOptions = [
  "Capacity Building of Existing Entrepreneurs",
  "Capacity Building of Workmen",
];

const months = [
  "January 2026", "February 2026", "March 2026", "April 2026",
  "May 2026", "June 2026", "July 2026", "August 2026",
  "September 2026", "October 2026", "November 2026", "December 2026",
];

/* ============================================================
   UTILS
   ============================================================ */
const getTodayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const numberToWords = (num) => {
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
    "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty",
    "Seventy", "Eighty", "Ninety"];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + inWords(n % 100) : "");
    if (n < 100000)
      return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
    if (n < 10000000)
      return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + inWords(n % 10000000) : "");
  };

  if (num === 0) return "Zero Rupees Only";
  return `${inWords(Math.floor(num))} Rupees Only`;
};

const formatDate = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

const daysBetween = (startISO, endISO) => {
  if (!startISO || !endISO) return 0;
  const start = new Date(startISO);
  const end = new Date(endISO);
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : 0;
};

/* ============================================================
   STYLES
   ============================================================ */
const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: #eef1f5;
    color: #1f2d3d;
    padding: 16px;
    -webkit-text-size-adjust: 100%;
  }

  .app { max-width: 1400px; margin: 0 auto; }

  .error-banner {
    background: #fff5f5;
    border: 1px solid #fc8181;
    border-left: 4px solid #e53e3e;
    color: #c53030;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 14px;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .error-banner ul { margin-left: 18px; margin-top: 4px; font-weight: 500; }
  .error-banner li { margin-bottom: 2px; }

  .toolbar {
    display: flex; justify-content: flex-end; gap: 10px;
    margin-bottom: 14px; flex-wrap: wrap;
  }
  .print-btn, .btn-secondary {
    border: none; padding: 10px 18px; font-size: 13px; font-weight: 600;
    border-radius: 8px; cursor: pointer; white-space: nowrap;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .print-btn {
    background: linear-gradient(135deg, #1e3a5f, #2c5282); color: #fff;
    box-shadow: 0 4px 12px rgba(30,58,95,0.25);
  }
  .print-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(30,58,95,0.35); }
  .btn-secondary { background: #fff; color: #2c5282; border: 1px solid #cbd5e0; }
  .btn-secondary:hover { background: #f7fafc; }
  .btn-clear {
    background: #fed7d7; color: #c53030; border: 1px solid #fc8181;
    padding: 6px 10px; font-size: 11px; font-weight: 700;
    border-radius: 6px; cursor: pointer; margin-top: 6px;
  }
  .btn-clear:hover { background: #fc8181; color: #fff; }

  .layout {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 24px;
    align-items: start;
  }
  @media (max-width: 1024px) {
    .layout { grid-template-columns: 1fr; }
  }

  .form-panel {
    background: #fff; border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    padding: 20px 18px;
  }
  @media (min-width: 1025px) {
    .form-panel {
      position: sticky; top: 16px;
      max-height: calc(100vh - 32px); overflow-y: auto;
    }
  }
  .form-title {
    font-size: 15px; font-weight: 700; color: #1a202c;
    margin-bottom: 14px; padding-bottom: 10px;
    border-bottom: 2px solid #f6ad55;
  }
  .form-section { margin-bottom: 20px; }
  .form-section h3 {
    font-size: 11px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; color: #2c5282; margin-bottom: 10px;
  }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  @media (max-width: 480px) {
    .form-grid { grid-template-columns: 1fr; }
    .field.full { grid-column: auto; }
  }
  .field { display: flex; flex-direction: column; gap: 4px; }
  .field.full { grid-column: span 2; }
  .field label {
    font-size: 10.5px; font-weight: 600; color: #4a5568;
    text-transform: uppercase; letter-spacing: 0.5px;
  }
  .field label .required { color: #e53e3e; margin-left: 2px; }
  .field input, .field select {
    width: 100%;
    padding: 9px 11px; font-size: 14px; border: 1px solid #cbd5e0;
    border-radius: 8px; background: #fff; color: #1a202c; outline: none;
    transition: border-color 0.15s, box-shadow 0.15s; font-family: inherit;
  }
  .field input:focus, .field select:focus {
    border-color: #2c5282; box-shadow: 0 0 0 3px rgba(44,82,130,0.12);
  }
  .field input.error, .field select.error {
    border-color: #e53e3e;
    background: #fff5f5;
  }
  .field input.error:focus, .field select.error:focus {
    box-shadow: 0 0 0 3px rgba(229,62,62,0.15);
  }
  .field .error-msg {
    font-size: 10.5px;
    color: #e53e3e;
    font-weight: 600;
  }
  .hint { font-size: 10.5px; color: #718096; font-style: italic; }

  .upload-preview {
    margin-top: 8px;
    border: 1px dashed #cbd5e0;
    border-radius: 8px;
    padding: 10px;
    background: #f9fbfd;
    text-align: center;
  }
  .upload-preview img {
    max-height: 80px;
    max-width: 100%;
    object-fit: contain;
  }

  .items-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 10px;
  }
  .btn-add {
    background: #f6ad55; color: #1a202c; border: none;
    padding: 7px 12px; font-size: 12px; font-weight: 700;
    border-radius: 6px; cursor: pointer;
  }
  .btn-add:hover { background: #ed8936; }
  .item-card {
    background: #f9fbfd; border: 1px solid #e2e8f0;
    border-radius: 10px; padding: 12px; margin-bottom: 12px;
  }
  .item-card.has-error {
    border-color: #fc8181;
    background: #fffafa;
  }
  .item-card-header {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12px; font-weight: 700; color: #2c5282; margin-bottom: 10px;
  }
  .btn-remove {
    background: #fed7d7; color: #c53030; border: none;
    width: 24px; height: 24px; border-radius: 50%;
    font-size: 12px; font-weight: 700; cursor: pointer;
  }
  .btn-remove:hover { background: #fc8181; color: #fff; }

  .invoice {
    max-width: 860px; margin: 0 auto; background: #fff;
    border-radius: 12px; box-shadow: 0 6px 28px rgba(0,0,0,0.10);
    overflow: hidden; font-size: 13px; line-height: 1.5; color: #1f2d3d;
    width: 100%;
  }
  .header {
    background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
    color: #fff; padding: 22px 24px 20px; position: relative;
  }
  .header::after {
    content: ""; position: absolute; bottom: 0; left: 0;
    width: 100%; height: 4px;
    background: linear-gradient(90deg, #f6ad55, #ed8936);
  }
  .header-top {
    display: flex; justify-content: space-between;
    align-items: flex-start; gap: 16px; flex-wrap: wrap;
  }
  .firm-name {
    font-size: 19px; font-weight: 700; letter-spacing: 0.5px;
    line-height: 1.25; text-transform: uppercase;
  }
  .firm-tagline {
    font-size: 10.5px; letter-spacing: 2.5px; text-transform: uppercase;
    color: #fbd38d; margin-top: 4px; font-weight: 600;
  }
  .header-contact {
    text-align: right; font-size: 11.5px; line-height: 1.6;
    color: #dbe4ee; min-width: 240px;
  }
  .header-contact > div {
    display: block;
    margin-bottom: 2px;
  }
  .header-contact strong { color: #fff; font-weight: 600; }
  .invoice-title {
    margin-top: 16px; display: inline-block; background: #f6ad55;
    color: #1a202c; font-size: 11.5px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    padding: 5px 16px; border-radius: 4px;
  }

  .body { padding: 22px 24px 26px; }

  .top-grid {
    display: flex; justify-content: space-between;
    gap: 20px; flex-wrap: wrap; margin-bottom: 22px;
  }
  .bill-to { flex: 1 1 320px; min-width: 0; }
  .section-label {
    font-size: 10px; font-weight: 700; letter-spacing: 1.8px;
    text-transform: uppercase; color: #2c5282;
    margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #e2e8f0;
  }
  .buyer-name {
    font-size: 13.5px; font-weight: 700; color: #1a202c;
    margin-bottom: 4px; line-height: 1.4;
  }
  .bill-to p { font-size: 12px; color: #4a5568; line-height: 1.6; }
  .bill-to .gstin { margin-top: 5px; font-weight: 600; color: #2d3748; }
  .meta-box {
    flex: 0 0 250px; background: #f7fafc; border: 1px solid #e2e8f0;
    border-radius: 8px; padding: 12px 14px;
  }
  .meta-row {
    display: flex; justify-content: space-between; gap: 8px;
    padding: 5px 0; font-size: 12px; border-bottom: 1px dashed #e2e8f0;
  }
  .meta-row:last-child { border-bottom: none; }
  .meta-row .label { color: #718096; font-weight: 500; }
  .meta-row .value { font-weight: 700; color: #1a202c; text-align: right; }

  .table-wrap { width: 100%; overflow-x: auto; margin-bottom: 18px; }
  table {
    width: 100%; border-collapse: collapse; font-size: 12px;
    min-width: 620px;
  }
  thead th {
    background: #2c5282; color: #fff; font-size: 10px; font-weight: 600;
    letter-spacing: 0.6px; text-transform: uppercase;
    padding: 10px 8px; text-align: left; white-space: nowrap;
  }
  thead th.num, tbody td.num { text-align: right; white-space: nowrap; }
  thead th.center, tbody td.center { text-align: center; }
  tbody td {
    padding: 10px 8px; border-bottom: 1px solid #e8edf3;
    color: #2d3748; vertical-align: top;
  }
  tbody tr:nth-child(even) { background: #f9fbfd; }
  .item-category { font-weight: 600; color: #1a202c; }
  .item-sub { font-size: 11px; color: #718096; margin-top: 2px; }

  .summary-wrap { display: flex; justify-content: flex-end; margin-bottom: 8px; }
  .summary { width: 100%; max-width: 340px; }
  .summary-row {
    display: flex; justify-content: space-between; gap: 10px;
    padding: 8px 12px; font-size: 12.5px; border-bottom: 1px solid #e8edf3;
  }
  .summary-row .label { color: #4a5568; font-weight: 500; }
  .summary-row .value { font-weight: 600; color: #1a202c; white-space: nowrap; }
  .summary-row.total {
    background: linear-gradient(135deg, #1e3a5f, #2c5282);
    color: #fff; border-radius: 8px; border-bottom: none;
    margin-top: 6px; padding: 12px 14px;
  }
  .summary-row.total .label {
    color: #fbd38d; font-weight: 700; font-size: 11.5px;
    letter-spacing: 1.2px; text-transform: uppercase;
  }
  .summary-row.total .value { color: #fff; font-size: 15px; font-weight: 700; }

  .amount-words {
    background: #f7fafc; border-left: 3px solid #f6ad55;
    padding: 10px 14px; border-radius: 0 8px 8px 0;
    font-size: 11.5px; color: #4a5568; margin-bottom: 22px;
  }
  .amount-words strong { color: #1a202c; }

  .footer-grid {
    display: flex; justify-content: space-between;
    gap: 24px; flex-wrap: wrap;
    border-top: 1px solid #e2e8f0; padding-top: 18px;
  }
  .bank-details {
    flex: 1 1 280px; font-size: 11.5px; color: #4a5568; line-height: 1.7;
  }

  /* ============ SIGNATURE (SINGLE IMAGE) ============ */
  .signature {
    flex: 0 0 220px;
    text-align: center;
    min-height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .signature-images {
    height: 90px;
    margin-bottom: 4px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .signature-img {
    max-height: 90px;
    max-width: 200px;
    width: auto;
    object-fit: contain;
  }
  .signature-line {
    border-top: 1px solid #2d3748;
    padding-top: 6px;
    font-size: 11.5px;
    font-weight: 600;
    color: #2d3748;
  }
  .signature-firm {
    font-size: 10.5px;
    color: #718096;
    margin-top: 2px;
  }

  .terms {
    margin-top: 16px; padding-top: 14px;
    border-top: 1px dashed #e2e8f0;
    font-size: 10.5px; color: #718096; line-height: 1.6;
  }
  .terms strong { color: #4a5568; }

  @media (max-width: 640px) {
    body { padding: 10px; }
    .toolbar { justify-content: stretch; }
    .toolbar button { flex: 1; padding: 10px 12px; font-size: 12.5px; }
    .header { padding: 18px 16px 16px; }
    .header-top { flex-direction: column; gap: 12px; }
    .firm-name { font-size: 16px; }
    .firm-tagline { font-size: 9.5px; letter-spacing: 1.8px; }
    .header-contact { text-align: left; min-width: 0; font-size: 11px; }
    .body { padding: 16px 14px 20px; }
    .top-grid { gap: 14px; margin-bottom: 18px; }
    .meta-box { flex: 1 1 100%; }
    .summary { max-width: 100%; }
    .summary-row { font-size: 12px; padding: 8px 10px; }
    .summary-row.total .value { font-size: 14px; }
    .footer-grid { gap: 16px; }
    .signature { flex: 1 1 100%; }
    .invoice { border-radius: 10px; }
    .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    table { min-width: 600px; font-size: 11.5px; }
    thead th { padding: 9px 6px; font-size: 9.5px; }
    tbody td { padding: 9px 6px; }
  }

  @media (max-width: 380px) {
    .firm-name { font-size: 14.5px; }
    .print-btn, .btn-secondary { font-size: 11.5px; padding: 9px 10px; }
  }

  /* ============ PRINT ============ */
  @media print {
    body { 
      background: #fff; 
      padding: 0; 
      font-size: 10.5px;
    }
    .no-print { display: none !important; }
    .layout { display: block; }
    .invoice { 
      box-shadow: none; 
      border-radius: 0; 
      max-width: 100%; 
      width: 100%;
    }
    .table-wrap { overflow: visible; }
    table { min-width: 0; font-size: 10.5px; }

    .header { padding: 16px 18px 14px; }
    .firm-name { font-size: 16px; }
    .firm-tagline { font-size: 9.5px; }
    .header-contact { font-size: 10.5px; min-width: 220px; }
    .invoice-title { margin-top: 10px; padding: 4px 14px; font-size: 10.5px; }

    .body { padding: 14px 18px 16px; }
    .top-grid { margin-bottom: 14px; gap: 14px; }
    .meta-box { padding: 10px 12px; }
    .meta-row { padding: 4px 0; font-size: 11px; }

    thead th { padding: 7px 6px; font-size: 9px; }
    tbody td { padding: 7px 6px; font-size: 10.5px; }
    .item-sub { font-size: 10px; }

    .summary { max-width: 300px; }
    .summary-row { padding: 5px 10px; font-size: 11px; }
    .summary-row.total { padding: 8px 10px; }
    .summary-row.total .value { font-size: 13px; }

    .amount-words { padding: 8px 12px; font-size: 10.5px; margin-bottom: 14px; }

    .footer-grid { padding-top: 12px; gap: 18px; }
    .signature { min-height: 110px; }
    .signature-images { height: 75px; }
    .signature-img { max-height: 75px; max-width: 170px; }
    .signature-line { font-size: 10.5px; }
    .signature-firm { font-size: 10px; }

    .terms { margin-top: 10px; padding-top: 10px; font-size: 10px; }

    .summary-wrap,
    .amount-words,
    .footer-grid,
    .terms {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .header, thead th, .summary-row.total, .invoice-title, .amount-words,
    tbody tr:nth-child(even) {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
  @page { size: A4; margin: 10mm; }
`;

/* ============================================================
   DEFAULT FORM STATE BUILDERS
   ============================================================ */
const buildDefaultItem = () => ({
  id: Date.now() + Math.random(),
  location: "",
  description: "Capacity Building of Existing Entrepreneurs",
  startDate: "",
  endDate: "",
  persons: 30,
  daysPerPerson: 3,
  ratePerDay: 593.22,
});

const buildDefaultForm = (invoiceNo = "TRAINING/UDR/01") => ({
  invoiceNo,
  month: "August 2026",
  invoiceDate: getTodayISO(),
  placeOfSupply: "Rajasthan",
  cgst: 9,
  sgst: 9,
  signatureUrl: "",   // combined signature + seal image
  items: [buildDefaultItem()],
});

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [formData, setFormData] = useState(buildDefaultForm());
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) validateField(field, value);
  };

  /* File to Base64 */
  const handleFileUpload = (field, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData((prev) => ({ ...prev, [field]: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const updateItem = (index, field, value) => {
    setFormData((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };

      if (field === "startDate" || field === "endDate") {
        const days = daysBetween(items[index].startDate, items[index].endDate);
        if (days > 0) items[index].daysPerPerson = days;
      }
      return { ...prev, items };
    });

    const key = `items.${index}.${field}`;
    if (touched[key]) validateField(key, value);
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, buildDefaultItem()],
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (k.startsWith(`items.${index}.`)) delete next[k];
      });
      return next;
    });
  };

  const nextInvoiceNo = () => {
    const confirmed = window.confirm(
      "Are you sure you want to proceed to the next invoice?\n\n" +
        "Current bill data will be cleared and the invoice number will be incremented by 1.\n\n" +
        "Signature and seal will be retained.\n\n" +
        "Click OK to continue or Cancel to stay on this invoice."
    );

    if (!confirmed) return;

    const match = formData.invoiceNo.match(/(\d+)$/);
    if (!match) {
      setFormData((prev) => ({
        ...buildDefaultForm(),
        signatureUrl: prev.signatureUrl,
      }));
      setErrors({});
      setTouched({});
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const num = parseInt(match[1]) + 1;
    const newNo = formData.invoiceNo.replace(/\d+$/, String(num).padStart(2, "0"));

    setFormData((prev) => ({
      ...buildDefaultForm(newNo),
      signatureUrl: prev.signatureUrl,
    }));
    setErrors({});
    setTouched({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- VALIDATION ---------- */
  const validateField = (key, value) => {
    let msg = "";

    if (key === "invoiceNo" && !String(value).trim()) msg = "Invoice No. is required";
    if (key === "month" && !String(value).trim()) msg = "Month is required";
    if (key === "invoiceDate" && !value) msg = "Invoice Date is required";

    if (key.startsWith("items.")) {
      if (key.endsWith(".location") && !String(value).trim())
        msg = "Training location is required";
      if (key.endsWith(".description") && !String(value).trim())
        msg = "Description is required";
      if (key.endsWith(".startDate") && !value) msg = "Start date is required";
      if (key.endsWith(".endDate") && !value) msg = "End date is required";
      if (key.endsWith(".persons")) {
        if (!value || Number(value) <= 0) msg = "Persons must be greater than 0";
      }
      if (key.endsWith(".daysPerPerson")) {
        if (!value || Number(value) <= 0) msg = "Days must be greater than 0";
      }
      if (key.endsWith(".ratePerDay")) {
        if (!value || Number(value) <= 0) msg = "Rate must be greater than 0";
      }
    }

    setErrors((prev) => {
      const next = { ...prev };
      if (msg) next[key] = msg;
      else delete next[key];
      return next;
    });
  };

  const validateAll = () => {
    const newErrors = {};
    const newTouched = {};

    ["invoiceNo", "month", "invoiceDate"].forEach((f) => {
      newTouched[f] = true;
      let msg = "";
      if (f === "invoiceDate" && !formData[f]) msg = "Invoice Date is required";
      if (f !== "invoiceDate" && !String(formData[f]).trim()) msg = "This field is required";
      if (msg) newErrors[f] = msg;
    });

    formData.items.forEach((item, i) => {
      [
        ["location", "Training location is required"],
        ["description", "Description is required"],
        ["startDate", "Start date is required"],
        ["endDate", "End date is required"],
        ["persons", "Persons must be greater than 0"],
        ["daysPerPerson", "Days must be greater than 0"],
        ["ratePerDay", "Rate must be greater than 0"],
      ].forEach(([field, defaultMsg]) => {
        const key = `items.${i}.${field}`;
        newTouched[key] = true;
        const v = item[field];
        let msg = "";
        if (field === "persons" || field === "daysPerPerson" || field === "ratePerDay") {
          if (!v || Number(v) <= 0) msg = defaultMsg;
        } else if (!String(v).trim()) {
          msg = defaultMsg;
        }
        if (msg) newErrors[key] = msg;
      });
    });

    setErrors(newErrors);
    setTouched(newTouched);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrint = () => {
    if (!validateAll()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setTimeout(() => window.print(), 100);
  };

  const totals = useMemo(() => {
    const subTotal = formData.items.reduce(
      (sum, item) =>
        sum +
        Number(item.persons || 0) *
          Number(item.daysPerPerson || 0) *
          Number(item.ratePerDay || 0),
      0
    );
    const cgstAmount = (subTotal * formData.cgst) / 100;
    const sgstAmount = (subTotal * formData.sgst) / 100;
    const grandTotal = subTotal + cgstAmount + sgstAmount;
    const totalPersons = formData.items.reduce(
      (sum, item) => sum + Number(item.persons || 0),
      0
    );
    return { subTotal, cgstAmount, sgstAmount, grandTotal, totalPersons };
  }, [formData.items, formData.cgst, formData.sgst]);

  const errorList = Object.values(errors);
  const hasErrors = errorList.length > 0;
  const err = (key) => (touched[key] && errors[key] ? errors[key] : "");

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {hasErrors && Object.keys(touched).length > 0 && (
          <div className="error-banner no-print">
            <div>
              <div>⚠️ Some fields are empty or invalid — please fix them first:</div>
              <ul>
                {errorList.slice(0, 6).map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
                {errorList.length > 6 && <li>...and {errorList.length - 6} more</li>}
              </ul>
            </div>
          </div>
        )}

        <div className="toolbar no-print">
          <button className="btn-secondary" onClick={nextInvoiceNo}>
            ➕ Next Invoice No.
          </button>
          <button className="print-btn" onClick={handlePrint}>
            🖨️ Print / Save as PDF
          </button>
        </div>

        <div className="layout">
          {/* ============ FORM PANEL ============ */}
          <div className="form-panel no-print">
            <h2 className="form-title">🧾 Invoice Details</h2>

            <div className="form-section">
              <h3>Invoice Info</h3>
              <div className="form-grid">
                <div className="field">
                  <label>Invoice No. <span className="required">*</span></label>
                  <input
                    type="text"
                    className={err("invoiceNo") ? "error" : ""}
                    value={formData.invoiceNo}
                    onChange={(e) => handleChange("invoiceNo", e.target.value)}
                    onBlur={() => validateField("invoiceNo", formData.invoiceNo)}
                  />
                  {err("invoiceNo") && <span className="error-msg">{err("invoiceNo")}</span>}
                </div>

                <div className="field">
                  <label>Month <span className="required">*</span></label>
                  <select
                    value={formData.month}
                    onChange={(e) => handleChange("month", e.target.value)}
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label>Invoice Date <span className="required">*</span></label>
                  <input
                    type="date"
                    className={err("invoiceDate") ? "error" : ""}
                    value={formData.invoiceDate}
                    onChange={(e) => handleChange("invoiceDate", e.target.value)}
                    onBlur={() => validateField("invoiceDate", formData.invoiceDate)}
                  />
                  {err("invoiceDate") && <span className="error-msg">{err("invoiceDate")}</span>}
                </div>

                <div className="field">
                  <label>Place of Supply</label>
                  <select
                    value={formData.placeOfSupply}
                    onChange={(e) => handleChange("placeOfSupply", e.target.value)}
                  >
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                <div className="field">
                  <label>CGST %</label>
                  <select
                    value={formData.cgst}
                    onChange={(e) => handleChange("cgst", parseFloat(e.target.value))}
                  >
                    <option value={0}>0%</option>
                    <option value={2.5}>2.5%</option>
                    <option value={6}>6%</option>
                    <option value={9}>9%</option>
                  </select>
                </div>

                <div className="field">
                  <label>SGST %</label>
                  <select
                    value={formData.sgst}
                    onChange={(e) => handleChange("sgst", parseFloat(e.target.value))}
                  >
                    <option value={0}>0%</option>
                    <option value={2.5}>2.5%</option>
                    <option value={6}>6%</option>
                    <option value={9}>9%</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ============ SIGNATURE + SEAL (single combined PNG) ============ */}
            <div className="form-section">
              <h3>Signature &amp; Seal</h3>
              <div className="form-grid">
                <div className="field full">
                  <label>Upload Signature + Seal (single PNG)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload("signatureUrl", e.target.files[0])
                    }
                  />
                  {formData.signatureUrl && (
                    <div className="upload-preview">
                      <img src={formData.signatureUrl} alt="Signature & Seal preview" />
                      <div>
                        <button
                          className="btn-clear"
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, signatureUrl: "" }))
                          }
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                  )}
                  <span className="hint">
                    Transparent PNG best hai — Next Invoice par bhi retain rahega
                  </span>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="items-header">
                <h3>Training Items</h3>
                <button className="btn-add" onClick={addItem}>+ Add Item</button>
              </div>

              <datalist id="location-suggestions">
                {locationSuggestions.map((loc) => (
                  <option key={loc} value={loc} />
                ))}
              </datalist>

              {formData.items.map((item, index) => {
                const itemHasError = ["location", "description", "startDate", "endDate", "persons", "daysPerPerson", "ratePerDay"]
                  .some((f) => err(`items.${index}.${f}`));
                return (
                  <div key={item.id} className={`item-card ${itemHasError ? "has-error" : ""}`}>
                    <div className="item-card-header">
                      <span>Item #{index + 1}</span>
                      {formData.items.length > 1 && (
                        <button className="btn-remove" onClick={() => removeItem(index)}>
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="form-grid">
                      <div className="field full">
                        <label>Training Location <span className="required">*</span></label>
                        <input
                          type="text"
                          list="location-suggestions"
                          placeholder="Type or select (Rajasthan districts)"
                          className={err(`items.${index}.location`) ? "error" : ""}
                          value={item.location}
                          onChange={(e) => updateItem(index, "location", e.target.value)}
                          onBlur={() => validateField(`items.${index}.location`, item.location)}
                        />
                        <span className="hint">Suggestions from all 41 districts of Rajasthan</span>
                        {err(`items.${index}.location`) && (
                          <span className="error-msg">{err(`items.${index}.location`)}</span>
                        )}
                      </div>

                      <div className="field full">
                        <label>Description / Type <span className="required">*</span></label>
                        <select
                          className={err(`items.${index}.description`) ? "error" : ""}
                          value={item.description}
                          onChange={(e) => updateItem(index, "description", e.target.value)}
                          onBlur={() => validateField(`items.${index}.description`, item.description)}
                        >
                          {descriptionOptions.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        {err(`items.${index}.description`) && (
                          <span className="error-msg">{err(`items.${index}.description`)}</span>
                        )}
                      </div>

                      <div className="field">
                        <label>Start Date <span className="required">*</span></label>
                        <input
                          type="date"
                          className={err(`items.${index}.startDate`) ? "error" : ""}
                          value={item.startDate}
                          onChange={(e) => updateItem(index, "startDate", e.target.value)}
                          onBlur={() => validateField(`items.${index}.startDate`, item.startDate)}
                        />
                        {err(`items.${index}.startDate`) && (
                          <span className="error-msg">{err(`items.${index}.startDate`)}</span>
                        )}
                      </div>

                      <div className="field">
                        <label>End Date <span className="required">*</span></label>
                        <input
                          type="date"
                          className={err(`items.${index}.endDate`) ? "error" : ""}
                          value={item.endDate}
                          onChange={(e) => updateItem(index, "endDate", e.target.value)}
                          onBlur={() => validateField(`items.${index}.endDate`, item.endDate)}
                        />
                        {err(`items.${index}.endDate`) && (
                          <span className="error-msg">{err(`items.${index}.endDate`)}</span>
                        )}
                      </div>

                      <div className="field">
                        <label>Days / Person <span className="required">*</span></label>
                        <input
                          type="number"
                          min="1"
                          className={err(`items.${index}.daysPerPerson`) ? "error" : ""}
                          value={item.daysPerPerson}
                          onChange={(e) => updateItem(index, "daysPerPerson", e.target.value)}
                          onBlur={() => validateField(`items.${index}.daysPerPerson`, item.daysPerPerson)}
                        />
                        <span className="hint">Auto-calculated from dates</span>
                        {err(`items.${index}.daysPerPerson`) && (
                          <span className="error-msg">{err(`items.${index}.daysPerPerson`)}</span>
                        )}
                      </div>

                      <div className="field">
                        <label>Total Persons <span className="required">*</span></label>
                        <input
                          type="number"
                          min="1"
                          className={err(`items.${index}.persons`) ? "error" : ""}
                          value={item.persons}
                          onChange={(e) => updateItem(index, "persons", e.target.value)}
                          onBlur={() => validateField(`items.${index}.persons`, item.persons)}
                        />
                        {err(`items.${index}.persons`) && (
                          <span className="error-msg">{err(`items.${index}.persons`)}</span>
                        )}
                      </div>

                      <div className="field full">
                        <label>Rate / Day / Person (₹) <span className="required">*</span></label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Enter rate"
                          className={err(`items.${index}.ratePerDay`) ? "error" : ""}
                          value={item.ratePerDay}
                          onChange={(e) => updateItem(index, "ratePerDay", e.target.value)}
                          onBlur={() => validateField(`items.${index}.ratePerDay`, item.ratePerDay)}
                        />
                        {err(`items.${index}.ratePerDay`) && (
                          <span className="error-msg">{err(`items.${index}.ratePerDay`)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============ INVOICE PREVIEW ============ */}
          <div className="invoice">
            <header className="header">
              <div className="header-top">
                <div>
                  <div className="firm-name">{businessDetails.firmName}</div>
                  <div className="firm-tagline">{businessDetails.tagline}</div>
                </div>
                <div className="header-contact">
                  <div>{businessDetails.addressLine1}</div>
                  <div><strong>{businessDetails.phone}</strong></div>
                  <div><strong>GSTIN:</strong> {businessDetails.gstin}</div>
                  <div><strong>State:</strong> {businessDetails.state} (Code: {businessDetails.stateCode})</div>
                </div>
              </div>
              <div className="invoice-title">Tax Invoice</div>
            </header>

            <div className="body">
              <div className="top-grid">
                <div className="bill-to">
                  <div className="section-label">Bill To</div>
                  <div className="buyer-name">{buyerDetails.name}</div>
                  <p>{buyerDetails.address}</p>
                  <p className="gstin">GSTIN: {buyerDetails.gstin}</p>
                  <p style={{ marginTop: 4, fontSize: 11, color: "#718096" }}>
                    State: {buyerDetails.state}
                  </p>
                </div>

                <div className="meta-box">
                  <div className="meta-row">
                    <span className="label">Invoice No.</span>
                    <span className="value">{formData.invoiceNo || "—"}</span>
                  </div>
                  <div className="meta-row">
                    <span className="label">Month</span>
                    <span className="value">{formData.month}</span>
                  </div>
                  <div className="meta-row">
                    <span className="label">Invoice Date</span>
                    <span className="value">{formatDate(formData.invoiceDate) || "—"}</span>
                  </div>
                  <div className="meta-row">
                    <span className="label">Place of Supply</span>
                    <span className="value">{formData.placeOfSupply}</span>
                  </div>
                </div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: "30px" }}>#</th>
                      <th>Category / Description</th>
                      <th>Training Dates</th>
                      <th className="center">Days<br/>/Person</th>
                      <th className="center">Persons</th>
                      <th className="num">Rate<br/>/Day/Person</th>
                      <th className="num">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => {
                      const amount =
                        Number(item.persons || 0) *
                        Number(item.daysPerPerson || 0) *
                        Number(item.ratePerDay || 0);
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="item-category">
                              {item.location || "—"}
                            </div>
                            <div className="item-sub">{item.description || "—"}</div>
                          </td>
                          <td>
                            {item.startDate && item.endDate
                              ? `${formatDate(item.startDate)} to ${formatDate(item.endDate)}`
                              : "—"}
                          </td>
                          <td className="center">{item.daysPerPerson || "—"}</td>
                          <td className="center">{item.persons || "—"}</td>
                          <td className="num">
                            ₹{Number(item.ratePerDay || 0).toFixed(2)}
                          </td>
                          <td className="num">₹{amount.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="summary-wrap">
                <div className="summary">
                  <div className="summary-row">
                    <span className="label">Total Persons Trained</span>
                    <span className="value">{totals.totalPersons}</span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Sub Total</span>
                    <span className="value">₹{totals.subTotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="label">CGST @ {formData.cgst}%</span>
                    <span className="value">₹{totals.cgstAmount.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="label">SGST @ {formData.sgst}%</span>
                    <span className="value">₹{totals.sgstAmount.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span className="label">Grand Total</span>
                    <span className="value">₹{totals.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="amount-words">
                <strong>Amount in Words:</strong> {numberToWords(totals.grandTotal)}
              </div>

              <div className="footer-grid">
                <div className="bank-details">
                  <div className="section-label">Payment Details</div>
                  <p>
                    <strong>Bank:</strong> CANARA BANK<br />
                    <strong>A/C No.:</strong> 120041033031<br />
                    <strong>IFSC:</strong> CNRB0018450<br />
                    <strong>Branch:</strong> BAPU BAZAR UDAIPUR
                  </p>
                  <p style={{ marginTop: 10, fontSize: 10, color: "#a0aec0" }}>
                    * Please quote Invoice No. while making payment.
                  </p>
                </div>

                {/* ============ SIGNATURE + SEAL (single image) ============ */}
                <div className="signature">
                  <div className="signature-images">
                    {formData.signatureUrl && (
                      <img
                        src={formData.signatureUrl}
                        alt="Signature & Seal"
                        className="signature-img"
                      />
                    )}
                  </div>
                  <div className="signature-line">Authorised Signatory</div>
                  <div className="signature-firm">{businessDetails.firmName}</div>
                </div>
              </div>

              <div className="terms">
                <strong>Declaration:</strong> We declare that this invoice shows the actual
                price of the services described and that all particulars are true and correct.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}