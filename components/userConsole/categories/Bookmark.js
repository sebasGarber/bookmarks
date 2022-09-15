import { Paper, TextField } from '@mui/material';
import React from 'react'
import classes from './../user-console.module.scss'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function Bookmark(props) {

    const { bookmark } = props;

    const openMe = () => { 

      window.open(bookmark?.url,'_blank');

     }



  return (
    <Card className={classes.bookmark} onClick={ openMe }>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {bookmark?.title}
          </Typography>
          {bookmark?.notes && <Typography variant="body2" color="textSecondary" component="p">
            {bookmark?.notes}
          </Typography> }
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          פתיחה
        </Button>
      </CardActions>
    </Card>

  )
}
