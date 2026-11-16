import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/portfolio";

export const metadata = {
  title: "Projects Archive — Badrinath M H",
  description:
    "Explore 9 production & freelance client projects built by Badrinath M H — Olive & Sikes, Saneedhan Homes, Sakthi Classifieds, Hanvith Jobs, ERP & CRM, RK Engineering Works, SV Logistics, Yuva Cargo Movers, and Thirumoolar Gurupeedam.",
};

function ProjectMockupLarge({ color, type }) {
  if (type === "chart") {
    return (
      <div className="project-mockup" style={{ width: "90%", height: "80%" }}>
        <div className="project-mockup-toolbar">
          <span className="mockup-dot"></span>
          <span className="mockup-dot"></span>
          <span className="mockup-dot"></span>
        </div>
        <div className="project-mockup-content">
          <div className="mockup-line short" style={{ backgroundColor: `${color}33` }}></div>
          <div className="mockup-line medium" style={{ backgroundColor: `${color}22` }}></div>
          <div className="mockup-chart">
            {[55, 40, 85, 45, 75, 95, 50, 80, 60, 70].map((h, i) => (
              <div
                key={i}
                className="chart-bar"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(180deg, ${color} 0%, ${color}44 100%)`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "grid") {
    return (
      <div className="project-mockup" style={{ width: "90%", height: "80%" }}>
        <div className="project-mockup-toolbar">
          <span className="mockup-dot"></span>
          <span className="mockup-dot"></span>
          <span className="mockup-dot"></span>
        </div>
        <div
          className="project-mockup-content"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                borderRadius: "6px",
                background: `${color}${15 + i * 4}`,
                border: `1px solid ${color}22`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Default: lines mockup
  return (
    <div className="project-mockup" style={{ width: "90%", height: "80%" }}>
      <div className="project-mockup-toolbar">
        <span className="mockup-dot"></span>
        <span className="mockup-dot"></span>
        <span className="mockup-dot"></span>
      </div>
      <div className="project-mockup-content">
        <div className="mockup-line long" style={{ backgroundColor: `${color}33` }}></div>
        <div className="mockup-line medium" style={{ backgroundColor: `${color}22` }}></div>
        <div className="mockup-line short" style={{ backgroundColor: `${color}18` }}></div>
        <div style={{ flex: 1, display: "flex", gap: "8px", marginTop: "8px" }}>
          <div
            style={{
              flex: 1,
              borderRadius: "6px",
              background: `${color}15`,
              border: `1px solid ${color}18`,
            }}
          ></div>
          <div
            style={{
              flex: 1,
              borderRadius: "6px",
              background: `${color}10`,
              border: `1px solid ${color}15`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

const mockupTypes = ["chart", "grid", "lines", "chart", "lines", "grid"];

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          <div className="projects-page-header">
            <Link href="/" className="back-link">
              <span className="back-arrow">←</span> Back to Home
            </Link>
            <h1 className="projects-page-title">All Projects</h1>
            <p className="projects-page-subtitle">
              A comprehensive look at the products I&apos;ve designed and built — from concept
              to deployment. Each project represents a unique challenge and a thoughtful
              solution.
            </p>
          </div>

          <div className="projects-page-grid">
            {projects.map((project, index) => (
              <div
                key={project.id}
                id={project.id}
                className="project-detail-card"
              >
                <div
                  className={`project-detail-layout ${
                    index % 2 !== 0 ? "reverse" : ""
                  }`}
                >
                  <div className="project-detail-content">
                    <div className="project-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span className="dot" style={{ backgroundColor: project.color }}></span>
                        <span>{project.category}</span>
                        {project.type && (
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "4px",
                              background:
                                project.type === "Production"
                                  ? "rgba(59, 130, 246, 0.15)"
                                  : "rgba(16, 185, 129, 0.15)",
                              color:
                                project.type === "Production"
                                  ? "var(--accent-blue, #3b82f6)"
                                  : "var(--accent-green, #10b981)",
                              border: `1px solid ${
                                project.type === "Production"
                                  ? "rgba(59, 130, 246, 0.3)"
                                  : "rgba(16, 185, 129, 0.3)"
                              }`,
                            }}
                          >
                            {project.type === "Production" ? "Production Platform" : "Freelance Project"}
                          </span>
                        )}
                      </span>
                      {project.period && (
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent-cyan)" }}>
                          {project.period}
                        </span>
                      )}
                    </div>
                    <h2 className="project-name">{project.name}</h2>
                    {project.impact && (
                      <div style={{ display: "inline-block", fontSize: "0.8rem", color: "var(--accent-green)", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.25)", padding: "3px 10px", borderRadius: "999px", marginBottom: "8px", fontWeight: "500" }}>
                        ★ {project.impact}
                      </div>
                    )}
                    <p className="project-desc">{project.description}</p>

                    <ul className="project-detail-features">
                      {project.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-links">
                      {project.links.demo &&
                      project.links.demo.startsWith("http") &&
                      !project.links.demo.includes("github.com") ? (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          style={{
                            fontWeight: 700,
                            color: "var(--accent-cyan, #06b6d4)",
                            borderColor: "rgba(6, 182, 212, 0.4)",
                            background: "rgba(6, 182, 212, 0.08)",
                          }}
                        >
                          Live Website <span className="link-arrow">↗</span>
                        </a>
                      ) : null}

                      {project.links.github && project.links.github !== "#" ? (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          GitHub Profile <span className="link-arrow">↗</span>
                        </a>
                      ) : null}

                      {project.type === "Production" && (
                        <span
                          className="project-link"
                          style={{
                            opacity: 0.75,
                            cursor: "default",
                            fontSize: "0.8rem",
                            pointerEvents: "none",
                          }}
                        >
                          Role-Based Production Platform
                        </span>
                      )}

                      {project.tags.includes("Desktop Software") && (
                        <span
                          className="project-link"
                          style={{
                            opacity: 0.75,
                            cursor: "default",
                            fontSize: "0.8rem",
                            pointerEvents: "none",
                          }}
                        >
                          Offline Desktop Application
                        </span>
                      )}

                      {project.tags.includes("Etsy API") && (
                        <span
                          className="project-link"
                          style={{
                            opacity: 0.75,
                            cursor: "default",
                            fontSize: "0.8rem",
                            pointerEvents: "none",
                          }}
                        >
                          Cross-Platform API Automation
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="project-detail-image">
                    <ProjectMockupLarge
                      color={project.color}
                      type={mockupTypes[index % mockupTypes.length]}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
