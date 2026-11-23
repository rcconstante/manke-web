import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "License",
  description: "Software license and open-source attributions for Ordly.",
};

export default function LicensePage() {
  return (
    <LegalPageLayout
      active="license"
      title="License & Open Source"
      subtitle="Licensing terms for Ordly and acknowledgments for the open-source libraries that power it."
      lastUpdated="November 23, 2026"
    >
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">MIT License</h2>
        <pre className="overflow-x-auto rounded-2xl border border-[#E9DDFC] bg-[#FAF7FF] p-5 text-xs leading-relaxed text-[#211340] sm:text-sm">
{`Copyright (c) 2026 Ordly

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
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#211340]">Third-Party Open Source</h2>
        <p>Ordly is built with open-source software, including:</p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>React &amp; React Native (MIT License)</li>
          <li>Expo SDK (MIT License)</li>
          <li>Next.js &amp; Tailwind CSS (MIT License)</li>
          <li>Hugeicons Core Free Icons &amp; React Native Component (MIT License)</li>
          <li>react-native-svg, react-native-safe-area-context, react-native-webview (MIT License)</li>
        </ul>
      </section>
    </LegalPageLayout>
  );
}
