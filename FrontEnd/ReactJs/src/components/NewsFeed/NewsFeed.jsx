import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Rightbar from "./Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Add from "./Add";

const NewsFeed = () => {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>    
        <Stack direction="row" justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <Feed />
          <Rightbar />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );
};

export default NewsFeed;