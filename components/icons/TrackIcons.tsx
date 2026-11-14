import React from "react";

export interface IconProps {
  className?: string;
  size?: number;
}

/* ─────────────────────────────────────────────────────────────
 * 1. Web Development — Modern Browser Frame with Code Tag </>
 * ──────────────────────────────────────────────────────────── */
export function WebDevIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="18" rx="3" fill="currentColor" fillOpacity="0.1" />
      <path d="M2 8h20" />
      <circle cx="5" cy="5.5" r="0.75" fill="currentColor" />
      <circle cx="8" cy="5.5" r="0.75" fill="currentColor" />
      <circle cx="11" cy="5.5" r="0.75" fill="currentColor" />
      <path d="m8.5 12-2.5 2.5 2.5 2.5" />
      <path d="m15.5 12 2.5 2.5-2.5 2.5" />
      <path d="m13 11.5-2 6" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 2. Mobile App Development — Native Smartphone with UI Grid
 * ──────────────────────────────────────────────────────────── */
export function MobileDevIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="3.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M10 5h4" />
      <rect x="8" y="8" width="3.5" height="3.5" rx="1" fill="currentColor" fillOpacity="0.25" />
      <rect x="12.5" y="8" width="3.5" height="3.5" rx="1" fill="currentColor" fillOpacity="0.25" />
      <rect x="8" y="12.5" width="8" height="3.5" rx="1" fill="currentColor" fillOpacity="0.2" />
      <circle cx="12" cy="19" r="0.8" fill="currentColor" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 3. Coding Languages — Multi-syntax Terminal { ; }
 * ──────────────────────────────────────────────────────────── */
export function LanguagesIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="3.5" width="19" height="17" rx="3" fill="currentColor" fillOpacity="0.1" />
      <path d="m6 8 3 3-3 3" />
      <path d="M11 14h3" />
      <path d="M15 8.5c1 0 1.5.5 1.5 1.5v1c0 .8.4 1.2 1 1.5-.6.3-1 .7-1 1.5v1c0 1-.5 1.5-1.5 1.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 4. Data Structures & Algorithms — Binary Tree & Graph
 * ──────────────────────────────────────────────────────────── */
export function DsaIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="4.5" r="2.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="6" cy="13.5" r="2.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="18" cy="13.5" r="2.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="4" cy="20" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="15" cy="20" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <path d="m10.2 6.5-3 5" />
      <path d="m13.8 6.5 3 5" />
      <path d="m5 16-1 2.5" />
      <path d="m7 16 1.5 2.5" />
      <path d="m17 16-1.5 2.5" />
      <path d="m19 16 1 2.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 5. System Design — Scaled Architecture & Microservices
 * ──────────────────────────────────────────────────────────── */
export function SystemDesignIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="2" width="8" height="5" rx="1.5" fill="currentColor" fillOpacity="0.25" />
      <rect x="2" y="16" width="6" height="6" rx="1.5" fill="currentColor" fillOpacity="0.15" />
      <rect x="9" y="16" width="6" height="6" rx="1.5" fill="currentColor" fillOpacity="0.15" />
      <rect x="16" y="16" width="6" height="6" rx="1.5" fill="currentColor" fillOpacity="0.15" />
      <path d="M12 7v4" />
      <path d="M5 11h14" />
      <path d="M5 11v5" />
      <path d="M12 11v5" />
      <path d="M19 11v5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 6. Machine Learning & AI — Deep Neural Network Layers
 * ──────────────────────────────────────────────────────────── */
export function MlIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Input Layer */}
      <circle cx="4" cy="6" r="2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="4" cy="12" r="2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="4" cy="18" r="2" fill="currentColor" fillOpacity="0.2" />
      {/* Hidden Layer */}
      <circle cx="12" cy="4" r="2" fill="currentColor" fillOpacity="0.25" />
      <circle cx="12" cy="9.3" r="2" fill="currentColor" fillOpacity="0.25" />
      <circle cx="12" cy="14.7" r="2" fill="currentColor" fillOpacity="0.25" />
      <circle cx="12" cy="20" r="2" fill="currentColor" fillOpacity="0.25" />
      {/* Output Layer */}
      <circle cx="20" cy="8" r="2" fill="currentColor" fillOpacity="0.35" />
      <circle cx="20" cy="16" r="2" fill="currentColor" fillOpacity="0.35" />
      {/* Synapses */}
      <path d="M6 6l4-2M6 6l4 3.3M6 12l4-2.7M6 12l4 2.7M6 18l4-3.3M6 18l4 2" strokeOpacity="0.4" />
      <path d="M14 4l4 4M14 9.3l4-1.3M14 9.3l4 6.7M14 14.7l4-6.7M14 14.7l4 1.3M14 20l4-4" strokeOpacity="0.4" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 7. Database Management (DBMS) — Relational DB Cylinders
 * ──────────────────────────────────────────────────────────── */
export function DbmsIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="8" ry="3" fill="currentColor" fillOpacity="0.2" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      <path d="M9 13.5h6" strokeOpacity="0.6" />
      <path d="M9 19.5h6" strokeOpacity="0.6" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 8. Operating Systems — Silicon CPU Die with Kernel Core
 * ──────────────────────────────────────────────────────────── */
export function OsIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="5" width="14" height="14" rx="2.5" fill="currentColor" fillOpacity="0.1" />
      <rect x="8.5" y="8.5" width="7" height="7" rx="1.5" fill="currentColor" fillOpacity="0.3" />
      {/* Pin Lines */}
      <path d="M9 2v3M12 2v3M15 2v3" />
      <path d="M9 19v3M12 19v3M15 19v3" />
      <path d="M2 9h3M2 12h3M2 15h3" />
      <path d="M19 9h3M19 12h3M19 15h3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 9. Computer Science Fundamentals — Logic Gates & Binary
 * ──────────────────────────────────────────────────────────── */
export function CsFundamentalsIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h5c3 0 5 2 5 5s-2 5-5 5H3z" fill="currentColor" fillOpacity="0.15" />
      <path d="M2 9h2M2 13h2" />
      <path d="M13 11h3" />
      <circle cx="17.5" cy="11" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <path d="M19 11h3" />
      <path d="M7 19v3M11 19v3M15 19v3" strokeOpacity="0.6" />
      <text x="3" y="21.5" fontSize="4.5" fontFamily="monospace" fill="currentColor" stroke="none" fontWeight="bold">0101</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 10. Cybersecurity & Hacking — Cryptographic Vault Shield
 * ──────────────────────────────────────────────────────────── */
export function CybersecurityIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M12 2.5L4 6.5v6c0 5.25 3.5 9.75 8 11 4.5-1.25 8-5.75 8-11v-6l-8-4z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <circle cx="12" cy="11" r="2.5" fill="currentColor" fillOpacity="0.3" />
      <path d="M12 13.5V17" />
      <path d="M10.5 15.5h3" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 11. Cloud & DevOps — Continuous Deployment Infinity Loop
 * ──────────────────────────────────────────────────────────── */
export function DevOpsIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M12 12c-2.5-3-5-4.5-7.5-4.5C2 7.5 0.5 9.5 0.5 12s1.5 4.5 4 4.5c2.5 0 5-1.5 7.5-4.5zm0 0c2.5 3 5 4.5 7.5 4.5 2.5 0 4-2 4-4.5s-1.5-4.5-4-4.5c-2.5 0-5 1.5-7.5 4.5z"
        transform="translate(0, 0)"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <circle cx="4.5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="19.5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 12. Data Engineering — Stream Pipelines & Funnel
 * ──────────────────────────────────────────────────────────── */
export function DataEngineeringIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h18l-6 8v7l-6 2v-9L3 4z" fill="currentColor" fillOpacity="0.1" />
      <path d="M9 13.5h6" />
      <path d="M5 7h14" strokeOpacity="0.5" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 13. Blockchain & Web3 — Cryptographic Chained Nodes
 * ──────────────────────────────────────────────────────────── */
export function BlockchainIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" fill="currentColor" fillOpacity="0.1" />
      <path d="M12 2v9M20 6.5l-8 4.5M4 6.5l8 4.5" />
      <circle cx="12" cy="11" r="2" fill="currentColor" fillOpacity="0.4" />
      <circle cx="12" cy="2" r="1" fill="currentColor" />
      <circle cx="20" cy="6.5" r="1" fill="currentColor" />
      <circle cx="20" cy="15.5" r="1" fill="currentColor" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
      <circle cx="4" cy="15.5" r="1" fill="currentColor" />
      <circle cx="4" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 14. Game Development — Precision Gamepad Controller
 * ──────────────────────────────────────────────────────────── */
export function GameDevIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M6 6h12a4 4 0 0 1 4 4v5a4 4 0 0 1-6.5 3.1L13.8 16h-3.6l-1.7 2.1A4 4 0 0 1 2 15v-5a4 4 0 0 1 4-4z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      {/* D-Pad */}
      <path d="M7 10v4M5 12h4" strokeWidth="2" />
      {/* Action Buttons */}
      <circle cx="17.5" cy="10.5" r="0.8" fill="currentColor" />
      <circle cx="15.5" cy="12.5" r="0.8" fill="currentColor" />
      <circle cx="19.5" cy="12.5" r="0.8" fill="currentColor" />
      <circle cx="17.5" cy="14.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 15. Tools & Environment — Modern CLI Toolkit
 * ──────────────────────────────────────────────────────────── */
export function ToolsIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="3" fill="currentColor" fillOpacity="0.1" />
      <path d="M3 8h18" />
      <circle cx="5.5" cy="6" r="0.75" fill="currentColor" />
      <circle cx="8" cy="6" r="0.75" fill="currentColor" />
      <path d="m7 12 3 2.5-3 2.5" strokeWidth="1.8" />
      <path d="M12 17h5" strokeWidth="1.8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 16. GitHub & Git — Commit Branch & Merge Graph
 * ──────────────────────────────────────────────────────────── */
export function GithubIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="2.5" fill="currentColor" fillOpacity="0.25" />
      <circle cx="6" cy="18" r="2.5" fill="currentColor" fillOpacity="0.25" />
      <circle cx="18" cy="9" r="2.5" fill="currentColor" fillOpacity="0.25" />
      <path d="M6 8.5v7" />
      <path d="M6 8.5a6 6 0 0 1 6 6v0a3.5 3.5 0 0 0 3.5-3v-2.5" />
      <path d="m15.5 11.5 2.5-2.5 2.5 2.5" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 17. Roadmaps — Waypoint Compass & Milestones
 * ──────────────────────────────────────────────────────────── */
export function RoadmapsIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.1" />
      <polygon points="12 4 14.5 9.5 20 12 14.5 14.5 12 20 9.5 14.5 4 12 9.5 9.5 12 4" fill="currentColor" fillOpacity="0.25" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 18. Community Sites & Projects — Hexagonal Collaboration Network
 * ──────────────────────────────────────────────────────────── */
export function CommunityProjectsIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="3" fill="currentColor" fillOpacity="0.2" />
      <circle cx="5" cy="17" r="2.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="19" cy="17" r="2.5" fill="currentColor" fillOpacity="0.2" />
      <path d="m7.2 15.5 3-6.5" />
      <path d="m16.8 15.5-3-6.5" />
      <path d="M7.5 17h9" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 19. Python — Sleek Dual Serpent Geometry
 * ──────────────────────────────────────────────────────────── */
export function PythonIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M11.5 2.5C7.5 2.5 6 4 6 6v3h6v1.5H5C3.5 10.5 2 12 2 15s1.5 4.5 4.5 4.5H8V17c0-2 1.5-3.5 3.5-3.5h6c1.5 0 3-1.5 3-3V6c0-2-1.5-3.5-4.5-3.5h-4.5z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <circle cx="8.5" cy="5.5" r="1" fill="currentColor" />
      <path
        d="M12.5 21.5c4 0 5.5-1.5 5.5-3.5v-3h-6v-1.5h7c1.5 0 3-1.5 3-4.5s-1.5-4.5-4.5-4.5H16V7c0 2-1.5 3.5-3.5 3.5h-6c-1.5 0-3 1.5-3 3V18c0 2 1.5 3.5 4.5 3.5h4.5z"
        fill="currentColor"
        fillOpacity="0.22"
      />
      <circle cx="15.5" cy="18.5" r="1" fill="currentColor" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 20. Java — Modular Enterprise Coffee Steam Emblem
 * ──────────────────────────────────────────────────────────── */
export function JavaIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 11h13a3 3 0 0 1 3 3v1a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-4z" fill="currentColor" fillOpacity="0.15" />
      <path d="M17 12h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2" />
      <path d="M8 7c-.5-1.5.5-3 1.5-4" />
      <path d="M12 7c-.5-1.5.5-3 1.5-4" />
      <path d="M2 21h17" strokeWidth="2" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * 21. C / C++ — Hardware Level Memory Bracket [C]
 * ──────────────────────────────────────────────────────────── */
export function CIcon({ className = "w-6 h-6", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3.5" width="18" height="17" rx="3" fill="currentColor" fillOpacity="0.1" />
      <path d="M14 8.5h-3a3.5 3.5 0 0 0 0 7h3" strokeWidth="2" />
      <path d="M16 10v2M15 11h2" strokeWidth="1.8" />
      <path d="M19 10v2M18 11h2" strokeWidth="1.8" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Track Color & Design System Tokens
 * ──────────────────────────────────────────────────────────── */
export interface TrackVisualSpec {
  name: string;
  slug: string;
  color: string;
  bgGlow: string;
  borderColor: string;
  accentBadge: string;
}

export const TRACK_SPECS: Record<string, TrackVisualSpec> = {
  webdev: {
    name: "Web Development",
    slug: "webdev",
    color: "text-[#2997ff]",
    bgGlow: "rgba(41, 151, 255, 0.16)",
    borderColor: "border-[#2997ff]/30",
    accentBadge: "bg-[#2997ff]/15 text-[#2997ff] border-[#2997ff]/30",
  },
  "mobile-app-development": {
    name: "Mobile App Development",
    slug: "mobile-app-development",
    color: "text-[#64d2ff]",
    bgGlow: "rgba(100, 210, 255, 0.16)",
    borderColor: "border-[#64d2ff]/30",
    accentBadge: "bg-[#64d2ff]/15 text-[#64d2ff] border-[#64d2ff]/30",
  },
  "coding-languages": {
    name: "Coding Languages",
    slug: "coding-languages",
    color: "text-[#bf5af2]",
    bgGlow: "rgba(191, 90, 242, 0.16)",
    borderColor: "border-[#bf5af2]/30",
    accentBadge: "bg-[#bf5af2]/15 text-[#bf5af2] border-[#bf5af2]/30",
  },
  dsa: {
    name: "Data Structures & Algorithms",
    slug: "dsa",
    color: "text-[#5e5ce6]",
    bgGlow: "rgba(94, 92, 230, 0.16)",
    borderColor: "border-[#5e5ce6]/30",
    accentBadge: "bg-[#5e5ce6]/15 text-[#5e5ce6] border-[#5e5ce6]/30",
  },
  "system-design": {
    name: "System Design",
    slug: "system-design",
    color: "text-[#ff9f0a]",
    bgGlow: "rgba(255, 159, 10, 0.16)",
    borderColor: "border-[#ff9f0a]/30",
    accentBadge: "bg-[#ff9f0a]/15 text-[#ff9f0a] border-[#ff9f0a]/30",
  },
  ml: {
    name: "Machine Learning & AI",
    slug: "ml",
    color: "text-[#30d158]",
    bgGlow: "rgba(48, 209, 88, 0.16)",
    borderColor: "border-[#30d158]/30",
    accentBadge: "bg-[#30d158]/15 text-[#30d158] border-[#30d158]/30",
  },
  dbms: {
    name: "Database Management",
    slug: "dbms",
    color: "text-[#63e6e2]",
    bgGlow: "rgba(99, 230, 226, 0.16)",
    borderColor: "border-[#63e6e2]/30",
    accentBadge: "bg-[#63e6e2]/15 text-[#63e6e2] border-[#63e6e2]/30",
  },
  os: {
    name: "Operating Systems",
    slug: "os",
    color: "text-[#ff375f]",
    bgGlow: "rgba(255, 55, 95, 0.16)",
    borderColor: "border-[#ff375f]/30",
    accentBadge: "bg-[#ff375f]/15 text-[#ff375f] border-[#ff375f]/30",
  },
  "cs-fundamentals": {
    name: "CS Fundamentals",
    slug: "cs-fundamentals",
    color: "text-[#ffd60a]",
    bgGlow: "rgba(255, 214, 10, 0.16)",
    borderColor: "border-[#ffd60a]/30",
    accentBadge: "bg-[#ffd60a]/15 text-[#ffd60a] border-[#ffd60a]/30",
  },
  cybersecurity: {
    name: "Cybersecurity & Hacking",
    slug: "cybersecurity",
    color: "text-[#ff453a]",
    bgGlow: "rgba(255, 69, 58, 0.16)",
    borderColor: "border-[#ff453a]/30",
    accentBadge: "bg-[#ff453a]/15 text-[#ff453a] border-[#ff453a]/30",
  },
  devops: {
    name: "Cloud & DevOps",
    slug: "devops",
    color: "text-[#40c8e0]",
    bgGlow: "rgba(64, 200, 224, 0.16)",
    borderColor: "border-[#40c8e0]/30",
    accentBadge: "bg-[#40c8e0]/15 text-[#40c8e0] border-[#40c8e0]/30",
  },
  "data-engineering": {
    name: "Data Engineering",
    slug: "data-engineering",
    color: "text-[#34c759]",
    bgGlow: "rgba(52, 199, 89, 0.16)",
    borderColor: "border-[#34c759]/30",
    accentBadge: "bg-[#34c759]/15 text-[#34c759] border-[#34c759]/30",
  },
  "blockchain-web3": {
    name: "Blockchain & Web3",
    slug: "blockchain-web3",
    color: "text-[#a28bfe]",
    bgGlow: "rgba(162, 139, 254, 0.16)",
    borderColor: "border-[#a28bfe]/30",
    accentBadge: "bg-[#a28bfe]/15 text-[#a28bfe] border-[#a28bfe]/30",
  },
  "game-development": {
    name: "Game Development",
    slug: "game-development",
    color: "text-[#ff2d55]",
    bgGlow: "rgba(255, 45, 85, 0.16)",
    borderColor: "border-[#ff2d55]/30",
    accentBadge: "bg-[#ff2d55]/15 text-[#ff2d55] border-[#ff2d55]/30",
  },
  tools: {
    name: "Developer Tools",
    slug: "tools",
    color: "text-[#ac8e68]",
    bgGlow: "rgba(172, 142, 104, 0.16)",
    borderColor: "border-[#ac8e68]/30",
    accentBadge: "bg-[#ac8e68]/15 text-[#ac8e68] border-[#ac8e68]/30",
  },
  github: {
    name: "GitHub Mastery",
    slug: "github",
    color: "text-[#f0f6fc]",
    bgGlow: "rgba(240, 246, 252, 0.16)",
    borderColor: "border-white/30",
    accentBadge: "bg-white/15 text-white border-white/30",
  },
  roadmaps: {
    name: "Developer Roadmaps",
    slug: "roadmaps",
    color: "text-[#ff9500]",
    bgGlow: "rgba(255, 149, 0, 0.16)",
    borderColor: "border-[#ff9500]/30",
    accentBadge: "bg-[#ff9500]/15 text-[#ff9500] border-[#ff9500]/30",
  },
  "community-sites-and-projects": {
    name: "Community & Live Apps",
    slug: "community-sites-and-projects",
    color: "text-[#30b0c7]",
    bgGlow: "rgba(48, 176, 199, 0.16)",
    borderColor: "border-[#30b0c7]/30",
    accentBadge: "bg-[#30b0c7]/15 text-[#30b0c7] border-[#30b0c7]/30",
  },
  python: {
    name: "Python",
    slug: "python",
    color: "text-[#3776ab]",
    bgGlow: "rgba(55, 118, 171, 0.16)",
    borderColor: "border-[#3776ab]/30",
    accentBadge: "bg-[#3776ab]/15 text-[#3776ab] border-[#3776ab]/30",
  },
  java: {
    name: "Java",
    slug: "java",
    color: "text-[#ea2d2e]",
    bgGlow: "rgba(234, 45, 46, 0.16)",
    borderColor: "border-[#ea2d2e]/30",
    accentBadge: "bg-[#ea2d2e]/15 text-[#ea2d2e] border-[#ea2d2e]/30",
  },
  c: {
    name: "C / C++",
    slug: "c",
    color: "text-[#00599c]",
    bgGlow: "rgba(0, 89, 156, 0.16)",
    borderColor: "border-[#00599c]/30",
    accentBadge: "bg-[#00599c]/15 text-[#00599c] border-[#00599c]/30",
  },
};

/* ─────────────────────────────────────────────────────────────
 * Master Dynamic Icon Resolver
 * ──────────────────────────────────────────────────────────── */
export function getTrackIcon(
  slugOrKey: string,
  className = "w-6 h-6",
  size?: number,
): React.ReactNode {
  const norm = slugOrKey.toLowerCase().trim();

  switch (norm) {
    case "webdev":
    case "web development":
    case "web-dev":
      return <WebDevIcon className={className} size={size} />;

    case "mobile-app-development":
    case "mobile apps":
    case "mobile":
      return <MobileDevIcon className={className} size={size} />;

    case "coding-languages":
    case "languages":
    case "go, rust & languages":
      return <LanguagesIcon className={className} size={size} />;

    case "dsa":
    case "dsa & algorithms":
    case "data structures & algorithms":
    case "algorithms":
      return <DsaIcon className={className} size={size} />;

    case "system-design":
    case "system design":
      return <SystemDesignIcon className={className} size={size} />;

    case "ml":
    case "machine learning":
    case "machine learning & ai":
    case "ai":
      return <MlIcon className={className} size={size} />;

    case "dbms":
    case "databases & sql":
    case "database management":
    case "sql":
      return <DbmsIcon className={className} size={size} />;

    case "os":
    case "operating systems":
      return <OsIcon className={className} size={size} />;

    case "cs-fundamentals":
    case "cs fundamentals":
    case "computer science fundamentals":
      return <CsFundamentalsIcon className={className} size={size} />;

    case "cybersecurity":
    case "cybersecurity & hacking":
    case "security":
      return <CybersecurityIcon className={className} size={size} />;

    case "devops":
    case "cloud & devops":
    case "cloud":
      return <DevOpsIcon className={className} size={size} />;

    case "data-engineering":
    case "data engineering":
      return <DataEngineeringIcon className={className} size={size} />;

    case "blockchain-web3":
    case "blockchain":
    case "blockchain & web3":
    case "web3":
      return <BlockchainIcon className={className} size={size} />;

    case "game-development":
    case "game dev":
    case "game development":
      return <GameDevIcon className={className} size={size} />;

    case "tools":
    case "developer tools":
    case "devops & docker":
      return <ToolsIcon className={className} size={size} />;

    case "github":
    case "github mastery":
    case "git":
      return <GithubIcon className={className} size={size} />;

    case "roadmaps":
    case "developer roadmaps":
      return <RoadmapsIcon className={className} size={size} />;

    case "community-sites-and-projects":
    case "community & live apps":
    case "community":
      return <CommunityProjectsIcon className={className} size={size} />;

    case "python":
      return <PythonIcon className={className} size={size} />;

    case "java":
      return <JavaIcon className={className} size={size} />;

    case "c":
    case "c / c++":
    case "cpp":
      return <CIcon className={className} size={size} />;

    default:
      return <WebDevIcon className={className} size={size} />;
  }
}
