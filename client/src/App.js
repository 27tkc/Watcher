import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import About from "./pages/About";
import SuperAdminDashboardMain from "./pages/SuperAdmin/SuperAdminDashboardMain";
import SuperAdminUserDetails from "./pages/SuperAdmin/SuperAdminUserDetails";
import SuperAdminVideoDetails from "./pages/SuperAdmin/SuperAdminVideoDetails";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);

  // Fetch latest uploaded videos and extract their categories
  useEffect(() => {
    const fetchLatestVideos = async () => {
      try {
        // Fetch latest uploaded videos
        const response = await fetch("/videos/latestVideo");
        const latestVideos = await response.json();
        setCategories(latestVideos);
      } catch (error) {
        console.error("Error fetching latest videos:", error);
      }
    };

    fetchLatestVideos();
  }, []);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            categories={categories}
          />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route darkMode={darkMode} path="about" element={<About />} />
                  <Route
                    path="signin"
                    element={currentUser ? <Home /> : <SignIn />}
                  />
                  <Route path="signout" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
                <Route
                  path="superadmin"
                  element={<SuperAdminDashboardMain />}
                />
                <Route
                  path="superadmin/superAdminUserDetails/:userId"
                  element={<SuperAdminUserDetails />}
                />
                <Route
                  path="superadmin/superAdminVideoDetails/:videoId"
                  element={<SuperAdminVideoDetails />}
                />
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
