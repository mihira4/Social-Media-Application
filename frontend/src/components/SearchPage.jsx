import { Box, Typography, useMediaQuery, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "components/navbar";
import FriendListWidget from "components/FriendList";
import MyPostWidget from "components/MyPost";
import PostsWidget from "components/Posts";
import UserWidget from "components/UserWidget";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const loggedInUser = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const { userName } = useParams();
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const searchUser = async () => {
    const response = await fetch(`http://localhost:5000/users/search/${userName}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    searchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
    

    if (user) {

        return (
          <Box>
            <Navbar />
            <Box
              width="100%"
              padding="2rem 6%"
              display={isNonMobileScreens ? "flex" : "block"}
              gap="2rem"
              justifyContent="center"
            >
              <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                <UserWidget userId={user._id} picturePath={user.picturePath} />
                <Box m="2rem 0" />
                <FriendListWidget userId={user._id} />
              </Box>
              <Box
                flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}
              >
                {loggedInUser._id === user._id && (
                  <MyPostWidget picturePath={user.picturePath} />
                )}
                <Box m="2rem 0" />
                <PostsWidget userId={user._id} isProfile />
              </Box>
            </Box>
          </Box>
        );
    }
    else {
    return (
      <>
        <Box>
          <Navbar />
          <Typography>User not found!</Typography>
          <Button
            onClick={() => navigate("/home")}
            sx={{
              backgroundColor: "primary.main",
              color: "black",
              fontWeight: "bold",
              fontSize: "0.7rem",
              padding: "5px 10px",
              textTransform: "uppercase",
              marginRight: "16px",
              borderRadius: "0.75rem",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
      </>
    );
    }

  
};

export default SearchPage;
