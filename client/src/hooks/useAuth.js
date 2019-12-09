import React, { useState, Component, useEffect } from "react";
import { auth } from "../actions/user";
import { useSelector, useDispatch } from "react-redux";

const useAuth = (ComposedClass, reload, adminRoute = null) => {
  const AuthenticationCheck = props => {
    let user = useSelector(state => state.user);
    console.log(user);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then(response => {
        if (!response.payload.isAuth) {
          if (reload) {
            props.history.push("/register_login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (reload === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, [dispatch, props.history]);
    return <ComposedClass props={props} user={user} />;
  };

  return AuthenticationCheck;
};

export default useAuth;
