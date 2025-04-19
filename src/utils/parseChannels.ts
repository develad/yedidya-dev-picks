import type { Category, YouTubeChannel } from "../types/channel";

export function parseChannels(markdown: string): Category[] {
  const lines = markdown.split("\n");
  const categories: Category[] = [];
  let currentCategory: Category | null = null;
  let currentSubcategory: { name: string; channels: YouTubeChannel[] } | null =
    null;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      // New category
      if (currentCategory) {
        if (currentSubcategory && currentSubcategory.channels.length > 0) {
          // Only add if not already present
          if (
            !currentCategory.subcategories.some(
              (sub) => sub.name === currentSubcategory!.name
            )
          ) {
            currentCategory.subcategories.push(currentSubcategory);
          }
        }
        categories.push(currentCategory);
      }
      currentCategory = {
        name: line.replace("## ", "").trim(),
        subcategories: [
          {
            name: "General",
            channels: [],
          },
        ],
      };
      currentSubcategory = currentCategory.subcategories[0];
    } else if (line.startsWith("### ")) {
      // New subcategory
      if (currentCategory) {
        // Save current subcategory if it has channels
        if (currentSubcategory && currentSubcategory.channels.length > 0) {
          if (
            !currentCategory.subcategories.some(
              (sub) => sub.name === currentSubcategory!.name
            )
          ) {
            currentCategory.subcategories.push(currentSubcategory);
          }
        }
        const newSubcategoryName = line.replace("### ", "").trim();
        // Check if subcategory already exists
        const existingSubcategory = currentCategory.subcategories.find(
          (sub) => sub.name === newSubcategoryName
        );
        if (existingSubcategory) {
          currentSubcategory = existingSubcategory;
        } else {
          currentSubcategory = {
            name: newSubcategoryName,
            channels: [],
          };
        }
      }
    } else if (line.startsWith("- [")) {
      // Channel entry
      if (currentCategory && currentSubcategory) {
        const match = line.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          const channel: YouTubeChannel = {
            name: match[1],
            url: match[2],
            category: currentCategory.name,
            subcategory: currentSubcategory.name,
          };
          // Only add if not already present
          if (
            !currentSubcategory.channels.some((ch) => ch.url === channel.url)
          ) {
            currentSubcategory.channels.push(channel);
          }
        }
      }
    }
  }

  // Add the last category and subcategory
  if (currentCategory) {
    if (currentSubcategory && currentSubcategory.channels.length > 0) {
      if (
        !currentCategory.subcategories.some(
          (sub) => sub.name === currentSubcategory!.name
        )
      ) {
        currentCategory.subcategories.push(currentSubcategory);
      }
    }
    categories.push(currentCategory);
  }

  // Clean up empty subcategories and remove duplicates
  return categories.map((category) => ({
    ...category,
    subcategories: category.subcategories
      .filter((sub) => sub.channels.length > 0)
      // Remove duplicate subcategories
      .filter(
        (sub, index, self) =>
          index === self.findIndex((s) => s.name === sub.name)
      ),
  }));
}
