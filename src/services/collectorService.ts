import { NextApiRequest, NextApiResponse } from 'next';
import Card, { CardDocument } from '~/models/Card';
import { CollectorDocument } from '~/models/Collector';

export const newCollector = async collector => {
  try {
    const response = await fetch(`/api/collector`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collector)
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating collector:', error);
    throw new Error('Failed to create card');
  }
};

export const updateCollector = async collectorData => {
  try {
    const response = await fetch(`/api/collector`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collectorData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error updating card:', error);
    throw new Error('Failed to update card');
  }
};

export const findCollectorByEmail = async email => {
  try {
    const response = await fetch(`/api/collector?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error finding collector:', error);
    throw new Error('Failed to find collector');
  }
};

export const findCollectorByUserName = async userName => {
  try {
    const response = await fetch(`/api/collector?userName=${userName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error finding collector:', error);
    throw new Error('Failed to find collector');
  }
};

export async function deleteCollector(id: string): Promise<void> {
  const response = await fetch(`/api/collector?id=${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
}
