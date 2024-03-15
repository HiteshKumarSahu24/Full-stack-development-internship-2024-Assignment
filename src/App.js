import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import Chart from 'react-apexcharts'

export const App = () => {
  const [hotel, setHotel] = useState({});

  useEffect(() => {

    // ----Fetching the data----
    axios.get('https://checkinn.co/api/v1/int/requests').then((res) => {
        const requests = res.data.requests;

        const NumberOfHotels = {};
        requests.forEach((req) => {
          return NumberOfHotels[req.hotel.name] = (NumberOfHotels[req.hotel.name] || 0) + 1;
        });
        setHotel(NumberOfHotels);
        // console.log(hotel)

      }).catch((error) => {
        console.log("Error while fetching the data", error);
      });
  }, []);

  // -----setting the data for chart-----
  const options = {
    series: [{
      name: 'Requests',
      data: Object.values(hotel),
    }],
    xaxis: {
      categories: Object.keys(hotel),
    },
    title: {
      text: 'Requests per Hotel',
      align: 'center'
    },
  };

  return (
    <>
        <div className='chart-container'>
          <Chart options={options} series={options.series} type="line" />
        </div>
    </>
  );

}

// export default App;
