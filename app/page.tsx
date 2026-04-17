import Image from "next/image";
import { CountdownTimer } from "@/components/countdown-timer";
import { Reveal } from "@/components/reveal";
import { RsvpButtons } from "@/components/rsvp-buttons";

const pageLinks = [
  { href: "#story", label: "Story" },
  { href: "#details", label: "Details" },
  { href: "#schedule", label: "Procession" },
  { href: "#invitation", label: "Invitation" },
  { href: "#gifts", label: "Gifts" },
  { href: "#gallery", label: "Gallery" },
] as const;

const ceremonySchedule = [
  {
    time: "12:00 PM",
    title: "Introduction",
    subtitle: "The room gathers itself.",
    description:
      "The two families are welcomed with grace, greetings, and the hush-before-joy that belongs to meaningful ceremonies.",
  },
  {
    time: "12:45 PM",
    title: "Knocking",
    subtitle: "The ask is made with honour.",
    description:
      "Tunde's family formally asks for Amara's hand, and what begins in dignity opens naturally into laughter and celebration.",
  },
  {
    time: "1:30 PM",
    title: "Bride Price",
    subtitle: "Tradition takes its place.",
    description:
      "Customs are observed in a way that respects both homes, carrying culture not as performance but as inheritance.",
  },
  {
    time: "3:00 PM",
    title: "Blessing",
    subtitle: "Words become covering.",
    description:
      "Parents, elders, and loved ones speak prayers, wisdom, and tenderness over the couple as they step into married life.",
  },
  {
    time: "4:30 PM",
    title: "Reception",
    subtitle: "Then the room turns to joy.",
    description:
      "Food arrives, music rises, fabrics glow, cameras chase smiles, and the dance floor becomes its own kind of blessing.",
  },
] as const;

const detailPanels = [
  {
    label: "Date",
    value: "Saturday, August 9th, 2026",
    note: "Please arrive a little early so you can settle in before the formal introduction begins.",
  },
  {
    label: "Time",
    value: "12:00 PM to 6:00 PM",
    note: "Ceremony at noon, celebration through the golden stretch of evening.",
  },
  {
    label: "Dress",
    value: "Ankara and traditional attire encouraged",
    note: "Come luminous: aso-oke, isi agu, gele, embroidery, colour, and festive elegance are all welcome.",
  },
  {
    label: "Parking",
    value: "On-site parking available",
    note: "Venue attendants will help direct arriving guests, and ride-share is also an easy option for later arrivals.",
  },
] as const;

const storyFragments = [
  {
    title: "First spark",
    description:
      "At a friend's art showcase in Surulere, they reached for the last plate of puff-puff at the exact same time.",
  },
  {
    title: "What stayed",
    description:
      "The banter turned into long Lagos drives, playlists, family stories, and the quiet ease of being deeply understood.",
  },
  {
    title: "What grew",
    description:
      "Not a loud love, but a steady one. Gentle, prayerful, joyful, and ready to be witnessed by everyone who shaped them.",
  },
] as const;

const giftIdeas = [
  {
    title: "Their first home",
    description:
      "For the curtains, bowls, candles, and beautiful little details that make a space feel lived in and loved.",
  },
  {
    title: "Rest after the drums",
    description:
      "A thoughtful contribution toward honeymoon quiet after a day full of music, colour, and family joy.",
  },
  {
    title: "Future hosting table",
    description:
      "For the future jollof nights, visiting cousins, Sunday rice, and generous meals they hope to share for years.",
  },
] as const;

const galleryMoments = [
  {
    title: "Arrival Looks",
    note: "Portraits of gele, coral, lace, agbada, and all the glorious entrance energy.",
    sizeClass: "sm:col-span-2",
  },
  {
    title: "Family Circle",
    note: "The hugs, greetings, and proud smiles that happen before the formal rites begin.",
    sizeClass: "",
  },
  {
    title: "Ceremony Glow",
    note: "Those exact moments when tradition, tenderness, and camera flashes meet in one frame.",
    sizeClass: "",
  },
  {
    title: "Dance Floor",
    note: "The kind of movement that makes wrappers sway and shoes forget their original job.",
    sizeClass: "sm:col-span-2 xl:col-span-1",
  },
  {
    title: "Golden Hour",
    note: "Soft light, fresh joy, and portraits that feel like memory even while they are happening.",
    sizeClass: "xl:col-span-2",
  },
] as const;

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div
      className={[
        "space-y-4",
        centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
      ].join(" ")}
    >
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="font-heading text-4xl leading-[0.96] text-terracotta-deep sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="text-base leading-8 text-ink/74 sm:text-lg">{description}</p>
    </div>
  );
}

function DetailPanel({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="detail-panel">
      <p className="section-eyebrow text-[10px]">{label}</p>
      <p className="mt-4 font-heading text-2xl leading-snug text-terracotta-deep">
        {value}
      </p>
      <p className="mt-3 text-sm leading-7 text-ink/72">{note}</p>
    </div>
  );
}

function StoryCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="story-fragment">
      <p className="section-eyebrow text-[10px]">{title}</p>
      <p className="mt-3 text-sm leading-7 text-ink/72">{description}</p>
    </div>
  );
}

function KeepsakeFrame({
  title,
  note,
  sizeClass,
}: {
  title: string;
  note: string;
  sizeClass?: string;
}) {
  return (
    <div className={["keepsake-frame", sizeClass].filter(Boolean).join(" ")}>
      <div className="keepsake-inner">
        <p className="section-eyebrow text-[10px]">Photos coming soon</p>
        <h3 className="mt-4 font-heading text-3xl text-terracotta-deep">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-7 text-ink/68">{note}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const leftLinks = pageLinks.slice(0, 3);
  const rightLinks = pageLinks.slice(3);

  return (
    <main className="relative overflow-x-hidden">
      <div className="site-backdrop" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-terracotta/10 bg-cream-soft/75 backdrop-blur-xl">
        <div className="section-shell grid items-center gap-3 py-4 md:grid-cols-[1fr_auto_1fr]">
          <nav className="hidden items-center gap-2 md:flex">
            {leftLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-pill">
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#top" className="mx-auto flex items-center gap-3 md:mx-0">
            <span className="crest-mark">A</span>
            <span className="font-heading text-2xl tracking-[0.2em] text-terracotta-deep">
              &amp;
            </span>
            <span className="crest-mark">T</span>
          </a>

          <nav className="hidden items-center justify-end gap-2 md:flex">
            {rightLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-pill">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section id="top" className="hero-stage">
        <div className="woven-band" aria-hidden="true" />
        <div className="section-shell relative grid gap-8 py-12 lg:grid-cols-[0.36fr_1fr_0.48fr] lg:items-stretch lg:py-18">
          <Reveal className="lg:pt-14">
            <aside className="hero-ledger">
              <p className="section-eyebrow">A union of homes</p>
              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-terracotta/70">
                    Bride
                  </p>
                  <p className="mt-2 font-heading text-3xl text-terracotta-deep">
                    Amara Okafor
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-terracotta/70">
                    Groom
                  </p>
                  <p className="mt-2 font-heading text-3xl text-terracotta-deep">
                    Tunde Adeyemi
                  </p>
                </div>
                <div className="ledger-divider" />
                <p className="text-sm leading-7 text-ink/72">
                  Igbo warmth meets Yoruba elegance in a day shaped by family,
                  blessing, colour, and the kind of music that keeps people in
                  the room longer than they planned.
                </p>
              </div>
            </aside>
          </Reveal>

          <Reveal delay={80}>
            <div className="hero-altar">
              <div className="altar-orbit" aria-hidden="true" />
              <p className="section-eyebrow">Traditional wedding celebration</p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.42em] text-terracotta/76">
                Saturday, August 9th, 2026
              </p>
              <h1 className="hero-title">
                Amara
                <span className="hero-ampersand">&amp;</span>
                Tunde
              </h1>
              <p className="hero-tagline">
                Two lineages. One Lagos afternoon. A room dressed in terracotta,
                gold, drums, prayer, dancing, and the soft astonishment of love
                arriving exactly on time.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="festival-chip">Balmoral Hall, Lagos</span>
                <span className="festival-chip">12:00 PM to 6:00 PM</span>
                <span className="festival-chip">Ankara and traditional attire</span>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#rsvp" className="hero-cta hero-cta-primary">
                  RSVP with warmth
                </a>
                <a href="#invitation" className="hero-cta hero-cta-secondary">
                  View invitation
                </a>
              </div>

              <div className="hero-procession">
                <span>Family</span>
                <span>Tradition</span>
                <span>Blessing</span>
                <span>Owambe</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <aside className="countdown-shrine">
              <div className="shrine-seal">
                <span>09</span>
                <small>Aug</small>
              </div>
              <p className="section-eyebrow">Ceremony countdown</p>
              <div className="mt-6">
                <CountdownTimer />
              </div>
              <div className="shrine-note">
                <p className="font-heading text-2xl text-terracotta-deep">
                  The room we are waiting for
                </p>
                <p className="mt-3 text-sm leading-7 text-ink/72">
                  One where aunties approve the fabrics, cousins chase camera
                  angles, and both families feel the joy of becoming one.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section id="story" className="section-padding">
        <div className="section-shell grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <Reveal>
            <div className="story-stage">
              <SectionHeading
                eyebrow="Our Story"
                title="Their beginning felt small. Their choosing did not."
                description="Amara and Tunde met at a friend's art showcase in Surulere, both reaching for the same final plate of puff-puff and laughing before either one let go. What followed was not a dramatic spark but a beautifully steady unfolding: long drives through Lagos traffic, voice notes that slipped past midnight, family stories traded over food, and the growing ease of two people realizing they felt most like themselves in each other's company."
              />
              <div className="story-ribbon">
                From first laughter to forever people
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {storyFragments.map((fragment, index) => (
              <Reveal key={fragment.title} delay={index * 70}>
                <StoryCard
                  title={fragment.title}
                  description={fragment.description}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="details" className="section-padding section-tint">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.78fr_1.08fr_0.62fr] lg:items-start">
          <Reveal>
            <div className="details-column">
              <SectionHeading
                eyebrow="Event Details"
                title="The practical things, dressed beautifully."
                description="Everything you need to arrive with ease and celebrate with your full heart."
              />
              <div className="mt-8 space-y-4">
                {detailPanels.slice(0, 2).map((panel, index) => (
                  <Reveal key={panel.label} delay={index * 50}>
                    <DetailPanel
                      label={panel.label}
                      value={panel.value}
                      note={panel.note}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="map-stage">
              <div className="map-frame">
                <iframe
                  title="Map to Balmoral Hall, Lagos"
                  src="https://www.google.com/maps?q=Balmoral+Hall+Lagos&output=embed"
                  loading="lazy"
                  className="h-[420px] w-full"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="section-eyebrow text-[10px]">Venue</p>
                  <p className="mt-2 font-heading text-3xl text-terracotta-deep">
                    Balmoral Hall
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink/72">
                    Lagos, Nigeria
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Balmoral+Hall+Lagos"
                  target="_blank"
                  rel="noreferrer"
                  className="hero-cta hero-cta-secondary"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            {detailPanels.slice(2).map((panel, index) => (
              <Reveal key={panel.label} delay={120 + index * 60}>
                <DetailPanel
                  label={panel.label}
                  value={panel.value}
                  note={panel.note}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="section-padding">
        <div className="section-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Ceremony Procession"
              title="The day moves like a ritual unfolding in five acts."
              description="Not just a timeline, but a sequence of meanings. Each moment opens the next."
              centered
            />
          </Reveal>

          <div className="procession-lane mt-14">
            {ceremonySchedule.map((item, index) => (
              <Reveal key={item.title} delay={index * 55}>
                <div
                  className={[
                    "procession-step",
                    index % 2 === 0 ? "lg:mr-20" : "lg:ml-20",
                  ].join(" ")}
                >
                  <div className="procession-time">{item.time}</div>
                  <div className="procession-card">
                    <p className="section-eyebrow text-[10px]">{item.subtitle}</p>
                    <h3 className="mt-3 font-heading text-3xl text-terracotta-deep">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-8 text-ink/72">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="invitation" className="section-padding section-tint">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="invitation-copy">
              <SectionHeading
                eyebrow="Digital Invitation"
                title="A keepsake card, staged like part of the celebration."
                description="Something you can save, share, or carry with you. More keepsake than attachment."
              />
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/amara-tunde-traditional-invitation.svg"
                  download="amara-tunde-traditional-wedding-invitation.svg"
                  className="hero-cta hero-cta-primary"
                >
                  Download invitation
                </a>
                <a href="#details" className="hero-cta hero-cta-secondary">
                  See details again
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="invitation-stage">
              <div className="invitation-plinth" aria-hidden="true" />
              <div className="invitation-frame">
                <Image
                  src="/amara-tunde-traditional-invitation.svg"
                  alt="Digital invitation card for Amara Okafor and Tunde Adeyemi's traditional wedding"
                  width={1200}
                  height={1600}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="rsvp" className="section-padding">
        <div className="section-shell">
          <Reveal>
            <div className="rsvp-envelope">
              <div>
                <p className="section-eyebrow text-cream-soft/72">RSVP</p>
                <h2 className="mt-4 font-heading text-4xl leading-[0.98] text-cream-soft sm:text-5xl">
                  However you answer, we receive it with warmth.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-cream-soft/82 sm:text-lg">
                  We would be delighted to celebrate with you in person. If life
                  moves differently, your love still reaches us, and we will feel
                  it.
                </p>
              </div>
              <div className="mt-8">
                <RsvpButtons />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="gifts" className="section-padding section-tint">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Gift and Registry"
              title="Presence first. Blessing always."
              description="Truly, celebrating with you is enough. If you would still like to give, these are thoughtful ways to do it."
            />
          </Reveal>

          <div className="grid gap-4">
            {giftIdeas.map((gift, index) => (
              <Reveal key={gift.title} delay={index * 70}>
                <div className="gift-ribbon">
                  <p className="section-eyebrow text-[10px]">Optional gift</p>
                  <div className="mt-3 grid gap-3 lg:grid-cols-[0.34fr_1fr] lg:items-start">
                    <h3 className="font-heading text-3xl text-terracotta-deep">
                      {gift.title}
                    </h3>
                    <p className="text-sm leading-7 text-ink/72">
                      {gift.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="section-padding">
        <div className="section-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Gallery"
              title="These frames are waiting for the day to arrive."
              description="Not blank boxes. Little keepsakes-in-waiting for fabrics, greetings, dances, and the glow that only a traditional wedding can carry."
              centered
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {galleryMoments.map((frame, index) => (
              <Reveal key={frame.title} delay={index * 45}>
                <KeepsakeFrame
                  title={frame.title}
                  note={frame.note}
                  sizeClass={frame.sizeClass}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer-stage">
        <div className="section-shell text-center">
          <div className="footer-band" aria-hidden="true" />
          <p className="font-heading text-4xl text-terracotta-deep sm:text-5xl">
            Amara Okafor &amp; Tunde Adeyemi
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-ink/72">
            &quot;Love is sweetest when it gathers blessing, family, and joy into
            one room.&quot;
          </p>
          <a
            href="mailto:hello@amaraandtunde.com"
            className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.26em] text-terracotta hover:text-terracotta-deep"
          >
            hello@amaraandtunde.com
          </a>
          <p className="mt-4 text-sm text-ink/62">Designed by Olufunbi Ibrahim</p>
        </div>
      </footer>
    </main>
  );
}
