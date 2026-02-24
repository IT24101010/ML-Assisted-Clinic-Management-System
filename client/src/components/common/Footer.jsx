const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center text-textSecondary">
                <p className="font-semibold text-textPrimary">RASUL Medical Center</p>
                <p className="text-sm">Sri Lanka</p>
                <p className="text-sm mt-2">&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
