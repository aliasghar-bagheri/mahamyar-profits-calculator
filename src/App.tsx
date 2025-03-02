import ProfitCalculatorForm from './components/forms/ProfitCalculatorForm';

export default function App() {
  return (
    <div className="h-screen py-10 px-4 md:px-10 flex flex-col gap-y-10 items-center justify-center">
      <a href="https://mahamyar.com/">
        <img
          src="/images/mahamyar.png"
          alt="مهامیار"
        />
      </a>

      <ProfitCalculatorForm />
    </div>
  );
}
