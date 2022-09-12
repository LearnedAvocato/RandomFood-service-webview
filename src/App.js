import {useState} from 'react';

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    try {
      var url = new URL("http://127.0.0.1:3001/getRandomFood"),
      params = {latitude:35.696233, longitude:139.570431}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  return (
    <div>
      {err && <h2>{err}</h2>}

      <button onClick={handleClick}>Make request</button>

      {isLoading && <h2>Loading...</h2>}

      {data && (
        <div>
          <h2>Data: {JSON.stringify(data, null, 4)}</h2>
        </div>
      )}
    </div>
  );
};

export default App;