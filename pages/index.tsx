import { css } from "@emotion/react";
import { Button, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import { colors, fonts } from "../styles/customStyles";

const Home: NextPage = () => {
  return (
    <div css={styles.home}>
      <Container>
        <Typography variant={"h1"} css={styles.title}>
          Hi there 👋​
        </Typography>
        <Typography variant={"h1"} css={styles.subtitle}>
          Please check out the reviews page
        </Typography>

        <Button variant="contained" href="reviews" css={styles.button}>
          Click me!
        </Button>
      </Container>
    </div>
  );
};

const styles = {
  home: css({
    alignItems: "center",
    backgroundColor: `${colors.black}`,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
  }),
  title: css({
    color: `${colors.white}`,
    fontFamily: `${fonts.bigShoulders}`,
    fontSize: "80px",
  }),
  subtitle: css({
    color: `${colors.white}`,
    fontFamily: `${fonts.bigShoulders}`,
    fontSize: "50px",
    marginBottom: "30px",
  }),
  button: css({
    backgroundColor: `${colors.black}`,
    border: `1px solid ${colors.primary}`,
    color: `${colors.primary}`,
    fontSize: "20px",
    "&:hover": {
      backgroundColor: `${colors.primary}`,
      color: `${colors.white}`,
    },
  }),
};

export default Home;
