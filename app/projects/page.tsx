import { redirect } from "next/navigation";

export default function ProjectsPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  if (searchParams?.tab === "motion") {
    redirect("/motion");
  }
  redirect("/stills");
}
