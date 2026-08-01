import type { Metadata } from "next";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "CV · Tino Purmann",
  description: "Curriculum vitae of Tino Purmann",
};

const NOTION_EMBED_URL =
  "https://tinopurmann.notion.site/ebd/1c726a26061480699969e4d1931eff5e";

const NOTION_PUBLIC_URL =
  "https://tinopurmann.notion.site/Hey-I-m-Tino-Purmann-1c726a26061480699969e4d1931eff5e";

/**
 * Notion embeds remount when nested under the global SwipeProvider (CSS
 * transform + overflow:hidden). SwipeProvider now skips /cv, and this page
 * uses a fixed dvh frame instead of h-[100vh] to avoid mobile chrome thrash.
 */
export default function CV() {
  return (
    <main className="fixed inset-0 bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3">
        <div className="pointer-events-auto rounded-md bg-white/95 text-neutral-800 shadow-sm ring-1 ring-black/5">
          <BackButton />
        </div>
        <a
          href={NOTION_PUBLIC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto rounded-md bg-white/95 px-3 py-1.5 text-sm text-neutral-700 shadow-sm ring-1 ring-black/5 hover:bg-white"
        >
          Open directly
        </a>
      </div>
      <iframe
        title="Tino Purmann CV"
        src={NOTION_EMBED_URL}
        className="absolute inset-0 h-[100dvh] w-full border-0"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </main>
  );
}
