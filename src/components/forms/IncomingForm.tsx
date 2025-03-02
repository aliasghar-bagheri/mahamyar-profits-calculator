import { ProfitCalculateSchemaType } from '@/lib/validations';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { formatNumberWithCommas } from '@/lib/utils';

interface IncomeFormProps {
  form: UseFormReturn<ProfitCalculateSchemaType>;
}

type FormFields = keyof ProfitCalculateSchemaType;

const IncomingFormFields: { name: FormFields; label: string }[] = [
  { name: 'customers', label: 'تعداد مشتری' },
  { name: 'referrals', label: 'تعداد مراجعه در سال' },
  { name: 'avgPurchase', label: 'میانگین قیمت خرید (تومان)' },
];

export default function IncomingForm({ form }: IncomeFormProps) {
  return IncomingFormFields.map((formField) => (
    <FormField
      key={formField.name}
      control={form.control}
      name={formField.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              inputMode="numeric"
              type="text"
              className="focus-within:select-all border-gray-200"
              value={formatNumberWithCommas(field.value.toString())}
              onChange={(e) => field.onChange(e.target.value.replace(/,/g, ''))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ));
}
