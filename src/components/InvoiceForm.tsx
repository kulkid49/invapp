/**
 * Invoice Generator - Invoice Form Component
 * Form section for editing invoice details with i18n support
 */

import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Plus, RefreshCw } from 'lucide-react';
import type { UseInvoiceReturn } from '@/hooks/useInvoice';
import {
  UNIT_OPTIONS,
  CURRENCY_OPTIONS,
  TEMPLATE_OPTIONS,
} from '@/types/invoice';

interface InvoiceFormProps {
  invoice: UseInvoiceReturn['invoice'];
  actions: Omit<UseInvoiceReturn, 'invoice' | 'totals'>;
}

export const InvoiceForm = ({ invoice, actions }: InvoiceFormProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="space-y-2">
        <Label htmlFor="template">{t('labels.template')}</Label>
        <Select
          value={invoice.template}
          onValueChange={actions.setTemplate}
        >
          <SelectTrigger id="template">
            <SelectValue placeholder={t('labels.template')} />
          </SelectTrigger>
          <SelectContent>
            {TEMPLATE_OPTIONS.map((template) => (
              <SelectItem key={template.value} value={template.value}>
                <div className="flex flex-col">
                  <span>{t(`templates.${template.value}`)}</span>
                  <span className="text-xs text-muted-foreground">
                    {t(`templates.${template.value}Description`)}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Vendor Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t('sections.vendorInfo')}
        </h3>
        <div className="space-y-2">
          <Label htmlFor="vendorName">{t('labels.vendorName')}</Label>
          <Input
            id="vendorName"
            value={invoice.vendor.name}
            onChange={(e) => actions.setVendorName(e.target.value)}
            placeholder={t('labels.vendorName')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vatNumber">{t('labels.vatNumber')}</Label>
          <Input
            id="vatNumber"
            value={invoice.vendor.vatNumber}
            onChange={(e) => actions.setVendorVatNumber(e.target.value)}
            placeholder={t('labels.vatNumber')}
          />
        </div>
      </div>

      {/* Invoice Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t('sections.invoiceDetails')}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceNumber">{t('labels.invoiceNumber')}</Label>
            <div className="flex gap-2">
              <Input
                id="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={(e) => actions.setInvoiceNumber(e.target.value)}
                placeholder="INV-XXXX-XXX"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={actions.regenerateInvoiceNumber}
                title={t('actions.generateNewNumber')}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoiceDate">{t('labels.invoiceDate')}</Label>
            <Input
              id="invoiceDate"
              type="date"
              value={invoice.invoiceDate}
              onChange={(e) => actions.setInvoiceDate(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="referencePO">{t('labels.referencePO')}</Label>
            <Input
              id="referencePO"
              value={invoice.referencePO}
              onChange={(e) => actions.setReferencePO(e.target.value)}
              placeholder={t('labels.referencePO')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">{t('labels.currency')}</Label>
            <Select
              value={invoice.currency}
              onValueChange={actions.setCurrency}
            >
              <SelectTrigger id="currency">
                <SelectValue placeholder={t('labels.currency')} />
              </SelectTrigger>
              <SelectContent>
                {CURRENCY_OPTIONS.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {t(`currencies.${currency.value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="taxRate">{t('labels.taxRate')}</Label>
          <Input
            id="taxRate"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={invoice.taxRate}
            onChange={(e) => actions.setTaxRate(parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t('sections.customerInfo')}
        </h3>
        <div className="space-y-2">
          <Label htmlFor="customerName">{t('labels.customerName')}</Label>
          <Input
            id="customerName"
            value={invoice.customer.companyName}
            onChange={(e) => actions.setCustomerCompanyName(e.target.value)}
            placeholder={t('labels.customerName')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerAddress">{t('labels.customerAddress')}</Label>
          <Input
            id="customerAddress"
            value={invoice.customer.address}
            onChange={(e) => actions.setCustomerAddress(e.target.value)}
            placeholder="Street, City, Country, ZIP"
          />
        </div>
      </div>

      {/* Line Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {t('sections.lineItems')}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={actions.addLineItem}
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            {t('actions.addItem')}
          </Button>
        </div>
        <div className="space-y-3">
          {invoice.lineItems.map((item, index) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg bg-muted/30 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {t('labels.materialNo')} #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => actions.removeLineItem(item.id)}
                  disabled={invoice.lineItems.length <= 1}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">{t('labels.materialNo')}</Label>
                  <Input
                    value={item.materialNo}
                    onChange={(e) =>
                      actions.updateLineItem(item.id, { materialNo: e.target.value })
                    }
                    placeholder="#"
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('labels.description')}</Label>
                  <Input
                    value={item.description}
                    onChange={(e) =>
                      actions.updateLineItem(item.id, { description: e.target.value })
                    }
                    placeholder={t('labels.description')}
                    className="h-9"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">{t('labels.quantity')}</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      actions.updateLineItem(item.id, {
                        quantity: parseInt(e.target.value) || 1,
                      })
                    }
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('labels.unit')}</Label>
                  <Select
                    value={item.unit}
                    onValueChange={(value) =>
                      actions.updateLineItem(item.id, { unit: value as typeof item.unit })
                    }
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {UNIT_OPTIONS.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {t(`units.${unit.value}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('labels.price')}</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) =>
                      actions.updateLineItem(item.id, {
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{t('labels.lineTotal')}</Label>
                  <div className="h-9 flex items-center px-3 bg-muted rounded-md text-sm font-medium">
                    {(item.quantity * item.price).toFixed(2)} {invoice.currency}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t('sections.bankDetails')}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bankName">{t('labels.bankName')}</Label>
            <Input
              id="bankName"
              value={invoice.bankDetails.bankName}
              onChange={(e) => actions.setBankName(e.target.value)}
              placeholder={t('labels.bankName')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">{t('labels.accountNumber')}</Label>
            <Input
              id="accountNumber"
              value={invoice.bankDetails.accountNumber}
              onChange={(e) => actions.setAccountNumber(e.target.value)}
              placeholder={t('labels.accountNumber')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="swiftCode">{t('labels.swiftCode')}</Label>
            <Input
              id="swiftCode"
              value={invoice.bankDetails.swiftCode}
              onChange={(e) => actions.setSwiftCode(e.target.value)}
              placeholder={t('labels.swiftCode')}
            />
          </div>
        </div>
      </div>

      {/* Payment Terms */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t('sections.paymentTerms')}
        </h3>
        <div className="space-y-2">
          <Label htmlFor="paymentTerms">{t('labels.termsDescription')}</Label>
          <Input
            id="paymentTerms"
            value={invoice.paymentTerms.description}
            onChange={(e) =>
              actions.setPaymentTerms({
                ...invoice.paymentTerms,
                description: e.target.value,
              })
            }
            placeholder={t('labels.termsDescription')}
          />
        </div>
      </div>
    </div>
  );
};
