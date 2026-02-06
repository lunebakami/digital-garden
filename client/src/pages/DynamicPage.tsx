import { useRoute } from "wouter";
import PageViewer from "./PageViewer";

export default function DynamicPage() {
  const [match, params] = useRoute("/:slug");
  
  if (!match) return null;

  return <PageViewer slug={params.slug} />;
}
