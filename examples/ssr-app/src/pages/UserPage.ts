import { createElement } from '@rocketcode/core';

export function UserPage(props: any) {
  const { user } = props;
  
  return createElement('div', { className: 'page' },
    createElement('h2', null, `User Profile: ${user?.name || 'Unknown'}`),
    user ? createElement('div', { className: 'user-info' },
      createElement('p', null, `ID: ${user.id}`),
      createElement('p', null, `Name: ${user.name}`),
      createElement('p', null, `Email: ${user.email}`),
      createElement('p', null, `Role: ${user.role}`)
    ) : createElement('p', null, 'User not found'),
    createElement('p', { className: 'ssr-note' },
      'This data was fetched on the server using getServerSideProps.'
    )
  );
}

// getServerSideProps function
export async function getServerSideProps(context: any) {
  const { params } = context;
  const userId = params.id;

  // Simulate API call
  const user = await fetchUserData(userId);

  if (!user) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      user
    }
  };
}

// Mock function to fetch user data
async function fetchUserData(id: string) {
  // Simulate database lookup
  const users = {
    '1': { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    '2': { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  };

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  return users[id as keyof typeof users] || null;
} 