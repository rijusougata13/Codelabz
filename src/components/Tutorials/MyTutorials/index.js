import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import {
  clearTutorialsBasicData,
  getOrgTutorialsBasicData,
  getUserTutorialsBasicData,
} from '../../../store/actions';
// import UserTutorialsComponent from "./UserTutorials";
import OrgTutorialsComponent from './OrgTutorials';
import SearchComponent from './Search';

const MyTutorials = () => {
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const userHandle = useSelector(
    ({
      firebase: {
        profile: { handle },
      },
    }) => handle
  );

  const displayName = useSelector(
    ({
      firebase: {
        profile: { displayName },
      },
    }) => displayName
  );

  const photoURL = useSelector(
    ({
      firebase: {
        profile: { photoURL },
      },
    }) => photoURL
  );

  const organizations = useSelector(
    ({
      profile: {
        data: { organizations },
      },
    }) => organizations
  );

  const org_handles =
    organizations && organizations.length > 0
      ? organizations.map((org) => org.org_handle)
      : [];

  useEffect(() => {
    getUserTutorialsBasicData(userHandle)(firestore, dispatch);
  }, [userHandle, firestore, dispatch]);

  useEffect(() => {
    if (org_handles.length > 0)
      getOrgTutorialsBasicData(org_handles)(firestore, dispatch);
  }, [org_handles, firestore, dispatch]);

  useEffect(() => () => clearTutorialsBasicData()(dispatch), [dispatch]);

  const userDetails = {
    userHandle,
    displayName,
    photoURL,
  };

  return (
    <div className="row-footer-below">
      <Grid container>
        <Grid xs={12} className="mb-24">
          <SearchComponent />
        </Grid>
        {organizations && organizations.length > 0 && (
          <Grid xs={12} className="m-24">
            <OrgTutorialsComponent
              organizations={organizations}
              user={userDetails}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default MyTutorials;
