import React, { useState } from 'react';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';

import { useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const vendors = {
  'jdrumond96@gmail.com': 'Brida',
  'amandareblin@hotmail.com': 'Aroom e Venice',
  'usepampz@gmail.com': 'Pampz',
  'contato@usetimeless.com.br': 'Timeless',
  'Cesar.ferrari29@gmail.com': 'O P Ü S',
  'amanda_loss.v@hotmail.com': 'Feather Jeans',
  'queirozalessandro1@gmail.com': 'Feather Jeans',
  'sahvana.dev@gmail.com': 'Brida'
}


export default function Chart() {
  const theme = useTheme();
  const [ session, loading ] = useSession();
  const fetcher = async () => {
    const res = await fetch('https://sahvana-admin.herokuapp.com/api/agg_orders', {
        body: JSON.stringify({
            Vendor: vendors[session.user.email],
          }),
          headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          });
  
    return await res.json();
  };
  
  const { data, error} = useSWR('https://sahvana-admin.herokuapp.com/api/agg_orders', fetcher);

  return (
    <React.Fragment>
      <Title>Total</Title>
      {data && (
        <ResponsiveContainer>
          <LineChart
            data={data.data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
              >
                Vendas (R$)
              </Label>
            </YAxis>
            <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
      {!data && (
        <CircularProgress />
      )}
    </React.Fragment>
  );
}