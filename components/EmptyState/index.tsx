import { Typography, Button, Stack, css } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

interface EmptyStateProps {
  text?: string;
  buttonText: string;
  imageProps: {
    src: string;
    width?: number;
    height?: number;
  };
  onClick: () => void;
}

const EmptyState: FC<EmptyStateProps> = ({
  text,
  imageProps,
  buttonText,
  onClick,
}) => {
  return (
    <Stack spacing={3} css={styles.emptyState}>
      {imageProps.src && <Image {...imageProps}></Image>}
      {text && <Typography variant={"h3"}>{text}</Typography>}

      <Button variant="contained" onClick={onClick}>
        {buttonText}
      </Button>
    </Stack>
  );
};
const styles = {
  emptyState: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
};

export default EmptyState;
