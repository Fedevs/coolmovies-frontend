import { css } from "@emotion/react";
import {
  Box,
  Rating,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import { Review } from "../../redux";

interface MovieReviewCardProps {
  review: Review;
}

const MovieReviewCard: FC<MovieReviewCardProps> = ({
  review: { movieByMovieId, rating, body, userByUserReviewerId, title },
}) => {
  const [expanded, setExpanded] = useState(false);
  const largeDescription: boolean = body?.length > 140;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card css={styles.card}>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        align="center"
        css={styles.movieTitle}
      >
        {movieByMovieId?.title}
      </Typography>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={movieByMovieId?.imgUrl}
          alt={movieByMovieId?.title}
        />

        <CardContent>
          <Rating
            name="rating"
            value={rating}
            readOnly
            size="large"
            css={styles.rating}
          />
          <Typography gutterBottom variant="h6" component="div" align="center">
            {title}
          </Typography>
          {body ? (
            <Box>
              <Typography variant="body2" color="text.secondary">
                <b>{userByUserReviewerId?.name}:&nbsp;</b>
                {expanded ? (
                  <Fragment>
                    "{body}"
                    <Button size="small" onClick={handleExpandClick}>
                      Read less
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    {`"${body.slice(0, 140)}${largeDescription ? "..." : ""}"`}
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
              <b>{userByUserReviewerId?.name}</b>
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const styles = {
  card: css({
    marginBottom: "10px",
  }),
  movieTitle: css({
    paddingTop: "5px",
    textAlign: "center",
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
