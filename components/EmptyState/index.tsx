import { css } from "@emotion/react";
import { Typography, Button, Stack } from "@mui/material";
import { FC } from "react";
import { colors, fonts } from "../../styles/customStyles";

interface EmptyStateProps {
  text?: string;
  buttonText: string;
  onClick: () => void;
}

const EmptyState: FC<EmptyStateProps> = ({ text, buttonText, onClick }) => {
  return (
    <Stack spacing={3} css={styles.emptyState}>
      <Typography variant={"h3"}>😞​</Typography>
      {text && (
        <Typography
          variant={"h3"}
          css={{ fontFamily: `${fonts.bigShoulders}` }}
        >
          {text}
        </Typography>
      )}
      <Button variant="contained" onClick={onClick} css={styles.button}>
        {buttonText}
      </Button>
    </Stack>
  );
};
const styles = {
  emptyState: css({
    alignItems: "center",
    color: `${colors.white}`,
    display: "flex",
    justifyContent: "center",
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

export default EmptyState;
