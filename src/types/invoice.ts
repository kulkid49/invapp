/**
 * Invoice Generator - Type Definitions
 * Clean, maintainable TypeScript interfaces for the invoice system
 */

// Unit of measurement for line items
export type UnitType = 'PC' | 'ST' | 'EA' | 'KG' | 'M' | 'L' | 'HR' | 'BOX';

// Invoice template types
export type InvoiceTemplate = 'classic' | 'modern' | 'minimal';

// Currency options
export type CurrencyCode = 'EUR' | 'USD' | 'GBP' | 'CHF';

// Line item structure
export interface LineItem {
  id: string;
  materialNo: string;
  description: string;
  quantity: number;
  unit: UnitType;
  price: number;
}

// Bank details structure
export interface BankDetails {
  bankName: string;
  accountNumber: string;
  swiftCode: string;
}

// Company information
export interface CompanyInfo {
  name: string;
  vatNumber: string;
  address: string;
}

// Customer information
export interface CustomerInfo {
  companyName: string;
  address: string;
}

// Payment terms
export interface PaymentTerms {
  description: string;
  days: number;
}

// Complete invoice data structure
export interface InvoiceData {
  // Template
  template: InvoiceTemplate;
  
  // Vendor/Company
  vendor: CompanyInfo;
  
  // Invoice details
  invoiceNumber: string;
  invoiceDate: string;
  referencePO: string;
  currency: CurrencyCode;
  taxRate: number;
  
  // Customer
  customer: CustomerInfo;
  
  // Line items
  lineItems: LineItem[];
  
  // Bank details
  bankDetails: BankDetails;
  
  // Payment terms
  paymentTerms: PaymentTerms;
}

// Calculated totals
export interface InvoiceTotals {
  subtotal: number;
  taxAmount: number;
  total: number;
}

// Export options
export interface ExportOptions {
  filename?: string;
  includeLogo?: boolean;
}

// Default values
export const DEFAULT_VENDOR_VAT = 'DE1234567890';
export const GERMAN_VENDOR_ADDRESSES = [
  'Musterstraße 45, Berlin, Germany, 10115',
  'Königsallee 12, Düsseldorf, Germany, 40212',
  'Schwanthalerstraße 23, München, Germany, 80336',
  'Lange Reihe 67, Hamburg, Germany, 20099',
  'Taunusanlage 8, Frankfurt am Main, Germany, 60329',
];
export const DEFAULT_PAYMENT_TERMS: PaymentTerms = {
  description: 'Net 30 Days from Invoice Date',
  days: 30
};
export const DEFAULT_CURRENCY: CurrencyCode = 'EUR';
export const DEFAULT_TAX_RATE = 19;
export const DEFAULT_UNIT: UnitType = 'PC';

// Unit options for dropdown
export const UNIT_OPTIONS: { value: UnitType; label: string }[] = [
  { value: 'PC', label: 'PC (Piece)' },
  { value: 'ST', label: 'ST (Stück)' },
  { value: 'EA', label: 'EA (Each)' },
  { value: 'KG', label: 'KG (Kilogram)' },
  { value: 'M', label: 'M (Meter)' },
  { value: 'L', label: 'L (Liter)' },
  { value: 'HR', label: 'HR (Hour)' },
  { value: 'BOX', label: 'BOX (Box)' },
];

// Currency options
export const CURRENCY_OPTIONS: { value: CurrencyCode; label: string; symbol: string }[] = [
  { value: 'EUR', label: 'EUR (Euro)', symbol: '€' },
  { value: 'USD', label: 'USD (US Dollar)', symbol: '$' },
  { value: 'GBP', label: 'GBP (British Pound)', symbol: '£' },
  { value: 'CHF', label: 'CHF (Swiss Franc)', symbol: 'CHF' },
];

// Template options
export const TEMPLATE_OPTIONS: { value: InvoiceTemplate; label: string; description: string }[] = [
  { value: 'classic', label: 'Classic', description: 'Traditional invoice layout with clean lines' },
  { value: 'modern', label: 'Modern', description: 'Contemporary design with enhanced visuals' },
  { value: 'minimal', label: 'Minimal', description: 'Clean and simple minimal design' },
];
