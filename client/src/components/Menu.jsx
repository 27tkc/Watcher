import React, { useState, useEffect } from "react";
import styled from "styled-components";
import WatcherLight from "../img/logo-white.png";
import WatcherDark from "../img/logo-black.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import InfoIcon from "@mui/icons-material/Info";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { Home } from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100% !important;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 40px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Logout = styled.div``;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode, categories }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoSrc = darkMode ? WatcherLight : WatcherDark;
  // Function to handle signout
  const handleSignout = () => {
    dispatch(logout()); // Dispatching the logout action
  };

  // useEffect(() => {
  //   // Fetch latest videos when categories change
  //   // fetchLatestVideos();
  // }, [categories]);

  // Mapping of categories to icons
  const categoryIcons = {
    Music: LibraryMusicOutlinedIcon,
    Sports: SportsBasketballOutlinedIcon,
    Gaming: SportsEsportsOutlinedIcon,
    Movies: MovieOutlinedIcon,
    News: ArticleOutlinedIcon,
  };

  const firstCatego = categories.length > 0 ? categories[0] : "Music";
  const FirstCategoryIcon =
    firstCatego === "Music"
      ? categoryIcons[firstCatego]
      : categoryIcons[firstCatego];

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={logoSrc} />
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Saved
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Link
          to={firstCatego}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            {FirstCategoryIcon && <FirstCategoryIcon />}
            {firstCatego}
          </Item>
        </Link>
        {/* Render rest of the categories */}
        {Object.keys(categoryIcons).map((category, index) => {
          if (category === firstCatego) {
            return null;
          }
          const IconComponent = categoryIcons[category]; // Get the icon component
          return (
            <Link
              to={category}
              key={index}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Item>
                {IconComponent && <IconComponent />}{" "}
                {/* Instantiate and render the icon component */}
                {category}
              </Item>
            </Link>
          );
        })}

        {/* <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item> */}
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
        <Link to="about" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <InfoIcon />
            About
          </Item>
        </Link>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        {currentUser && (
          <>
            <Logout>
              <Link to="signout" style={{ textDecoration: "none" }}>
                <Button
                  style={{ color: "red", borderColor: "red" }}
                  onClick={handleSignout}
                >
                  <LogoutOutlinedIcon style={{ color: "red" }} />
                  SIGN OUT
                </Button>
              </Link>
            </Logout>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Menu;
