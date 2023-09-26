import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import './App.css';
import './amplify-config';

const onCreateApplicationEvent = /* GraphQL */ `
  subscription OnCreateApplicationEvent($tenantId: String) {
    oncreateApplicationEvent(tenantId: $tenantId) {
      tenantId
      application_id
      application_name
      environment
    }
  }
`;

function App() {
  const [subscriptionData, setSubscriptionData] = useState(null);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateApplicationEvent, { tenantId: process.env.REACT_APP_TENANT_ID })
    ).subscribe({
      next: (eventData) => {
        console.log(`[SUBSCRIPTION] CreateApplicationEvent - Data received:`, JSON.stringify(eventData, null, 2));
        setSubscriptionData(eventData.value.data.oncreateApplicationEvent);
      },
      error: (error) => {
        console.error(`[SUBSCRIPTION] CreateApplicationEvent - Error:`, error);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <h1>Amplify Subscriptions Example</h1>
      {subscriptionData ? (
        <div>
          <h3>Subscription Data:</h3>
          <pre>{JSON.stringify(subscriptionData, null, 2)}</pre>
        </div>
      ) : (
        <p>Waiting for subscription data...</p>
      )}
    </div>
  );
}

export default App;
