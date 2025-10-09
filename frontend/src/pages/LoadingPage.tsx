import { FunFactsRotator } from "@/components/FunFact";
import LoadingIcon from "@/components/LoadingIcon";

const fun_facts = [
  "The UN estimates 1/3 of all food produced globally is wasted - enough to feed 2 billion people.",
  "Renewable energy now provides more jobs worldwide than fossil fuels.",
  "Recycling one aluminum can saves enough energy to power a laptop for three hours.",
  "Cities occupy just 3% of the Earth's land but generate over 70% of carbon emissions.",
  "More than 90% of people breathe air that fails WHO air-quality standards.",

  "Every dollar invested in resilient infrastructure can yield four dollars in economic benefit.",
  "Corruption costs the global economy over $2.6 trillion each year.",
  "Inclusive decision-making increases project success rates by up to 50%.",
  "Ethical business models often outperform traditional ones in long-term growth.",
  "Microfinance programs have helped lift over 100 million people out of poverty.",

  "For every extra year of schooling, average income rises by about 10%.",
  "Investing in girls' education could boost GDP growth rates by 1.5% annually.",
  "One in five people still lack access to electricity - limiting education and healthcare.",
  "Mental well-being programs in workplaces improve productivity by up to 12%.",
  "Countries with higher gender equality are more likely to achieve their climate goals.",

  "The SDGs are built on the principle of leaving no one behind.",
  "Partnerships (SDG 17) are often called the engine room' of the 2030 Agenda.",
  "Ethical foresight helps prevent unintended harm - it's the moral version of risk management.",
  "Local innovation drives most global sustainability progress - context always matters.",
  "The Ethical Business Canvas helps teams link every idea to a human or environmental outcome.",
];

export function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <LoadingIcon />
      <div className="mt-4 text-lg max-w-2xl">
        <FunFactsRotator facts={fun_facts} />
      </div>
    </div>
  );
}

export default LoadingPage;
