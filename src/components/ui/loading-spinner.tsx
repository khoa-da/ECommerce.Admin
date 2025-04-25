import React from "react";

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen bg-background">
            <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <p className="text-muted-foreground text-sm">Đang tải...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;