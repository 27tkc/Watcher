import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h2`
  font-size: 36px;
  letter-spacing: 3px;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  alignitems: center;
`;

const ProfileImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${({ theme }) => theme.text};
`;

const TableHeader = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  color: ${({ theme }) => theme.text};
`;

const TableCell = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  color: ${({ theme }) => theme.text};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.bgLighter};
  }
`;

const Button = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
  }
`;

const UserInfo = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;
const SettingsSecondaryHeading = styled.p`
  font-size: 25px;
  letter-spacing: 2px;
  margin: 5px;
  color: ${({ theme }) => theme.text};
`;

const Settings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/videos/getAllVideosUser/${currentUser._id}`
        );
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user videos:", error);
        setLoading(false);
      }
    };

    fetchUserVideos();
  }, [currentUser]);

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`/deleteVideo/${videoId}`);
      setVideos(videos.filter((video) => video._id !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <Container>
      <Title>Settings</Title>

      <ProfileImage src={currentUser.img} alt={currentUser.name} />
      <br />
      <SettingsSecondaryHeading>User Information:</SettingsSecondaryHeading>
      <br />
      <UserInfo>Name: {currentUser.name}</UserInfo>
      <UserInfo>Email: {currentUser.email}</UserInfo>
      <UserInfo>Subscribers: {currentUser.subscribers}</UserInfo>
      <br />
      <br />
      <SettingsSecondaryHeading>Your Videos:</SettingsSecondaryHeading>
      <br />
      <TableContainer>
        <thead>
          <tr>
            <TableHeader>Title</TableHeader>
            <TableHeader>Views</TableHeader>
            <TableHeader>Likes</TableHeader>
            <TableHeader>Dislikes</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <TableRow key={video._id}>
              <TableCell>{video.title}</TableCell>
              <TableCell>{video.views}</TableCell>
              <TableCell>{video.likes.length}</TableCell>
              <TableCell>{video.dislikes.length}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(video._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TableContainer>
    </Container>
  );
};

export default Settings;
