import { css } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import Image from "next/image";
import {
  Review,
  reviewsActions,
  useAppDispatch,
  useAppSelector,
} from "../../../redux";
import editIcon from "../../../public/edit.svg";
import { colors, fonts } from "../../assets/styles/customStyles";

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
            <Image src={editIcon} width={25} height={25}></Image>
          </IconButton>
        )}
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          align="center"
          sx={{
            color: `${colors.primary}`,
            fontFamily: `${fonts.secondary}`,
            textTransform: "uppercase",
          }}
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
    backgroundColor: `${colors.white}`,
    borderRadius: "4px",
    boxShadow: `6px 5px 10px 0px  ${colors.grey}`,
    marginBottom: "10px",
    position: "relative",
    transition: "all .2s ease-in",
    "&:hover": {
      transform: "translate(-5px, -5px)",
      boxShadow: `4px 5px 10px 0px  ${colors.primary}}`,
    },
  }),
  editIcon: css({
    backgroundColor: `${colors.primary}`,
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "0px",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "0px",
    padding: "5px 10px",
    position: "absolute",
    right: "-2px",
    top: "17px",
    "&:hover": {
      backgroundColor: `${colors.black}`,
    },
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
