import { css } from "@emotion/react";
import { Button, Container } from "@mui/material";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container css={styles.home}>
      <Button variant="contained" href="reviews" color="secondary">
        Reviews here
      </Button>
    </Container>
  );
};

const styles = {
  home: css({
    margin: "25px auto",
  }),
};

export default Home;
