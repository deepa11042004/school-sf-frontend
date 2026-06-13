import type { Metadata } from "next";
import QuestionBankQuestions from "@/components/Academic/QuestionBankQuestions";

export const metadata: Metadata = {
  title: " SF-Software Dashboard - OpenSource CMS",
  description: " SF-Software dashboard build with Next.js and Tailwind CSS",
};

export default function page() {
  return (
    <>
      <QuestionBankQuestions />
    </>
  );
}
 