import { ProfitCalculateSchemaType } from '@/lib/validations';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface AssistantFormProps {
  form: UseFormReturn<ProfitCalculateSchemaType>;
}

type FormFields = keyof ProfitCalculateSchemaType;

const assistantForm: { name: FormFields; label: string }[] = [
  { name: 'referralRate', label: 'احتمال معرفی (%)' },
  { name: 'referredCustomers', label: 'تعداد معرفی' },
  { name: 'discount', label: 'مقدار تخفیف (%)' },
];

export default function AssistantForm({ form }: AssistantFormProps) {
  return assistantForm.map((formField) => (
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
              type="number"
              className="focus-within:select-all"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ));
}
