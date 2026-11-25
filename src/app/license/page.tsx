import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "License",
  description: "Software license and open-source notices for Manke.",
};

export default function LicensePage() {
  return (
    <LegalPageLayout
      active="license"
      title="License"
      subtitle="Open-source software notices for Manke."
      lastUpdated="November 26, 2026"
    >
      <p className="font-semibold text-[#0F172A]">
        Manke is built with open-source libraries including React, React Native,
        Expo, Next.js, Tailwind CSS, and Hugeicons (MIT License).
      </p>

      <pre className="overflow-x-auto rounded-2xl border border-[#E2E8F0] bg-white p-5 text-xs leading-relaxed text-[#475569] sm:text-sm">
{`MIT License — Copyright (c) 2026 Manke

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
