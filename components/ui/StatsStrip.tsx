import CountUp from "@/components/motion/CountUp";
import GrowLine from "@/components/motion/GrowLine";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";

export type Stat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  /** Count from this value instead of 0 (e.g. a year counts from value - 18). */
  startFrom?: number;
  decimals?: number;
  /** Thousands separators (off for years). Default true. */
  grouping?: boolean;
};

/**
 * White bordered strip of up to 4 stats (server component). The stats reveal
 * one after another and each number counts up once, via components/motion.
 */
export default function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <Stagger
      as="ul"
      className="grid grid-cols-2 overflow-hidden rounded-2xl border border-navy/10 bg-white text-center lg:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <StaggerItem
          as="li"
          key={stat.label}
          className={`border-navy/10 px-4 py-8 sm:px-6 sm:py-10 ${i % 2 ? "border-s" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-s" : ""}`}
        >
          <p className="flex items-baseline justify-center gap-1.5 text-4xl font-semibold text-navy md:text-5xl">
            <CountUp
              value={stat.value}
              from={stat.startFrom}
              prefix={stat.prefix}
              prefixClassName="text-red"
              decimals={stat.decimals}
              grouping={stat.grouping}
            />
            {stat.suffix && (
              <span className="text-2xl text-red md:text-3xl">
                {stat.suffix}
              </span>
            )}
          </p>
          <GrowLine className="mx-auto mt-3 block h-0.5 w-10 origin-center rounded-full bg-red" />
          <p className="mt-3 text-sm text-navy/60 sm:text-base">{stat.label}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
