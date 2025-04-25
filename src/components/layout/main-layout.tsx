import { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import {
    LayoutDashboard,
    User,
    Settings,
    LogOut,
    Menu,
    X,
    Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MainLayout = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Lấy thông tin người dùng từ localStorage
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    const email = localStorage.getItem("userEmail") || "";
    const userInitials = (firstName?.[0] || "") + (lastName?.[0] || "");

    const handleLogout = () => {
        // Xóa thông tin người dùng và token
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");

        // Chuyển hướng đến trang đăng nhập
        navigate("/login");
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/dashboard" },
        { icon: <User size={20} />, label: "Hồ sơ", path: "/profile" },
        { icon: <Settings size={20} />, label: "Cài đặt", path: "/settings" },
    ];

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar for desktop */}
            <aside className={`hidden md:flex flex-col w-64 bg-card border-r border-border`}>
                <div className="p-4 flex items-center border-b border-border h-16">
                    <h1 className="text-xl font-bold">Ứng dụng</h1>
                </div>
                <nav className="flex-1 overflow-y-auto p-2">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-border">
                    <Button
                        variant="outline"
                        className="w-full flex items-center gap-2 justify-start"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} />
                        <span>Đăng xuất</span>
                    </Button>
                </div>
            </aside>

            {/* Mobile sidebar overlay */}
            {isSidebarOpen && (
                <div className="md:hidden fixed inset-0 bg-black/50 z-20" onClick={toggleSidebar}></div>
            )}

            {/* Mobile sidebar */}
            <aside className={`md:hidden fixed inset-y-0 left-0 z-30 w-64 bg-card border-r border-border transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex items-center justify-between border-b border-border h-16">
                    <h1 className="text-xl font-bold">Ứng dụng</h1>
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        <X size={20} />
                    </Button>
                </div>
                <nav className="flex-1 overflow-y-auto p-2">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                                    onClick={toggleSidebar}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-border">
                    <Button
                        variant="outline"
                        className="w-full flex items-center gap-2 justify-start"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} />
                        <span>Đăng xuất</span>
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-4 border-b border-border">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
                            <Menu size={20} />
                        </Button>
                        <h2 className="text-lg font-medium">Trang chủ</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/avatar.png" />
                                        <AvatarFallback>{userInitials || "U"}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">{firstName} {lastName}</p>
                                        <p className="text-xs text-muted-foreground">{email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate("/profile")}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Hồ sơ</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate("/settings")}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Cài đặt</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Đăng xuất</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;