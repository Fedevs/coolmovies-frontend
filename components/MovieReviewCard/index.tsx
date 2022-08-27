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
import { FC, useState } from "react";
import { Review } from "../../redux";

interface MovieReviewCardProps {
  review: Review;
}

const MovieReviewCard: FC<MovieReviewCardProps> = ({
  review: { movieByMovieId, rating, body, title },
}) => {
  const [expanded, setExpanded] = useState(false);

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
          {body && (
            <Box>
              {expanded ? (
                <Typography variant="body2" color="text.secondary">
                  {body}
                  <Button size="small" onClick={handleExpandClick}>
                    Read less
                  </Button>
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {`${body.slice(0, 140)}...`}
                  <Button size="small" onClick={handleExpandClick}>
                    Read more
                  </Button>
                </Typography>
              )}
            </Box>
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
};

export default MovieReviewCard;
