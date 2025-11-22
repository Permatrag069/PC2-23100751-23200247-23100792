import axios from 'axios'

const API_URL = 'https://digimon-api.vercel.app/api/digimon'

export const getAllDigimons = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    throw error
  }
}
