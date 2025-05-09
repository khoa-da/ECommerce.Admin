import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"

export const data = {
    user: {
        name: "admin",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Category",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Parent Category",
                    url: "/parents-category",
                },
                {
                    title: "Children Category",
                    url: "/childrens-category",
                },

            ],
        },
        {
            title: "DashBoard",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Orders",
                    url: "/orders",
                },


            ],
        }
    ],
    projects: [
        {
            name: "Product",
            url: "/products",
            icon: Frame,
        },
        {
            name: "Users",
            url: "/user",
            icon: PieChart,
        }
    ],
}