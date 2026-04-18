import { ImageResponse } from "next/og";

function getSiteLabel() {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  if (!value) {
    return "Wedding invitation microsite";
  }

  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "Wedding invitation microsite";
  }
}

export const alt =
  "Preview card for Amara Okafor and Tunde Adeyemi's traditional wedding in Lagos";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  const siteLabel = getSiteLabel();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, #fffaf3 0%, #f9eddc 56%, #f4e3cc 100%)",
          color: "#38211a",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 14% 18%, rgba(210,166,80,0.24), transparent 24%), radial-gradient(circle at 88% 82%, rgba(182,99,64,0.18), transparent 26%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 48,
            display: "flex",
            background:
              "repeating-linear-gradient(90deg, rgba(127,59,40,0.96) 0 24px, rgba(210,166,80,0.98) 24px 44px, rgba(182,99,64,0.96) 44px 68px, rgba(215,135,93,0.92) 68px 92px)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            margin: "70px 68px",
            justifyContent: "space-between",
            borderRadius: 38,
            border: "1px solid rgba(127,59,40,0.14)",
            background:
              "linear-gradient(180deg, rgba(255,251,245,0.98), rgba(248,232,208,0.92))",
            boxShadow: "0 28px 80px rgba(76,36,25,0.14)",
            padding: "44px 52px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 18,
              borderRadius: 28,
              border: "1px dashed rgba(127,59,40,0.16)",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  height: 54,
                  width: 54,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                  border: "1px solid rgba(127,59,40,0.18)",
                  background:
                    "linear-gradient(180deg, rgba(255,250,243,0.98), rgba(248,234,212,0.92))",
                  color: "#7f3b28",
                  fontSize: 26,
                  fontFamily: "serif",
                }}
              >
                A
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  color: "#7f3b28",
                  letterSpacing: "0.18em",
                }}
              >
                &
              </div>
              <div
                style={{
                  display: "flex",
                  height: 54,
                  width: 54,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                  border: "1px solid rgba(127,59,40,0.18)",
                  background:
                    "linear-gradient(180deg, rgba(255,250,243,0.98), rgba(248,234,212,0.92))",
                  color: "#7f3b28",
                  fontSize: 26,
                  fontFamily: "serif",
                }}
              >
                T
              </div>
            </div>

            <div
              style={{
                display: "flex",
                borderRadius: 999,
                border: "1px solid rgba(127,59,40,0.12)",
                background: "rgba(255,255,255,0.76)",
                padding: "10px 18px",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#7f3b28",
              }}
            >
              Traditional wedding celebration
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "rgba(182,99,64,0.86)",
              }}
            >
              Lagos • August 9, 2026
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 102,
                lineHeight: 0.9,
                letterSpacing: "-0.05em",
                fontFamily: "serif",
                color: "#7f3b28",
              }}
            >
              Amara & Tunde
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                maxWidth: 860,
                fontSize: 28,
                lineHeight: 1.55,
                color: "rgba(56,33,26,0.8)",
              }}
            >
              Two lineages. One luminous Lagos afternoon of family, blessing,
              fabrics, music, and joy.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 12,
              }}
            >
              {["Balmoral Hall", "RSVP Open", "Asoebi Palette"].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    borderRadius: 999,
                    border: "1px solid rgba(127,59,40,0.12)",
                    background: "rgba(255,255,255,0.72)",
                    padding: "12px 18px",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(56,33,26,0.72)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(127,59,40,0.68)",
                }}
              >
                Igbo warmth meets Yoruba elegance
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 8,
                  fontSize: 22,
                  fontFamily: "serif",
                  color: "#b66340",
                }}
              >
                {siteLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
