"use client";

interface ProjectFloatingSwitcherProps {
  currentTab: "stills" | "motion";
  onToggle: () => void;
}

export default function ProjectFloatingSwitcher({
  currentTab,
  onToggle,
}: ProjectFloatingSwitcherProps) {
  return (
    <button
      onClick={onToggle}
      className="page-tab-switcher"
      aria-label={currentTab === "stills" ? "Switch to Motion" : "Switch to Stills"}
      title={currentTab === "stills" ? "Switch to Motion" : "Switch to Stills"}
    >
      {currentTab === "stills" ? (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ marginLeft: "2px" }}
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      ) : (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      )}
    </button>
  );
}
