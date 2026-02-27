/**
 * Invoice Generator - Export Utilities
 * HTML and PDF export functionality
 */

import jsPDF from 'jspdf';
import type { InvoiceData, InvoiceTotals, ExportOptions } from '@/types/invoice';

// Format date for display based on language
const formatDate = (dateString: string, language: string = 'en'): string => {
  const date = new Date(dateString);
  const locale = language === 'de' ? 'de-DE' : 'en-GB';
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Format number with 2 decimal places
const formatNumber = (num: number): string => {
  return num.toFixed(2);
};

// German translations for HTML export
const deLabels = {
  invoice: 'RECHNUNG',
  vatNo: 'USt-IdNr.',
  billTo: 'Rechnung an:',
  invoiceDetails: 'Rechnungsdetails:',
  invoiceNumber: 'Rechnungsnr.',
  invoiceDate: 'Rechnungsdatum',
  referencePO: 'Bestellreferenz',
  currency: 'Währung',
  materialNo: 'Materialnr.',
  description: 'Beschreibung',
  qty: 'Menge',
  unit: 'Einheit',
  price: 'Preis',
  total: 'Gesamt',
  subtotal: 'Zwischensumme',
  tax: 'Steuer',
  grandTotal: 'GESAMT',
  paymentTerms: 'Zahlungsbedingungen',
  bankDetails: 'Bankdaten:',
  bankName: 'Bankname',
  account: 'Konto',
  swift: 'SWIFT',
};

// English labels for HTML export
const enLabels = {
  invoice: 'INVOICE',
  vatNo: 'VAT No',
  billTo: 'Bill To:',
  invoiceDetails: 'Invoice Details:',
  invoiceNumber: 'Invoice #',
  invoiceDate: 'Invoice Date',
  referencePO: 'Ref. PO',
  currency: 'Currency',
  materialNo: 'Material No.',
  description: 'Description',
  qty: 'Qty',
  unit: 'Unit',
  price: 'Price',
  total: 'Total',
  subtotal: 'Subtotal',
  tax: 'Tax',
  grandTotal: 'TOTAL',
  paymentTerms: 'Payment Terms',
  bankDetails: 'Bank Details:',
  bankName: 'Bank Name',
  account: 'Account',
  swift: 'SWIFT',
};

// Generate invoice HTML content
const generateInvoiceHTML = (
  invoice: InvoiceData,
  totals: InvoiceTotals,
  language: string = 'en'
): string => {
  const labels = language === 'de' ? deLabels : enLabels;
  const formattedDate = formatDate(invoice.invoiceDate, language);

  const lineItemsHTML = invoice.lineItems
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.materialNo}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.description}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.unit}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatNumber(item.price)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatNumber(item.quantity * item.price)}</td>
      </tr>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${labels.invoice} ${invoice.invoiceNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #f3f4f6;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 48px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .invoice-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 40px;
      padding-bottom: 24px;
      border-bottom: 2px solid #1f2937;
    }
    .company-info h1 {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 8px;
    }
    .company-info p {
      color: #6b7280;
      font-size: 14px;
    }
    .invoice-title {
      text-align: right;
    }
    .invoice-title h2 {
      font-size: 32px;
      font-weight: 300;
      color: #1f2937;
      letter-spacing: 2px;
    }
    .invoice-meta {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      margin-bottom: 32px;
    }
    .bill-to h3, .invoice-details h3 {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .bill-to p {
      color: #1f2937;
      font-size: 14px;
      line-height: 1.6;
    }
    .details-grid {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px 16px;
      font-size: 14px;
    }
    .details-grid .label {
      color: #6b7280;
      font-weight: 500;
    }
    .details-grid .value {
      color: #1f2937;
      font-weight: 600;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 32px;
    }
    .items-table th {
      background: #f9fafb;
      padding: 12px 10px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #e5e7eb;
    }
    .items-table th:last-child,
    .items-table td:last-child {
      text-align: right;
    }
    .items-table th:nth-child(3),
    .items-table td:nth-child(3),
    .items-table th:nth-child(4),
    .items-table td:nth-child(4) {
      text-align: center;
    }
    .items-table th:nth-child(5),
    .items-table td:nth-child(5) {
      text-align: right;
    }
    .totals-section {
      margin-left: auto;
      width: 300px;
      border-top: 2px solid #e5e7eb;
      padding-top: 16px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
    }
    .total-row .label {
      color: #6b7280;
    }
    .total-row .value {
      color: #1f2937;
      font-weight: 600;
    }
    .total-row.grand-total {
      border-top: 2px solid #1f2937;
      margin-top: 8px;
      padding-top: 16px;
      font-size: 18px;
      font-weight: 700;
    }
    .total-row.grand-total .label,
    .total-row.grand-total .value {
      color: #1f2937;
    }
    .bank-details {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
    }
    .bank-details h3 {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }
    .bank-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      font-size: 14px;
    }
    .bank-item .label {
      color: #6b7280;
      font-size: 12px;
      margin-bottom: 4px;
    }
    .bank-item .value {
      color: #1f2937;
      font-weight: 600;
    }
    .payment-terms {
      margin-top: 24px;
      padding: 16px;
      background: #f9fafb;
      border-radius: 6px;
    }
    .payment-terms h3 {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .payment-terms p {
      color: #1f2937;
      font-size: 14px;
      font-weight: 500;
    }
    @media print {
      body { background: white; padding: 0; }
      .invoice-container { box-shadow: none; padding: 24px; }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="invoice-header">
      <div class="company-info">
        <h1>${invoice.vendor.name}</h1>
        <p>${labels.vatNo}: ${invoice.vendor.vatNumber}</p>
      </div>
      <div class="invoice-title">
        <h2>${labels.invoice}</h2>
      </div>
    </div>
    
    <div class="invoice-meta">
      <div class="bill-to">
        <h3>${labels.billTo}</h3>
        <p><strong>${invoice.customer.companyName}</strong><br>${invoice.customer.address.replace(/, /g, '<br>')}</p>
      </div>
      <div class="invoice-details">
        <h3>${labels.invoiceDetails}</h3>
        <div class="details-grid">
          <span class="label">${labels.invoiceNumber}</span>
          <span class="value">${invoice.invoiceNumber}</span>
          <span class="label">${labels.invoiceDate}</span>
          <span class="value">${formattedDate}</span>
          <span class="label">${labels.referencePO}</span>
          <span class="value">${invoice.referencePO}</span>
          <span class="label">${labels.currency}</span>
          <span class="value">${invoice.currency}</span>
        </div>
      </div>
    </div>
    
    <table class="items-table">
      <thead>
        <tr>
          <th>${labels.materialNo}</th>
          <th>${labels.description}</th>
          <th>${labels.qty}</th>
          <th>${labels.unit}</th>
          <th>${labels.price}</th>
          <th>${labels.total}</th>
        </tr>
      </thead>
      <tbody>
        ${lineItemsHTML}
      </tbody>
    </table>
    
    <div class="totals-section">
      <div class="total-row">
        <span class="label">${labels.subtotal}</span>
        <span class="value">${formatNumber(totals.subtotal)} ${invoice.currency}</span>
      </div>
      <div class="total-row">
        <span class="label">${labels.tax} (${invoice.taxRate}%)</span>
        <span class="value">${formatNumber(totals.taxAmount)} ${invoice.currency}</span>
      </div>
      <div class="total-row grand-total">
        <span class="label">${labels.grandTotal}</span>
        <span class="value">${formatNumber(totals.total)} ${invoice.currency}</span>
      </div>
    </div>
    
    <div class="payment-terms">
      <h3>${labels.paymentTerms}</h3>
      <p>${invoice.paymentTerms.description}</p>
    </div>
    
    <div class="bank-details">
      <h3>${labels.bankDetails}</h3>
      <div class="bank-grid">
        <div class="bank-item">
          <div class="label">${labels.bankName}</div>
          <div class="value">${invoice.bankDetails.bankName}</div>
        </div>
        <div class="bank-item">
          <div class="label">${labels.account}</div>
          <div class="value">${invoice.bankDetails.accountNumber}</div>
        </div>
        <div class="bank-item">
          <div class="label">${labels.swift}</div>
          <div class="value">${invoice.bankDetails.swiftCode}</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

// Export to HTML file
export const exportToHTML = (
  invoice: InvoiceData,
  totals: InvoiceTotals,
  language: string = 'en',
  options: ExportOptions = {}
): void => {
  const { filename = `Invoice-${invoice.invoiceNumber}` } = options;
  
  const htmlContent = generateInvoiceHTML(invoice, totals, language);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

// Export to PDF
export const exportToPDF = async (
  element: HTMLElement,
  invoice: InvoiceData,
  options: ExportOptions = {}
): Promise<void> => {
  const { filename = `Invoice-${invoice.invoiceNumber}` } = options;

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    await pdf.html(element, {
      x: 10,
      y: 10,
      margin: [10, 10, 10, 10],
      autoPaging: 'text',
      html2canvas: {
        scale: 1,
        useCORS: true,
        backgroundColor: '#ffffff',
      },
      width: 190,
      windowWidth: element.scrollWidth,
    });

    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('PDF export failed:', error);
    throw new Error('Failed to export PDF');
  }
};

// Print invoice
export const printInvoice = (element: HTMLElement): void => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  
  const content = element.innerHTML;
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Print Invoice</title>
      <style>
        @media print {
          body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      </style>
    </head>
    <body>
      ${content}
      <script>
        window.onload = function() { window.print(); };
      </script>
    </body>
    </html>
  `);
  
  printWindow.document.close();
};
