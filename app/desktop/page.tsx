import { redirect } from "next/navigation";

// the desktop experience moved to "/" (the site's homepage) — this route just forwards
// anyone who still has the old /desktop URL bookmarked or linked. Forced dynamic so this
// sends a real server-side HTTP redirect instead of a static page that only redirects
// once client JS hydrates.
export const dynamic = "force-dynamic";

export default function DesktopRedirect() {
  redirect("/");
}
