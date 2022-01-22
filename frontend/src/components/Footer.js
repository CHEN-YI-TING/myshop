import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Container fixed>
      <Box>
        <Typography>My sticky footer can be found here.</Typography>
        <Copyright />
      </Box>
    </Container>
  );
}
