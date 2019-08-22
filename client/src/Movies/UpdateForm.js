import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik, Formik } from 'formik';
import * as Yup from 'yup';
// import UserCard from './UserCard';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  media: {
    height: 200
  }
});
// const initialMovie =  {
//       title: title || '',
//       director: director || '',
//       metascore: metascore || '',
//       stars: stars || []
//
// }

const UpdateForm = ( { status, values }) => {
  const [movie, setMovie] = useState()
  const classes = useStyles();



useEffect(() => {
    axios.get(`http://localhost:5000/api/movies`).then(res => {
      setMovie(res.data);
    });
  }, [status]);

  return (
    <>
      <div className="container2">
        <Card className={classes.card}>
          <h2> Update Form</h2>
          <Form className="formCon">
            <Field type="text" name="title" placeholder="title..." />
            <Field type="text" name="director" placeholder="director..." />
            <Field type="text" name="metascore" placeholder="metascore..." />
            <Field type="text" name="stars" placeholder="stars..." />
            <Button className="button">Confirm update</Button>
          </Form>
        </Card>
      </div>
    </>
  );
};


const FormikUpdateForm = withFormik({
  mapPropsToValues({ title, director, metascore, stars }) {
    return {
      title: title || '',
      director: director || '',
      metascore: metascore || '',
      stars: stars || [],

    };
  },


  handleSubmit(values, { resetForm, setStatus }) {

    axios
      .put(`http://localhost:3000/api/movies/1`, values)
      .then(res => {
        console.log(res);
        setStatus(res)


        resetForm();
      })

      .catch(err => console.log(err));
  }
})(UpdateForm);

export default FormikUpdateForm;
