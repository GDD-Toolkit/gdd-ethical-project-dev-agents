import{ useState, useEffect} from "react";

interface FunFactProps {
  facts: string[];
  interval?: number;
  fade?: number;
}

export function FunFactsRotator({ 
    facts, 
    interval = 6000,
    fade = 1000,
}: FunFactProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true)

    useEffect(() => {
        const showTime = Math.max(0, interval - fade);

        let fadeOutTimer: number;
        let swapTimer: number;

        const loop = () => {
        fadeOutTimer = window.setTimeout(() => {
            setVisible(false);
            swapTimer = window.setTimeout(() => {
            setIndex((p) => (p + 1) % facts.length);
            setVisible(true);
            loop();

            }, fade);
        }, showTime);
        };

        loop();
        return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(swapTimer);
        };
    }, [facts.length, interval, fade]);



  return (
    <div className="w-full text-center mt-4">
      <p
        className={[
          "text-sm text-muted-foreground",
          "motion-safe:transition-opacity  ease-in-out",
          visible ? "duration-600 opacity-100" : "duration-500 opacity-0",
          "motion-reduce:transition-none motion-reduce:opacity-100",
        ].join(" ")}
      >
        {facts[index]}
      </p>
    </div>
  );
}