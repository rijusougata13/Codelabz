import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexFlow: "row",
    padding: "2rem",
    [theme.breakpoints.down(750)]: {
      flexDirection: "column",
    },
  },
}));

export default useStyles;
