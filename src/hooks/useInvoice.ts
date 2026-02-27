/**
 * Invoice Generator - State Management Hook
 * Clean, maintainable hook for managing invoice state
 */

import { useState, useCallback, useMemo } from 'react';
import type {
  InvoiceData,
  InvoiceTotals,
  LineItem,
  PaymentTerms,
  InvoiceTemplate,
  CurrencyCode,
} from '@/types/invoice';
import {
  DEFAULT_VENDOR_VAT,
  DEFAULT_PAYMENT_TERMS,
  DEFAULT_CURRENCY,
  DEFAULT_TAX_RATE,
  DEFAULT_UNIT,
} from '@/types/invoice';

// Generate unique ID for line items
const generateId = (): string => {
  return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Generate invoice number based on date
const generateInvoiceNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const nextYear = (now.getFullYear() + 1).toString().slice(-2);
  const random = Math.floor(Math.random() * 900) + 100;
  return `INV-${year}${nextYear}-${random}`;
};

// Get today's date in YYYY-MM-DD format
const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Create empty line item
const createEmptyLineItem = (): LineItem => ({
  id: generateId(),
  materialNo: '',
  description: '',
  quantity: 1,
  unit: DEFAULT_UNIT,
  price: 0,
});

// Initial invoice state
const createInitialInvoice = (): InvoiceData => ({
  template: 'classic',
  vendor: {
    name: 'Component Suppliers S.A.',
    vatNumber: DEFAULT_VENDOR_VAT,
  },
  invoiceNumber: generateInvoiceNumber(),
  invoiceDate: getTodayDate(),
  referencePO: '4500000297',
  currency: DEFAULT_CURRENCY,
  taxRate: DEFAULT_TAX_RATE,
  customer: {
    companyName: 'Munich Production GmbH',
    address: 'Industriestraße 12, München, Germany, 80331',
  },
  lineItems: [
    {
      id: generateId(),
      materialNo: '473',
      description: 'Electronic Component X',
      quantity: 10,
      unit: 'PC',
      price: 50.00,
    },
    {
      id: generateId(),
      materialNo: '475',
      description: 'Copper Oxide',
      quantity: 10,
      unit: 'PC',
      price: 10.00,
    },
  ],
  bankDetails: {
    bankName: 'Sample Bank',
    accountNumber: '9988776655',
    swiftCode: 'SAMPLE01',
  },
  paymentTerms: DEFAULT_PAYMENT_TERMS,
});

export interface UseInvoiceReturn {
  // State
  invoice: InvoiceData;
  totals: InvoiceTotals;
  
  // Actions - Template
  setTemplate: (template: InvoiceTemplate) => void;
  
  // Actions - Vendor
  setVendorName: (name: string) => void;
  setVendorVatNumber: (vatNumber: string) => void;
  
  // Actions - Invoice Details
  setInvoiceNumber: (number: string) => void;
  setInvoiceDate: (date: string) => void;
  setReferencePO: (po: string) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setTaxRate: (rate: number) => void;
  
  // Actions - Customer
  setCustomerCompanyName: (name: string) => void;
  setCustomerAddress: (address: string) => void;
  
  // Actions - Line Items
  addLineItem: () => void;
  updateLineItem: (id: string, updates: Partial<LineItem>) => void;
  removeLineItem: (id: string) => void;
  
  // Actions - Bank Details
  setBankName: (name: string) => void;
  setAccountNumber: (account: string) => void;
  setSwiftCode: (swift: string) => void;
  
  // Actions - Payment Terms
  setPaymentTerms: (terms: PaymentTerms) => void;
  
  // Actions - Reset
  resetInvoice: () => void;
  regenerateInvoiceNumber: () => void;
}

export const useInvoice = (): UseInvoiceReturn => {
  const [invoice, setInvoice] = useState<InvoiceData>(createInitialInvoice());

  // Calculate totals
  const totals = useMemo<InvoiceTotals>(() => {
    const subtotal = invoice.lineItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const taxAmount = subtotal * (invoice.taxRate / 100);
    const total = subtotal + taxAmount;
    
    return {
      subtotal: Math.round(subtotal * 100) / 100,
      taxAmount: Math.round(taxAmount * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  }, [invoice.lineItems, invoice.taxRate]);

  // Template actions
  const setTemplate = useCallback((template: InvoiceTemplate) => {
    setInvoice((prev) => ({ ...prev, template }));
  }, []);

  // Vendor actions
  const setVendorName = useCallback((name: string) => {
    setInvoice((prev) => ({ ...prev, vendor: { ...prev.vendor, name } }));
  }, []);

  const setVendorVatNumber = useCallback((vatNumber: string) => {
    setInvoice((prev) => ({ ...prev, vendor: { ...prev.vendor, vatNumber } }));
  }, []);

  // Invoice details actions
  const setInvoiceNumber = useCallback((invoiceNumber: string) => {
    setInvoice((prev) => ({ ...prev, invoiceNumber }));
  }, []);

  const setInvoiceDate = useCallback((invoiceDate: string) => {
    setInvoice((prev) => ({ ...prev, invoiceDate }));
  }, []);

  const setReferencePO = useCallback((referencePO: string) => {
    setInvoice((prev) => ({ ...prev, referencePO }));
  }, []);

  const setCurrency = useCallback((currency: CurrencyCode) => {
    setInvoice((prev) => ({ ...prev, currency }));
  }, []);

  const setTaxRate = useCallback((taxRate: number) => {
    setInvoice((prev) => ({ ...prev, taxRate }));
  }, []);

  // Customer actions
  const setCustomerCompanyName = useCallback((companyName: string) => {
    setInvoice((prev) => ({ ...prev, customer: { ...prev.customer, companyName } }));
  }, []);

  const setCustomerAddress = useCallback((address: string) => {
    setInvoice((prev) => ({ ...prev, customer: { ...prev.customer, address } }));
  }, []);

  // Line item actions
  const addLineItem = useCallback(() => {
    setInvoice((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, createEmptyLineItem()],
    }));
  }, []);

  const updateLineItem = useCallback((id: string, updates: Partial<LineItem>) => {
    setInvoice((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  }, []);

  const removeLineItem = useCallback((id: string) => {
    setInvoice((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((item) => item.id !== id),
    }));
  }, []);

  // Bank details actions
  const setBankName = useCallback((bankName: string) => {
    setInvoice((prev) => ({ ...prev, bankDetails: { ...prev.bankDetails, bankName } }));
  }, []);

  const setAccountNumber = useCallback((accountNumber: string) => {
    setInvoice((prev) => ({ ...prev, bankDetails: { ...prev.bankDetails, accountNumber } }));
  }, []);

  const setSwiftCode = useCallback((swiftCode: string) => {
    setInvoice((prev) => ({ ...prev, bankDetails: { ...prev.bankDetails, swiftCode } }));
  }, []);

  // Payment terms actions
  const setPaymentTerms = useCallback((paymentTerms: PaymentTerms) => {
    setInvoice((prev) => ({ ...prev, paymentTerms }));
  }, []);

  // Reset actions
  const resetInvoice = useCallback(() => {
    setInvoice(createInitialInvoice());
  }, []);

  const regenerateInvoiceNumber = useCallback(() => {
    setInvoiceNumber(generateInvoiceNumber());
  }, [setInvoiceNumber]);

  return {
    invoice,
    totals,
    setTemplate,
    setVendorName,
    setVendorVatNumber,
    setInvoiceNumber,
    setInvoiceDate,
    setReferencePO,
    setCurrency,
    setTaxRate,
    setCustomerCompanyName,
    setCustomerAddress,
    addLineItem,
    updateLineItem,
    removeLineItem,
    setBankName,
    setAccountNumber,
    setSwiftCode,
    setPaymentTerms,
    resetInvoice,
    regenerateInvoiceNumber,
  };
};
