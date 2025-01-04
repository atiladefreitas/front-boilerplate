import { LayoutDashboard } from "lucide-react";

export const SIDEBAR_DATA = {
  user: {
    name: "Átila de Freitas",
    email: "contact@atiladefreitas.co",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
};
