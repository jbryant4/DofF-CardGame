import User from '../types/user';

const apiBaseUrl = '/api/user';

export async function createUser(user: User): Promise<User> {
  const response = await fetch(`${apiBaseUrl}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
}

export async function editUser(id: string, user: User): Promise<User> {
  const response = await fetch(`${apiBaseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error('Failed to edit user');
  }

  return response.json();
}

export async function getUser(id: string): Promise<User> {
  const response = await fetch(`${apiBaseUrl}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to get user');
  }

  return response.json();
}

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
}
