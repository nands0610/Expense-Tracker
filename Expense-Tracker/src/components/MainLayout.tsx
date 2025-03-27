import Sidebar from "./sidebar";
import "./MainLayout.css";
import Chatbot from "./Chatbot";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="main-layout">
            <Sidebar />
            <div className="content">{children}</div>
            <Chatbot />
        </div>


    );
};

export default MainLayout;
