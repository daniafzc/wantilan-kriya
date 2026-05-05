"use client";

import { useSearchParams } from "next/navigation";
import { SubmitStep1 } from "@/components/sections/SubmitStep1";
import { SubmitStep2 } from "@/components/sections/SubmitStep2";
import { SubmitStep3 } from "@/components/sections/SubmitStep3";
import { SubmitStep4 } from "@/components/sections/SubmitStep4";
import { SubmitConfirmation } from "@/components/sections/SubmitConfirmation";
import { CommunityModal } from "@/components/shared/CommunityModal";
import { useCommunityModal } from "@/hooks/useCommunityModal";

export default function SubmitPage() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "1";
  const { community, open, showRules, closeModal } = useCommunityModal();

  const renderStep = () => {
    switch (step) {
      case "2":
        return <SubmitStep2 />;
      case "3":
        return <SubmitStep3 />;
      case "4":
        return <SubmitStep4 />;
      case "5":
        return <SubmitConfirmation onCommunityClick={showRules} />;
      default:
        return <SubmitStep1 />;
    }
  };

  return (
    <>
      {renderStep()}
      <CommunityModal community={community} open={open} onClose={closeModal} />
    </>
  );
}
