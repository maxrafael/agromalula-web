import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Profile from '~/pages/Profile';

import Dashboard from '~/pages/Dashboard';
import Matrix from '~/pages/Matrix';
import Breeder from '~/pages/Breeder';
import Bull from '~/pages/Bull';
import Mating from '~/pages/Mating';

import MatrixForm from '~/pages/MatrixForm';
import BreederForm from '~/pages/BreederForm';
import BullForm from '~/pages/BullForm';
import MatingForm from '~/pages/MatingForm';
import File from '~/pages/File';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/matrices" exact component={Matrix} isPrivate />
      <Route path="/matrices/add" exact component={MatrixForm} isPrivate />
      <Route path="/matrices/:id" exact component={MatrixForm} isPrivate />

      <Route path="/breeders" exact component={Breeder} isPrivate />
      <Route path="/breeders/add" exact component={BreederForm} isPrivate />
      <Route path="/breeders/:id" exact component={BreederForm} isPrivate />

      <Route path="/bulls" exact component={Bull} isPrivate />
      <Route path="/bulls/add" exact component={BullForm} isPrivate />
      <Route path="/bulls/:id" exact component={BullForm} isPrivate />

      <Route path="/matings" exact component={Mating} isPrivate />
      <Route path="/matings/add" exact component={MatingForm} isPrivate />
      <Route path="/matings/:id" exact component={MatingForm} isPrivate />

      <Route path="/files/:id" exact component={File} isPrivate />

      <Route path="/" component={() => <h1>404! Page not found</h1>} />
    </Switch>
  );
}
