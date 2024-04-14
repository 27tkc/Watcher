import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import Modal from "../components/Modal";
import { Modal as ModalAnt, Typography } from "antd";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const downloadFileURL = async (url) => {
  const fileName = url.split("?").shift().split("/").pop();
  const aTag = window.document.createElement("a");
  aTag.href = url;
  aTag.setAttribute("download", fileName);
  document.body.appendChild(aTag);
  aTag.click();
  aTag.remove();
};
const EmojiButton = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
`;

const Emoji = styled.span`
  font-size: 24px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.text};
`;

const ShareSaveWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Video = () => {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const [showModal, setShowModal] = useState(false);

  const URL = window.location.href;

  const { Text } = Typography;

  const toggleShareModalOpen = () => {
    setShareModalOpen((prev) => !prev);
  };

  const [selectedEmoji, setSelectedEmoji] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        const selectedEmojiRes = await axios.get(
          `/videos/selectedEmoji/${videoRes.data._id}`
        );
        await axios.put(`/videos/view/${path}`);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        setSelectedEmoji(selectedEmojiRes.data.selectedEmoji);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleEmojiClick = async (emoji) => {
    if (!currentUser) {
      setShowModal(true);
      return;
    }

    const videoId = currentVideo._id;
    try {
      const response = await axios.put(`/videos/selectEmoji/${videoId}`, {
        emoji,
      });
      if (response.status === 200) {
        setSelectedEmoji(emoji);
        dispatch(
          emoji === "👍" || emoji === "😆" || emoji === "❤️"
            ? like(currentUser._id)
            : dislike(currentUser._id)
        );
      }
    } catch (err) {
      console.error("Error selecting emoji:", err);
    }
  };

  const handleSub = async () => {
    if (!currentUser || !currentUser.subscribedUsers) {
      setShowModal(true);
      return;
    }

    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  const isSubscribed = currentUser?.subscribedUsers?.includes(channel._id);

  return (
    <Container>
      <Content>
        <VideoWrapper>
          {currentVideo && currentVideo.videoUrl && (
            <VideoFrame
              src={currentVideo.videoUrl}
              controls
              autoPlay={false}
              style={{ borderRadius: "1rem" }}
              muted
              onClick={(e) => e.currentTarget.play()}
            />
          )}
        </VideoWrapper>
        <TitleWrapper>
          <Title>{currentVideo && currentVideo.title}</Title>
          <ShareSaveWrapper>
            <Button onClick={() => setShareModalOpen(true)}>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button onClick={() => downloadFileURL(currentVideo.videoUrl)}>
              <AddTaskOutlinedIcon /> Download
            </Button>
          </ShareSaveWrapper>
        </TitleWrapper>
        <Details>
          <Info>
            {currentVideo &&
              currentVideo.views &&
              `${currentVideo.views} views`}
            {currentVideo &&
              currentVideo.createdAt &&
              ` • ${format(currentVideo.createdAt)}`}
          </Info>
          <Buttons>
            <EmojiButton onClick={() => handleEmojiClick("👍")}>
              <Emoji
                style={{ fontSize: selectedEmoji === "👍" ? "35px" : "24px" }}
              >
                👍
              </Emoji>
            </EmojiButton>
            <EmojiButton onClick={() => handleEmojiClick("😆")}>
              <Emoji
                style={{ fontSize: selectedEmoji === "😆" ? "35px" : "24px" }}
              >
                😆
              </Emoji>
            </EmojiButton>
            <EmojiButton onClick={() => handleEmojiClick("❤️")}>
              <Emoji
                style={{ fontSize: selectedEmoji === "❤️" ? "35px" : "24px" }}
              >
                ❤️
              </Emoji>
            </EmojiButton>
            <EmojiButton onClick={() => handleEmojiClick("😢")}>
              <Emoji
                style={{ fontSize: selectedEmoji === "😢" ? "35px" : "24px" }}
              >
                😢
              </Emoji>
            </EmojiButton>
            <EmojiButton onClick={() => handleEmojiClick("😡")}>
              <Emoji
                style={{ fontSize: selectedEmoji === "😡" ? "35px" : "24px" }}
              >
                😡
              </Emoji>
            </EmojiButton>
          </Buttons>
        </Details>

        <ModalAnt
          title="Sharable link"
          okText="Close"
          onCancel={toggleShareModalOpen}
          cancelButtonProps={{ style: { display: "none" } }}
          onOk={toggleShareModalOpen}
          open={shareModalOpen}
        >
          <Text copyable>
            <Link href={URL} target="_blank">
              {URL}
            </Link>
          </Text>
        </ModalAnt>

        <Hr />
        <Channel>
          <ChannelInfo>
            {channel && channel.img ? <Image src={channel.img} /> : null}
            <ChannelDetail>
              {channel && channel.name ? (
                <ChannelName>{channel.name}</ChannelName>
              ) : null}
              {channel && channel.subscribers ? (
                <ChannelCounter>
                  {channel.subscribers} subscribers
                </ChannelCounter>
              ) : null}
              <Description>{currentVideo && currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          {channel && channel._id ? (
            <Subscribe
              onClick={handleSub}
              style={{ backgroundColor: isSubscribed ? "green" : "red" }}
            >
              {currentUser?.subscribedUsers?.includes(channel._id)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </Subscribe>
          ) : null}
        </Channel>
        <Hr />
        {currentVideo && currentVideo._id ? (
          <Comments videoId={currentVideo._id} />
        ) : null}
      </Content>
      {currentVideo && currentVideo.tags ? (
        <Recommendation tags={currentVideo.tags} />
      ) : null}
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </Container>
  );
};

export default Video;
