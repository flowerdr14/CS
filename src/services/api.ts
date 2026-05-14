import { Patient } from '../types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

const getHeaders = () => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (API_TOKEN) {
    headers['x-api-token'] = API_TOKEN;
  }
  return headers;
};

export const apiService = {
  fetchPatients: async (): Promise<Patient[]> => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/patients`, {
        headers: getHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch patients');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return [];
    }
  },

  savePatient: async (patient: Patient): Promise<boolean> => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/patients`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(patient),
      });
      return response.ok;
    } catch (error) {
      console.error('API Error:', error);
      return false;
    }
  },

  updatePatient: async (patient: Patient): Promise<boolean> => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/patients/${patient.id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(patient),
      });
      return response.ok;
    } catch (error) {
      console.error('API Error:', error);
      return false;
    }
  },

  deletePatient: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/patients/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return response.ok;
    } catch (error) {
      console.error('API Error:', error);
      return false;
    }
  }
};
