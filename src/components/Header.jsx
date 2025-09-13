
const Header = () => {

    return (
        <header className= "flex justify-between items-center font-bold sticky top-0 text-white p-4 w-full bg-gradient-to-b from-[#242625] to-[#535557] shadow-md">
            <a href="/">
                <h1 className="text-3xl">Weather App</h1>
            </a>
            <nav>
                <ul className="flex space-x-6">
                    <li>
                        <a href="/" className="hover:underline">Home</a>
                    </li>
                    <li>
                        <a href="/weather" className="hover:underline">Weather</a>
                    </li>
                    <li>
                        <a href="/help" className="hover:underline">Help</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;