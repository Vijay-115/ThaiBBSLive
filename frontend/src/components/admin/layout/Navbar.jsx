import React from "react";

const Navbar = ({
    isDarkMode,
    toggleDarkMode,
    toggleSidebar,
    isSidebarHidden,
    isNotificationMenuOpen,
    toggleNotificationMenu,
    isProfileMenuOpen,
    toggleProfileMenu,
    isSearchFormShown,
    toggleSearchForm,
}) => {

    return (
        <nav>
            <i className="bx bx-menu bx-sm" onClick={toggleSidebar} />
            <form action="#" className={isSearchFormShown ? 'show' : ''}>
                <div className="form-input">
                    <input placeholder="Search..." type="search" />
                    <button className="search-btn" onClick={toggleSearchForm}>
                        <i className={`bx ${isSearchFormShown ? 'bx-x' : 'bx-search'}`} />
                    </button>
                </div>
            </form>
            <input
                className="checkbox"
                hidden
                id="switch-mode"
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
            />
            <label className="swith-lm" htmlFor="switch-mode">
                <i className="bx bxs-moon" />
                <i className="bx bx-sun" />
                <div className="ball" />
            </label>
            <div className="notification" onClick={toggleNotificationMenu}>
                <i className="bx bxs-bell bx-tada-hover" />
                <span className="num">8</span>
            </div>
            {isNotificationMenuOpen && (
                <div className="notification-menu">
                    <ul>
                        <li>New message from John</li>
                        <li>Your order has been shipped</li>
                        <li>New comment on your post</li>
                        <li>Update available for your app</li>
                        <li>Reminder: Meeting at 3PM</li>
                    </ul>
                </div>
            )}
            <div className="profile" onClick={toggleProfileMenu}>
                <img alt="Profile" src="https://placehold.co/600x400/png" />
            </div>
            {isProfileMenuOpen && (
                <div className="profile-menu">
                    <ul>
                        <li>
                            <a href="#">My Profile</a>
                        </li>
                        <li>
                            <a href="#">Settings</a>
                        </li>
                        <li>
                            <a href="#">Log Out</a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;