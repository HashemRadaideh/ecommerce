import { useEffect, useState, MouseEvent } from "react";

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof localStorage === "undefined") return "light";
    return localStorage.getItem("theme") as "dark" | "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <button
      className="ml-0"
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setTheme(theme == "dark" ? "light" : "dark");
      }}
    >
      <ModeToggleIcon theme={theme} className="h-4 w-4" />
      <span className="sr-only">Theme mode toggle</span>
    </button>
  );
};

function ModeToggleIcon(props: {
  theme: "dark" | "light";
  className?: string;
}) {
  return (
    <>
      {props.theme == "dark" ? (
        <svg
          className={props.className}
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 512 508.47"
        >
          <path
            fillRule="nonzero"
            d="M254.23 508.47c-3.94 0-7.87-.1-11.77-.28h-1.54v-.07c-64.9-3.34-123.37-31.04-166.45-74.12C28.46 387.99 0 324.42 0 254.23c0-70.19 28.46-133.75 74.47-179.76C117.55 31.39 176.03 3.69 240.92.34V.27h1.54c3.9-.18 7.83-.27 11.77-.27l3.46.02.08-.02c70.19 0 133.75 28.46 179.76 74.47 46 46.01 74.47 109.57 74.47 179.76S483.53 387.99 437.53 434c-46.01 46.01-109.57 74.47-179.76 74.47l-.08-.03-3.46.03zm-13.31-30.56V30.56C184.33 33.87 133.4 58.17 95.79 95.79c-40.55 40.54-65.62 96.56-65.62 158.44 0 61.89 25.07 117.91 65.62 158.45 37.61 37.61 88.54 61.91 145.13 65.23z"
          />
        </svg>
      ) : (
        <svg
          className={props.className}
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 512 512"
        >
          <path
            fillRule="nonzero"
            d="M512 256c0 70.69-28.66 134.69-74.99 181.01C390.69 483.34 326.69 512 256 512c-70.68 0-134.69-28.66-181.01-74.99C28.66 390.69 0 326.69 0 256S28.66 121.31 74.99 74.99C121.31 28.66 185.32 0 256 0c70.69 0 134.69 28.66 181.01 74.99C483.34 121.31 512 185.31 512 256zm-81.82 143.75v-287.5a225.35 225.35 0 0 0-14.49-15.94 229.295 229.295 0 0 0-18.43-16.52v352.42c6.44-5.18 12.6-10.69 18.43-16.52 5.08-5.08 9.92-10.4 14.49-15.94zm30.17-240v192.5c13.78-29.2 21.48-61.82 21.48-96.25s-7.7-67.05-21.48-96.25zm-93.26 292.92V59.33a225.922 225.922 0 0 0-32.92-15.27v423.88c11.44-4.22 22.44-9.35 32.92-15.27zM304 476.71V35.29c-10.7-2.33-21.7-3.88-32.91-4.62v450.66c11.21-.74 22.21-2.29 32.91-4.62zm-63.09 4.62V30.67c-56.35 3.71-107.06 28.09-144.6 65.64C55.44 137.17 30.17 193.63 30.17 256c0 62.37 25.27 118.83 66.14 159.69 37.54 37.55 88.25 61.93 144.6 65.64z"
          />
        </svg>
      )}
    </>
  );
}
