import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

import Title from './Title';

export default function Chart(props) {
  const theme = useTheme();
  const data = props.data;

  return (
    <React.Fragment>
      <Title>Total</Title>
      {data && (
        <ResponsiveContainer>
          <LineChart
            data={data.chart_data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
              >
                Vendas (R$)
              </Label>
            </YAxis>
            <Line type="monotone" dataKey="price" stroke={theme.palette.primary.main} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
      {!data && (
        <CircularProgress />
      )}
    </React.Fragment>
  );
}