import { css } from "@emotion/react";
import {
  Box,
  Rating,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import { Review } from "../../redux";
import Image from "next/image";
import editIcon from "../../public/edit.svg";
import { useAppSelector, reviewsActions, useAppDispatch } from "../../redux";
import { colors, fonts } from "../../styles/customStyles";

interface MovieReviewCardProps {
  review: Review;
}

const MovieReviewCard: FC<MovieReviewCardProps> = ({ review }) => {
  const dispatch = useAppDispatch();
  const reviewsState = useAppSelector((state) => state.reviews);

  const [expanded, setExpanded] = useState(false);
  const largeDescription: boolean = review.body?.length! > 140;
  const showEditButton: boolean =
    reviewsState.user.id === review.userByUserReviewerId?.id;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    dispatch(reviewsActions.setMovieReviewModalStatus({ open: true, review }));
  };

  return (
    <Card css={styles.card}>
      <CardContent>
        {showEditButton && (
          <IconButton
            aria-label="edit"
            css={styles.editIcon}
            onClick={handleEdit}
          >
            <Image src={editIcon} width={20} height={20}></Image>
          </IconButton>
        )}
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          align="center"
          sx={{ color: `${colors.primary}`, fontFamily: `${fonts.secondary}` }}
        >
          <b>{review.movieByMovieId?.title}</b>
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="180"
        image={review.movieByMovieId?.imgUrl}
        alt={review.movieByMovieId?.title}
      />
      <CardContent>
        <Rating
          name="rating"
          value={review.rating}
          readOnly
          size="large"
          css={styles.rating}
        />
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          align="center"
          sx={{ overflowWrap: "break-word" }}
        >
          {review.title}
        </Typography>
        {review.body ? (
          <Box sx={{ overflowWrap: "break-word" }}>
            <Typography variant="body2" color="text.secondary">
              <b>{review.userByUserReviewerId?.name}:&nbsp;</b>
              {expanded ? (
                <Fragment>
                  "{review.body}"
                  <Button size="small" onClick={handleExpandClick}>
                    Read less
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  {`"${review.body.slice(0, 140)}${
                    largeDescription ? "..." : ""
                  }"`}
                  {largeDescription && (
                    <Button size="small" onClick={handleExpandClick}>
                      Read more
                    </Button>
                  )}
                </Fragment>
              )}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2" css={styles.userName}>
            <b>{review.userByUserReviewerId?.name}</b>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const styles = {
  card: css({
    position: "relative",
    marginBottom: "10px",
    borderRadius: "30px 0px 30px 0px",
    boxShadow: `0px 1px 3px  ${colors.primary}`,
  }),
  editIcon: css({
    position: "absolute",
    padding: 0,
    top: "2px",
    right: "2px",
  }),
  rating: css({
    display: "flex",
    justifyContent: "center",
    marginBottom: "5px",
  }),
  userName: css({
    display: "flex",
    justifyContent: "flex-end",
  }),
};

export default MovieReviewCard;
