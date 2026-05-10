// app/submit/page.tsx
import { Suspense } from "react";
import { SubmitPageClient } from "./SubmitPageClient";

export default function SubmitPage() {
  return (
    <Suspense fallback={null}>
      <SubmitPageClient />
    </Suspense>
  );
}
