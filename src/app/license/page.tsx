import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "License",
  description: "Software license and open-source notices for Ordly.",
};

export default function LicensePage() {
  return (
    <LegalPageLayout
      active="license"
      title="License"
      subtitle="Open-source software notices for Ordly."
      lastUpdated="November 25, 2026"
    >
      <p className="font-semibold text-[#17112E]">
        Ordly is built with open-source libraries including React, React Native,
        Expo, Next.js, Tailwind CSS, and Hugeicons (MIT License).
      </p>

      <pre className="overflow-x-auto rounded-2xl border border-[#ECE7F6] bg-white p-5 text-xs leading-relaxed text-[#4E4663] sm:text-sm">
{`MIT License — Copyright (c) 2026 Ordly

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.`}
      </pre>
    </LegalPageLayout>
  );
}
