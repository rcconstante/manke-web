import type { Metadata } from "next";
import { FigmaPlayground } from "@/components/playground/FigmaPlayground";

export const metadata: Metadata = {
  title: "Design Playground & Screen Flows",
  description:
    "Interactive Figma-style screen playground and prototype wiring for Manke mobile screens.",
};

export default function PlaygroundPage() {
  return <FigmaPlayground />;
}
