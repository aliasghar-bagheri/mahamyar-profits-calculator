import { Card, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { ProfitCalculateSchemaType, profitCalculateSchema } from '@/lib/validations';
import IncomingForm from './IncomingForm';
import AssistantForm from './AssistantForm';

export default function ProfitCalculatorForm() {
  const [netProfit, setNetProfit] = useState<number | null>(null);
  const [formStep, setFormStep] = useState(0);

  const form = useForm<ProfitCalculateSchemaType>({
    resolver: zodResolver(profitCalculateSchema),
    mode: 'onTouched',
    defaultValues: {
      customers: 0,
      referrals: 0,
      avgPurchase: 0,
      referralRate: 20,
      referredCustomers: 3,
      discount: 15,
    },
  });

  const incomeValue = form.watch('customers') * form.watch('avgPurchase') * form.watch('referrals');

  const profitPercentage = netProfit ? (netProfit / incomeValue) * 100 : 0;

  const onSubmit = (data: ProfitCalculateSchemaType) => {
    const { customers, referrals, avgPurchase, referralRate, referredCustomers, discount } = data;

    const totalRevenue = customers * avgPurchase * referrals;
    const prc = (referralRate / 100) * customers * referredCustomers * referrals;
    const bo = avgPurchase * ((100 - discount) / 100);

    const finalProfit = totalRevenue + prc * bo;

    if (finalProfit < 0) {
      toast.error('سود خالص نمیتواند منفی باشد');
      return;
    }

    setNetProfit(finalProfit);
  };

  const render = () => {
    switch (formStep) {
      case 0:
        return (
          <>
            <IncomingForm form={form} />
            <Button
              type="button"
              onClick={() => setFormStep(1)}
              className="col-span-full"
            >
              بعدی
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <p className="py-5 mx-auto">
              درآمد فعلی شما :
              <span className="underline">{Math.round(incomeValue).toLocaleString('fa-IR')}</span>
              تومان
            </p>
            <AssistantForm form={form} />
            <div className="col-span-full grid grid-cols-2 gap-2 sm:gap-5">
              <Button
                variant="outline"
                type="button"
                onClick={() => setFormStep(0)}
              >
                بازگشت
              </Button>
              <Button type="submit">محاسبه</Button>
            </div>
          </>
        );
    }
  };

  return (
    <Card className="max-w-lg w-full backdrop-blur-lg bg-gray-50/30">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-5 items-start"
          >
            {render()}
          </form>
        </Form>
        {netProfit !== null && (
          <>
            <p className="text-sm font-bold text-green-600 mt-5 text-center">
              سود خالص شما با مهامیار :{netProfit.toLocaleString('fa-IR')} تومان
            </p>
            <p className="text-sm font-bold text-green-600 mt-2 text-center">
              درصد رشد شما با ما : {profitPercentage.toFixed(0)} درصد
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
