import { urlFor } from "../lib/sanity";
import { useWindowSize } from "../modules/screenSize";
import { useState, useEffect } from "react";

import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

export default function Nav({ data }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { width: screenWidth, height: screenHeight } = useWindowSize();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const burgerMenuColor = () => {
    const main = "#3188cf";
    if (scrollPosition > screenHeight - 104) {
      return main;
    } else if (screenWidth < 1024 && toggleMenu) {
      return main;
    } else if (screenWidth < 768 && !toggleMenu) {
      return main;
    } else {
      return "white";
    }
  };

  const displayMenu = () => {
    if (screenWidth < 1024) {
      if (toggleMenu) {
        return "flex";
      } else {
        return "none";
      }
    } else {
      return "flex";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={
          scrollPosition > screenHeight - 104 && screenWidth > 768
            ? "nav-background-fix"
            : ""
        }
      >
        <div className="nav-background-background "></div>
        <div className="nav-background">
          <div className="nav-background-left"></div>
          <div className="nav-background-right"></div>
        </div>
        <div
          className="main-nav"
          style={
            toggleMenu && screenWidth < 1024
              ? { backgroundColor: "white" }
              : { backgroundColor: "rgba(0,0,0,0)" }
          }
        >
          {data && data[0].logo && (
            <div className="nav-logo-container">
              <img
                className="nav-logo"
                src={urlFor(data[0].logo).url()}
                alt="logo"
                onClick={() => scroll.scrollToTop(100)}
                style={{
                  opacity: scrollPosition >= screenHeight / 2 ? "1" : "0",
                }}
              />
            </div>
          )}

          <div className="nav-menu">
            <div className="burger-menu">
              <div
                className={`nav-icon ${toggleMenu ? "open" : ""}`}
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                <span style={{ background: burgerMenuColor() }}></span>
                <span style={{ background: burgerMenuColor() }}></span>
                <span style={{ background: burgerMenuColor() }}></span>
              </div>
            </div>
            <ul
              className={`menu-list ${
                toggleMenu && screenWidth < 1024
                  ? "menu-list-open"
                  : "menu-list-default"
              }`}
              style={{ display: displayMenu() }}
            >
              <ScrollLink
                activeClass="active"
                to="spaOchBadSection"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => setToggleMenu(!toggleMenu)}
                offset={-100}
              >
                <li>Spa & Bad</li>
              </ScrollLink>
              <ScrollLink
                activeClass="active"
                to="anlaggningSection"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => setToggleMenu(!toggleMenu)}
                offset={-100}
              >
                <li>Anläggning</li>
              </ScrollLink>
              <ScrollLink
                activeClass="active"
                to="serviceSection"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => setToggleMenu(!toggleMenu)}
                offset={-100}
              >
                <li>Service</li>
              </ScrollLink>

              <ScrollLink
                activeClass="active"
                to="contactSection"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => setToggleMenu(!toggleMenu)}
                className="last-nav"
                offset={-100}
              >
                <li>Kontakt</li>
              </ScrollLink>
              <div
                className="menu-background"
                style={toggleMenu ? { display: "block" } : { display: "none" }}
                onClick={() => setToggleMenu(!toggleMenu)}
              ></div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
