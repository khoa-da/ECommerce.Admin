
import { Outlet } from "react-router-dom";
const MainLayout = () => {
    return (

        <main className="flex-1">
            <Outlet />
        </main>
    );
};

export default MainLayout;