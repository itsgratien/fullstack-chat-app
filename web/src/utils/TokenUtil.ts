export const getToken = async () => {
  const get = await fetch('http://localhost:3000/api/token', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await get.json();
  return data.token;
};
