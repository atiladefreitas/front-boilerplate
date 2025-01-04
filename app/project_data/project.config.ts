export const PROJECT_NAME =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_PROJECT_NAME
    : process.env.NEXT_PUBLIC_PROJECT_NAME || "";
