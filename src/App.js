import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect } from 'react';
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
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateApplicationEvent, { tenantId: process.env.TENANTID })
    ).subscribe({
      next: (eventData) => {
        console.log(`[SUBSCRIPTION] CreateApplicationEvent - Data received:`, JSON.stringify(eventData, null, 2));
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
    </div>
  );
}

export default App;
