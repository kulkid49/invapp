/**
 * Invoice Generator - Internationalization Configuration
 * Supports English and German languages
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
  app: {
    title: 'Invoice Generator',
    subtitle: 'Fill in the form below to generate your invoice',
    footer: 'Invoice Generator - Clean, maintainable, and future-proof',
  },
  actions: {
    reset: 'Reset',
    addItem: 'Add Item',
    remove: 'Remove',
    exportHTML: 'HTML',
    exportPDF: 'PDF',
    generateNewNumber: 'Generate new number',
  },
  sections: {
    vendorInfo: 'Vendor Information',
    invoiceDetails: 'Invoice Details',
    customerInfo: 'Customer Information',
    lineItems: 'Material Line Items',
    bankDetails: 'Bank Details',
    paymentTerms: 'Payment Terms',
  },
  labels: {
    template: 'Invoice Template',
    vendorName: 'Vendor / Company Name',
    vatNumber: 'Vendor VAT No',
    invoiceNumber: 'Invoice #',
    invoiceDate: 'Invoice Date',
    referencePO: 'Ref. PO',
    currency: 'Currency',
    taxRate: 'Tax Rate (%)',
    customerName: 'Bill To (Company Name)',
    customerAddress: 'Address',
    materialNo: 'Material No.',
    description: 'Description',
    quantity: 'Qty',
    unit: 'Unit',
    price: 'Price',
    lineTotal: 'Line Total',
    bankName: 'Bank Name',
    accountNumber: 'Account',
    swiftCode: 'SWIFT',
    termsDescription: 'Terms Description',
  },
  preview: {
    title: 'Invoice Preview',
    invoice: 'INVOICE',
    billTo: 'Bill To:',
    invoiceDetails: 'Invoice Details:',
    materialNo: 'Material No.',
    description: 'Description',
    qty: 'Qty',
    unit: 'Unit',
    price: 'Price',
    total: 'Total',
    subtotal: 'Subtotal',
    tax: 'Tax ({{rate}}%)',
    grandTotal: 'TOTAL',
    paymentTerms: 'Payment Terms',
    bankDetails: 'Bank Details:',
  },
  templates: {
    classic: 'Classic',
    classicDescription: 'Traditional invoice layout with clean lines',
    modern: 'Modern',
    modernDescription: 'Contemporary design with enhanced visuals',
    minimal: 'Minimal',
    minimalDescription: 'Clean and simple minimal design',
  },
  units: {
    PC: 'PC (Piece)',
    ST: 'ST (Stück)',
    EA: 'EA (Each)',
    KG: 'KG (Kilogram)',
    M: 'M (Meter)',
    L: 'L (Liter)',
    HR: 'HR (Hour)',
    BOX: 'BOX (Box)',
  },
  currencies: {
    EUR: 'EUR (Euro)',
    USD: 'USD (US Dollar)',
    GBP: 'GBP (British Pound)',
    CHF: 'CHF (Swiss Franc)',
  },
  toast: {
    htmlExported: 'HTML exported successfully!',
    pdfExported: 'PDF exported successfully!',
    invoiceReset: 'Invoice reset to defaults',
    exportError: 'Failed to export',
    confirmReset: 'Are you sure you want to reset the invoice?',
  },
};

// German translations
const deTranslations = {
  app: {
    title: 'Rechnungsgenerator',
    subtitle: 'Füllen Sie das untenstehende Formular aus, um Ihre Rechnung zu erstellen',
    footer: 'Rechnungsgenerator - Sauber, wartbar und zukunftssicher',
  },
  actions: {
    reset: 'Zurücksetzen',
    addItem: 'Position hinzufügen',
    remove: 'Entfernen',
    exportHTML: 'HTML',
    exportPDF: 'PDF',
    generateNewNumber: 'Neue Nummer generieren',
  },
  sections: {
    vendorInfo: 'Lieferanteninformationen',
    invoiceDetails: 'Rechnungsdetails',
    customerInfo: 'Kundeninformationen',
    lineItems: 'Materialpositionen',
    bankDetails: 'Bankdaten',
    paymentTerms: 'Zahlungsbedingungen',
  },
  labels: {
    template: 'Rechnungsvorlage',
    vendorName: 'Lieferant / Firmenname',
    vatNumber: 'USt-IdNr. des Lieferanten',
    invoiceNumber: 'Rechnungsnr.',
    invoiceDate: 'Rechnungsdatum',
    referencePO: 'Bestellreferenz',
    currency: 'Währung',
    taxRate: 'Steuersatz (%)',
    customerName: 'Rechnung an (Firmenname)',
    customerAddress: 'Adresse',
    materialNo: 'Materialnr.',
    description: 'Beschreibung',
    quantity: 'Menge',
    unit: 'Einheit',
    price: 'Preis',
    lineTotal: 'Positionssumme',
    bankName: 'Bankname',
    accountNumber: 'Konto',
    swiftCode: 'SWIFT',
    termsDescription: 'Bedingungsbeschreibung',
  },
  preview: {
    title: 'Rechnungsvorschau',
    invoice: 'RECHNUNG',
    billTo: 'Rechnung an:',
    invoiceDetails: 'Rechnungsdetails:',
    materialNo: 'Materialnr.',
    description: 'Beschreibung',
    qty: 'Menge',
    unit: 'Einheit',
    price: 'Preis',
    total: 'Gesamt',
    subtotal: 'Zwischensumme',
    tax: 'Steuer ({{rate}}%)',
    grandTotal: 'GESAMT',
    paymentTerms: 'Zahlungsbedingungen',
    bankDetails: 'Bankdaten:',
  },
  templates: {
    classic: 'Klassisch',
    classicDescription: 'Traditionelles Rechnungslayout mit klaren Linien',
    modern: 'Modern',
    modernDescription: 'Zeitgemäßes Design mit verbesserten Visuals',
    minimal: 'Minimal',
    minimalDescription: 'Sauberes und einfaches minimalistisches Design',
  },
  units: {
    PC: 'PC (Stück)',
    ST: 'ST (Stück)',
    EA: 'EA (Stück)',
    KG: 'KG (Kilogramm)',
    M: 'M (Meter)',
    L: 'L (Liter)',
    HR: 'HR (Stunde)',
    BOX: 'BOX (Karton)',
  },
  currencies: {
    EUR: 'EUR (Euro)',
    USD: 'USD (US-Dollar)',
    GBP: 'GBP (Britisches Pfund)',
    CHF: 'CHF (Schweizer Franken)',
  },
  toast: {
    htmlExported: 'HTML erfolgreich exportiert!',
    pdfExported: 'PDF erfolgreich exportiert!',
    invoiceReset: 'Rechnung auf Standardwerte zurückgesetzt',
    exportError: 'Export fehlgeschlagen',
    confirmReset: 'Möchten Sie die Rechnung wirklich zurücksetzen?',
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      de: {
        translation: deTranslations,
      },
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

// Language switcher helper
export const availableLanguages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];
