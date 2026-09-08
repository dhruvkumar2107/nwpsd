const stats = [
  { value: "150+", label: "Institutions Served" },
  { value: "40+", label: "Countries Reached" },
  { value: "95%", label: "Client Retention" },
  { value: "₹200Cr+", label: "Revenue Impact" },
];

export function StatBand() {
  return (
    <section className="border-y border-surface-alt bg-surface py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-ink-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
