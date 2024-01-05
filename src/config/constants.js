const PRODUCTION = false;

const AWS_COGNITO_SETTINGS = {
  Auth: {
    identityPoolId: 'us-east-1:d0c4a0dc-4ef8-473f-947b-ded3ac0cc9a2',
    region: 'us-east-1',
    identityPoolRegion: 'us-east-1',
    userPoolId: 'us-east-1_Z3M0dEOq8',
    userPoolWebClientId: '6rbr3ee93c0559d4ak5qi77uc5',
    mandatorySignIn: true
  },
  Storage: {
    AWSS3: {
      bucket: 'dtleadsbucket',
      region: 'us-east-1'
    }
  }
};

const S3_PUBLIC_URL = 'https://dtleadsbucketbucket.s3.amazonaws.com/public/';

const DTLEADS_DASHBOARD_URL = 'https://dashboard.danieltimothyleads.com';

const SEQUENCE_PROSPECT_STATES = [
  {
    label: 'PENDING',
    value: 1
  },
  {
    label: 'ACTIVE',
    value: 2
  },
  {
    label: 'PAUSED',
    value: 3
  }
];

export {
  PRODUCTION,
  AWS_COGNITO_SETTINGS,
  S3_PUBLIC_URL,
  SEQUENCE_PROSPECT_STATES,
  DTLEADS_DASHBOARD_URL
};
