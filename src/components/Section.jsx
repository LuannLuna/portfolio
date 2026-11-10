export default function Section({ id, number, eyebrow, title, lede, children }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-rule">
      <div className="container-grid py-20 lg:py-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 lg:col-span-3">
            <p className="eyebrow">
              {number && (
                <>
                  <span className="text-signal">{number}</span>
                  <span className="mx-2 text-rule">/</span>
                </>
              )}
              {eyebrow}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <h2 className="display max-w-4xl text-balance text-[clamp(2.5rem,5.2vw,5.5rem)] leading-[0.94]">
              {title}
            </h2>
            {lede && (
              <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-[1.65] text-muted">
                {lede}
              </p>
            )}
          </div>
        </div>

        <div className="mt-14 lg:mt-20">{children}</div>
      </div>
    </section>
  )
}
