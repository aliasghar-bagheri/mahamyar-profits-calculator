import z from 'zod';

const profitCalculateSchema = z.object({
  customers: z.number().or(
    z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: 'لطفا یک مقدار عددی وارد کنید',
      })
      .transform((value) => parseFloat(value.replace(/,/g, '')))
  ),
  referrals: z.number().or(
    z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: 'لطفا یک مقدار عددی وارد کنید',
      })
      .transform((value) => parseFloat(value.replace(/,/g, '')))
  ),
  avgPurchase: z.number().or(
    z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: 'لطفا یک مقدار عددی وارد کنید',
      })
      .transform((value) => parseFloat(value.replace(/,/g, '')))
  ),
  referralRate: z.coerce.number().min(0).max(100, 'درصد معرفی باید بین 0 تا 100 باشد'),
  referredCustomers: z.coerce.number().min(0, 'تعداد معرفی نمیتواند منفی باشد'),
  discount: z.coerce.number().min(0).max(100, 'درصد تخفیف باید بین 0 تا 100 باشد'),
});

type ProfitCalculateSchemaType = z.infer<typeof profitCalculateSchema>;

export { type ProfitCalculateSchemaType, profitCalculateSchema };
