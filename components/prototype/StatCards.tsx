export type Stat = {
  label: string;
  value: string;
  hint?: string;
};

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <dl className="flex flex-wrap gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="grow basis-36 border border-line rounded-xl p-4 flex flex-col gap-1">
          <dt className="text-xs text-muted">{stat.label}</dt>
          <dd className="font-serif text-2xl 2xl:text-3xl text-black leading-tight">{stat.value}</dd>
          {stat.hint && <dd className="text-xs text-muted">{stat.hint}</dd>}
        </div>
      ))}
    </dl>
  );
}
