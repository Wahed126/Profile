export interface Tip {
  id: string;
  number: string;
  text: string;
  author: string;
  category?: string;
}

export const tipsData: Tip[] = [
  {
    id: "tip-1",
    number: "01",
    text: "Don't include all feature of an app in the first version of it. Include them step by step so that the user can learn the app.",
    author: "@ Wahed",
    category: "Product Strategy",
  },
  {
    id: "tip-2",
    number: "02",
    text: "Optimize for readability over cleverness. Code is read 10x more often than it is written.",
    author: "@ Wahed",
    category: "Clean Code",
  },
  {
    id: "tip-3",
    number: "03",
    text: "Design the state flow before writing UI components. Clear state architecture prevents 90% of layout bugs.",
    author: "@ Wahed",
    category: "Architecture",
  },
  {
    id: "tip-4",
    number: "04",
    text: "Fail fast and visibly during development, but fail gracefully and silently in production.",
    author: "@ Wahed",
    category: "Engineering",
  },
];
