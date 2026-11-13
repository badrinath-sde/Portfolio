import { personalInfo } from "@/data/portfolio";

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-content">
          <h2 className="section-title">
            Have a project or open role? Let&apos;s talk.
          </h2>

          <p className="contact-text">
            I&apos;m open to full-time Software Developer roles, high-impact MERN stack engineering,
            and freelance enterprise / web applications. Based in {personalInfo.location}.
          </p>

          <div className="contact-links" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-md)", marginTop: "var(--space-xl)" }}>
            <a
              href={`mailto:${personalInfo.email}`}
              className="contact-link primary"
              id="contact-email"
            >
              ✉ {personalInfo.email}
            </a>
            <a
              href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
              className="contact-link"
              id="contact-phone"
            >
              📞 {personalInfo.phone}
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              id="contact-github"
            >
              GitHub ↗
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              id="contact-linkedin"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
