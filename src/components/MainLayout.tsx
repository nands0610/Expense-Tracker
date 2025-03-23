import Sidebar from "./sidebar";
import "./MainLayout.css";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="main-layout">
            <Sidebar />
            <div className="content">{children}</div>
        </div>
    );
};

export default MainLayout;
