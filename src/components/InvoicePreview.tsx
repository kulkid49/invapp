/**
 * Invoice Generator - Invoice Preview Component
 * Live preview of the invoice with Classic template and i18n support
 */

import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { InvoiceData, InvoiceTotals } from '@/types/invoice';

interface InvoicePreviewProps {
  invoice: InvoiceData;
  totals: InvoiceTotals;
}

// Format date for display based on language
const formatDate = (dateString: string, language: string): string => {
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

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ invoice, totals }, ref) => {
    const { t, i18n } = useTranslation();
    const formattedDate = formatDate(invoice.invoiceDate, i18n.language);

    return (
      <div
        ref={ref}
        className="bg-white p-12 shadow-lg"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          lineHeight: 1.6,
          color: '#1f2937',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '40px',
            paddingBottom: '24px',
            borderBottom: '2px solid #1f2937',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#1f2937',
                marginBottom: '8px',
              }}
            >
              {invoice.vendor.name}
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              {t('labels.vatNumber')}: {invoice.vendor.vatNumber}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: 300,
                color: '#1f2937',
                letterSpacing: '2px',
              }}
            >
              {t('preview.invoice')}
            </h2>
          </div>
        </div>

        {/* Meta Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            marginBottom: '32px',
          }}
        >
          {/* Bill To */}
          <div>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '8px',
              }}
            >
              {t('preview.billTo')}
            </h3>
            <p style={{ color: '#1f2937', fontSize: '14px', lineHeight: 1.6 }}>
              <strong>{invoice.customer.companyName}</strong>
              <br />
              {invoice.customer.address.split(', ').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          {/* Invoice Details */}
          <div>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '8px',
              }}
            >
              {t('preview.invoiceDetails')}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '8px 16px',
                fontSize: '14px',
              }}
            >
              <span style={{ color: '#6b7280', fontWeight: 500 }}>{t('labels.invoiceNumber')}</span>
              <span style={{ color: '#1f2937', fontWeight: 600 }}>
                {invoice.invoiceNumber}
              </span>

              <span style={{ color: '#6b7280', fontWeight: 500 }}>{t('labels.invoiceDate')}</span>
              <span style={{ color: '#1f2937', fontWeight: 600 }}>
                {formattedDate}
              </span>

              <span style={{ color: '#6b7280', fontWeight: 500 }}>{t('labels.referencePO')}</span>
              <span style={{ color: '#1f2937', fontWeight: 600 }}>
                {invoice.referencePO}
              </span>

              <span style={{ color: '#6b7280', fontWeight: 500 }}>{t('labels.currency')}</span>
              <span style={{ color: '#1f2937', fontWeight: 600 }}>
                {invoice.currency}
              </span>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '32px',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  background: '#f9fafb',
                  padding: '12px 10px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderBottom: '2px solid #e5e7eb',
                }}
              >
                {t('preview.materialNo')}
              </th>
              <th
                style={{
                  background: '#f9fafb',
                  padding: '12px 10px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderBottom: '2px solid #e5e7eb',
                }}
              >
                {t('preview.description')}
              </th>
              <th
                style={{
                  background: '#f9fafb',
                  padding: '12px 10px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderBottom: '2px solid #e5e7eb',
                }}
              >
                {t('preview.qty')}
              </th>
              <th
                style={{
                  background: '#f9fafb',
                  padding: '12px 10px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderBottom: '2px solid #e5e7eb',
                }}
              >
                {t('preview.unit')}
              </th>
              <th
                style={{
                  background: '#f9fafb',
                  padding: '12px 10px',
                  textAlign: 'right',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderBottom: '2px solid #e5e7eb',
                }}
              >
                {t('preview.price')}
              </th>
              <th
                style={{
                  background: '#f9fafb',
                  padding: '12px 10px',
                  textAlign: 'right',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderBottom: '2px solid #e5e7eb',
                }}
              >
                {t('preview.total')}
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((item) => (
              <tr key={item.id}>
                <td
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  {item.materialNo}
                </td>
                <td
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  {item.description}
                </td>
                <td
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #e5e7eb',
                    textAlign: 'center',
                  }}
                >
                  {item.quantity}
                </td>
                <td
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #e5e7eb',
                    textAlign: 'center',
                  }}
                >
                  {item.unit}
                </td>
                <td
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #e5e7eb',
                    textAlign: 'right',
                  }}
                >
                  {formatNumber(item.price)}
                </td>
                <td
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #e5e7eb',
                    textAlign: 'right',
                  }}
                >
                  {formatNumber(item.quantity * item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div
          style={{
            marginLeft: 'auto',
            width: '300px',
            borderTop: '2px solid #e5e7eb',
            paddingTop: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              fontSize: '14px',
            }}
          >
            <span style={{ color: '#6b7280' }}>{t('preview.subtotal')}</span>
            <span style={{ color: '#1f2937', fontWeight: 600 }}>
              {formatNumber(totals.subtotal)} {invoice.currency}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              fontSize: '14px',
            }}
          >
            <span style={{ color: '#6b7280' }}>{t('preview.tax', { rate: invoice.taxRate })}</span>
            <span style={{ color: '#1f2937', fontWeight: 600 }}>
              {formatNumber(totals.taxAmount)} {invoice.currency}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '16px 0 8px',
              fontSize: '18px',
              fontWeight: 700,
              borderTop: '2px solid #1f2937',
              marginTop: '8px',
            }}
          >
            <span style={{ color: '#1f2937' }}>{t('preview.grandTotal')}</span>
            <span style={{ color: '#1f2937' }}>
              {formatNumber(totals.total)} {invoice.currency}
            </span>
          </div>
        </div>

        {/* Payment Terms */}
        <div
          style={{
            marginTop: '32px',
            padding: '16px',
            background: '#f9fafb',
            borderRadius: '6px',
          }}
        >
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '4px',
            }}
          >
            {t('preview.paymentTerms')}
          </h3>
          <p
            style={{
              color: '#1f2937',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {invoice.paymentTerms.description}
          </p>
        </div>

        {/* Bank Details */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '12px',
            }}
          >
            {t('preview.bankDetails')}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              fontSize: '14px',
            }}
          >
            <div>
              <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>
                {t('labels.bankName')}
              </div>
              <div style={{ color: '#1f2937', fontWeight: 600 }}>
                {invoice.bankDetails.bankName}
              </div>
            </div>
            <div>
              <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>
                {t('labels.accountNumber')}
              </div>
              <div style={{ color: '#1f2937', fontWeight: 600 }}>
                {invoice.bankDetails.accountNumber}
              </div>
            </div>
            <div>
              <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>
                {t('labels.swiftCode')}
              </div>
              <div style={{ color: '#1f2937', fontWeight: 600 }}>
                {invoice.bankDetails.swiftCode}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

InvoicePreview.displayName = 'InvoicePreview';
