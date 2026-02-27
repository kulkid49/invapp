/**
 * Invoice Generator - Main Application
 * Clean, maintainable React component for invoice generation
 * With i18n support (English & German)
 */

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileCode, FileText, RotateCcw } from 'lucide-react';
import { useInvoice } from '@/hooks/useInvoice';
import { InvoiceForm } from '@/components/InvoiceForm';
import { InvoicePreview } from '@/components/InvoicePreview';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { exportToHTML, exportToPDF } from '@/lib/export';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const { t, i18n } = useTranslation();
  const { invoice, totals, ...actions } = useInvoice();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportHTML = () => {
    try {
      exportToHTML(invoice, totals, i18n.language);
      toast.success(t('toast.htmlExported'));
    } catch (error) {
      toast.error(t('toast.exportError'));
      console.error(error);
    }
  };

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    
    try {
      await exportToPDF(previewRef.current, invoice);
      toast.success(t('toast.pdfExported'));
    } catch (error) {
      toast.error(t('toast.exportError'));
      console.error(error);
    }
  };

  const handleReset = () => {
    if (confirm(t('toast.confirmReset'))) {
      actions.resetInvoice();
      toast.info(t('toast.invoiceReset'));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t('app.title')}</h1>
              <p className="text-muted-foreground mt-1">
                {t('app.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                {t('actions.reset')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('sections.invoiceDetails')}</CardTitle>
              </CardHeader>
              <CardContent>
                <InvoiceForm invoice={invoice} actions={actions} />
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg">
                  {t('preview.title')} ({t(`templates.${invoice.template}`)})
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportHTML}
                    className="gap-2"
                  >
                    <FileCode className="h-4 w-4" />
                    {t('actions.exportHTML')}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleExportPDF}
                    className="gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    {t('actions.exportPDF')}
                  </Button>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-6 bg-muted/30">
                <InvoicePreview
                  ref={previewRef}
                  invoice={invoice}
                  totals={totals}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>{t('app.footer')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
