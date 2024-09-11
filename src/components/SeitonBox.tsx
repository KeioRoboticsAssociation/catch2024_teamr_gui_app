import { useState } from 'react';
import styled from '@emotion/styled/macro';
import ROSLIB from 'roslib';
import { Box, Button, IconButton, Paper } from '@mui/material';
import Add from '@mui/icons-material/Add';
import { Remove } from '@mui/icons-material';

type SeitonBoxProps = {
  id: number;
  setoshios: {
    ebishio: number;
    yuzushio: number;
    norishio: number;
  };
  sendCount: (
    box_id: number,
    color: 'ebishio' | 'norishio' | 'yuzushio',
    plusminux: boolean,
  ) => void;
  onClick: (num: number) => void;
  color: boolean;
  isRecommend: boolean[];
};

type Color = 'red' | 'green' | 'yellow';

type CounterProps = {
  setoshio: { num: number; setNum: (isPlus: boolean) => void };
  color: Color;
};
const Counter = ({ setoshio: { num, setNum }, color }: CounterProps) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'grid',
      gridAutoFlow: 'column',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '5px',
      placeItems: 'center',
      margin: 'auto 1px',
    }}
  >
    <Button
      style={{
        width: '90%',
        height: '90%',
        padding: 0,
        minWidth: 0,
        backgroundColor: '#ff8585',
      }}
      variant={'contained'}
      onClick={() => setNum(true)}
    >
      <Remove />
    </Button>
    <div
      style={{
        margin: 'auto',
        textAlign: 'center',
        verticalAlign: 'middle',
        padding: '0',
        fontSize: 30,
        color,
        // backgroundColor: color,
        // color: 'black'
      }}
    >
      {3 - num}
    </div>
    <Button
      style={{
        width: '90%',
        height: '90%',
        padding: 0,
        minWidth: 0,
      }}
      variant={'contained'}
      onClick={() => setNum(false)}
      color="primary"
    >
      <Add />
    </Button>
  </div>
);

const RecommendIcon = (props: { color: string; display: boolean }) => (
  <div
    style={{
      width: '30px',
      height: '30px',
      borderRadius: '20%',
      backgroundColor: props.color,
      opacity: props.display ? 1 : 0,
    }}
  >
    {' '}
  </div>
);

export default function SeitonBox(props: SeitonBoxProps) {
  const { id, setoshios, onClick, sendCount, color, isRecommend } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: id % 2 === (color ? 0 : 1) ? 'row' : 'row-reverse',
        width: '90%',
        height: '90%',
        order: !color ? id : id % 2 === 0 ? id + 1 : id - 1,
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '90%',
          flexGrow: 1,
          margin: 'auto 5px',
        }}
      >
        <Button
          onClick={() => onClick(id)}
          style={{
            width: '100%',
            height: '100%',
            fontSize: 50,
            color: 'white',
            border: '2px solid',
          }}
          variant={'outlined'}
        >
          {id}
        </Button>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '0 5px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <RecommendIcon color={'#31f59d'} display={isRecommend[2]} />
          <RecommendIcon color={'#ff4242'} display={isRecommend[0]} />
          <RecommendIcon color={'yellow'} display={isRecommend[1]} />
        </div>
      </div>
      <div
        style={{
          flexGrow: 2,
          height: '90%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: 'auto 5px',
        }}
      >
        <Counter
          setoshio={{
            num: setoshios.norishio,
            setNum: (isPlus: boolean) => sendCount(id, 'norishio', isPlus),
          }}
          color={'#31f59d'}
          // color={'#b1ff99'}
        />
        <Counter
          setoshio={{
            num: setoshios.ebishio,
            setNum: (isPlus: boolean) => sendCount(id, 'ebishio', isPlus),
          }}
          color={'#ff4242'}
          // color={'#ff99aa'}
        />
        <Counter
          setoshio={{
            num: setoshios.yuzushio,
            setNum: (isPlus: boolean) => sendCount(id, 'yuzushio', isPlus),
          }}
          color={'yellow'}
          // color={'#faff99'}
        />
      </div>
    </div>
  );
}
