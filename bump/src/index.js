import React from 'react';
import ReactDOM from 'react-dom';
import {ResponsiveBump} from '@nivo/bump';

class App extends React.Component {
  render() {

    const data = [
      {
        "id": "Serie 1",
        "data": [
          {
            "x": 2000,
            "y": 2
          },
          {
            "x": 2001,
            "y": 9
          },
          {
            "x": 2002,
            "y": 2
          }
        ]
      },
      {
        "id": "Serie 2",
        "data": [
          {
            "x": 2000,
            "y": 6
          },
          {
            "x": 2001,
            "y": 11
          },
          {
            "x": 2002,
            "y": 1
          }
        ]
      },
    ]

    return (
      <>
        <div>Hello World</div>
        <div style={{'width': '100%', 'height': '300px'}}>
        <ResponsiveBump
          data={data}
          colors={{scheme: 'spectral'}}
          lineWidth={3}
          activeLineWidth={6}
          inactiveLineWidth={3}
          inactiveOpacity={0.15}
          pointSize={10}
          activePointSize={16}
          inactivePointSize={0}
          pointColor={{theme: 'background'}}
          pointBorderWidth={3}
          activePointBorderWidth={3}
          pointBorderColor={{from: 'serie.color'}}
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -36,
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'ranking',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          margin={{top: 40, right: 100, bottom: 40, left: 60}}
          axisRight={null}
        />
        </div>
      </>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
