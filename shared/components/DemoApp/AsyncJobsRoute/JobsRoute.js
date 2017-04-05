import React from 'react';
import { withJob } from 'react-jobs';

// eslint-disable-next-line react/prop-types
function JobRenderer({ jobResult }) {
  return (
    <div>
      {jobResult}
    </div>
  );
}
const LoadingComponent = () => <div>Loading...</div>;
// eslint-disable-next-line react/prop-types
const ErrorComponent = ({ error }) => <div>{error.message}</div>;

const JobOne = withJob({
  work: () => Promise.resolve('Job One server renders'),
  LoadingComponent,
  ErrorComponent,
})(JobRenderer);

const JobTwo = withJob({
  work: () => new Promise(resolve => setTimeout(() => resolve('Job Two defer renders'), 3000)),
  LoadingComponent,
  ErrorComponent,
  serverMode: 'defer',
})(JobRenderer);

const JobThree = withJob({
  work: () => {
    throw new Error('Job Three always throws an error');
  },
  LoadingComponent,
  ErrorComponent,
})(JobRenderer);

function JobsRoute() {
  return (
    <div>
      <JobOne />
      <JobTwo />
      <JobThree />
    </div>
  );
}

export default JobsRoute;
