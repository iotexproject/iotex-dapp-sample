import React, { useEffect, useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Box, Text, Button, Center, Container, Flex, HStack, useRadio, useRadioGroup, Menu, MenuButton, MenuList, MenuItem, Avatar, AvatarBadge } from '@chakra-ui/react';
import { Line } from '@nivo/line';
import { linearGradientDef } from '@nivo/core';
import { v4 as uuidv4 } from 'uuid';
import { RollNumber } from '@/components/RollNumber';
import { ChevronDownIcon } from '@chakra-ui/icons';
import _ from 'lodash';
import { useStore } from '../store';
import { ETHMainnetConfig } from 'config/ETHMainnetConfig';
import { BSCMainnetConfig } from 'config/BSCMainnetConfig';
import { IotexMainnetConfig } from 'config/IotexMainnetConfig';
import { PolygonMainnetConfig } from 'config/PolygonMainnetConfig';
import dayjs from 'dayjs';
import axios from 'axios';

const Chart = observer(() => {
  const { god } = useStore();

  // const [data, setData] = useState<any | null>(null);

  const store = useLocalObservable(() => ({
    data: [
      {
        id: 'chart',
        color: '#ff656d',
        data: []
      }
    ],
    num: 0,
    lastDataY: 1,
    poNe: '-',
    colors: {
      '+': '#5dd170',
      '-': '#ff656d'
    },
    defaultRadioValue: '24H',
    growthLabel: '',
    timeRangLabel: 'Past 24 Hours',
    timeRange: {
      to: dayjs().unix(),
      from: dayjs().subtract(1, 'day').unix()
    },
    yScaleRange: {
      max: 0,
      min: 0
    },
    curChartChainIdx: 0,
    chartWidth: 0,
    get curChartChain() {
      return this.networks[this.curChartChainIdx];
    },
    get color() {
      return this.colors[this.poNe];
    },
    get networks() {
      return [ETHMainnetConfig, BSCMainnetConfig, IotexMainnetConfig, PolygonMainnetConfig];
    },
    get firstDataY() {
      return this.data[0].data[0]?.y || 1;
    },
    setTimeRangLabel(val: any) {
      this.timeRangLabel = val;
    },
    setChartChain(index: number) {
      this.curChartChainIdx = index;
      this.getMarketChatRange();
    },
    setPoNe(poNe: '+' | '-') {
      this.poNe = poNe;
    },
    setNum(val: any) {
      this.num = val;
      this.setGrowthLabel(val);
    },
    setTimeRang(val: { from: number; to: number }) {
      this.timeRange = val;
      this.getMarketChatRange();
    },
    setChartWidth(val: number) {
      this.chartWidth = val;
    },
    setData(val: number) {
      this.data = val;
    },
    setDefaultRadioValue(val) {
      this.defaultRadioValue = val;
    },
    setLastDayY() {
      this.lastDataY = this.data[0].data[this.data[0].data.length - 1]?.y || 1;
    },
    setGrowthLabel(minuend) {
      if (this.data[0].data) {
        let difference = this.lastDataY - minuend;
        if (difference > 0) {
          this.setPoNe('+');
        } else {
          this.setPoNe('-');
        }
        let differencePercent = (Math.abs(difference) / this.lastDataY) * 100;
        this.growthLabel = `${this.poNe}$${Math.abs(difference).toFixed(6)}(${this.poNe}${differencePercent.toFixed(2)}%)`;
      }
    },
    initNum() {
      this.num = this.lastDataY;
    },
    async getMarketChatRange() {
      let res = (await axios.get(this.curChartChain.coingeckoAPI(store.timeRange))).data;
      store.data[0].data = [];
      store.data[0].data = _.chunk(
        res.prices.map((i) => {
          return {
            x: dayjs(i[0]).format('MM-DD hh:mm:ss'),
            y: i[1] ? i[1] : i[0]
          };
        }),
        2
      ).map((i) => i[1]);
      this.yScaleRange = {
        max: _.maxBy(store.data[0].data, 'y').y,
        min: _.minBy(store.data[0].data, 'y').y
      };
      this.setLastDayY();
      this.initNum();
      this.setGrowthLabel(store.firstDataY);
    }
  }));

  const BarTooltip = (props) => {
    return (
      <Box bg="white" border={'1px solid #ff656d'} padding={'1px 4px'} borderRadius={'5px'}>
        {props.point.data.x}
      </Box>
    );
  };

  useEffect(() => {
    console.log('chane');
    store.getMarketChatRange();
    getChartWidth();
    window.onresize = () => {
      return _.debounce(getChartWidth)();
    };
  }, []);

  const RadioCard = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          color="rgb(165 165 165)"
          cursor="pointer"
          _checked={{
            color: 'rgb(31, 31, 65)'
          }}
          _focus={{}}
          px={2}
          py={2}
        >
          {props.children}
        </Box>
      </Box>
    );
  };

  const getChartWidth = () => {
    store.setChartWidth(document.body.clientWidth - 25);
  };

  const TimeRadio = () => {
    const options = ['24H', '1W', '1M'];
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'framework',
      defaultValue: store.defaultRadioValue,
      onChange: (e) => {
        console.log(e);
        switch (e) {
          case '24H':
            store.setTimeRang({
              to: dayjs().unix(),
              from: dayjs().subtract(1, 'day').unix()
            });
            store.setTimeRangLabel('Past 24 Hours');
            break;
          case '1W':
            store.setTimeRang({
              to: dayjs().unix(),
              from: dayjs().subtract(1, 'week').unix()
            });
            store.setTimeRangLabel('Past Week');
            break;
          case '1M':
            store.setTimeRang({
              to: dayjs().unix(),
              from: dayjs().subtract(1, 'month').unix()
            });
            store.setTimeRangLabel('Past Month');
            break;
          default:
            store.setTimeRang({
              to: dayjs().unix(),
              from: dayjs().subtract(1, 'day').unix()
            });
            break;
        }
        store.setDefaultRadioValue(e);
      }
    });
    const group = getRootProps();
    return (
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
    );
  };

  return (
    <Container maxW="100%" mt="100px">
      <Center>
        <Avatar mr="2" src={store.curChartChain.logoUrl} cursor="pointer" bg="transparent" size="md"></Avatar>

        <Text fontSize={'2.5rem'} fontWeight={'500'}>
          {store.curChartChain?.name}
        </Text>

        <Text fontSize={'2.5rem'} fontWeight={'500'} color={'rgb(117, 120, 181)'}>
          ({store.curChartChain?.Coin.symbol})
        </Text>

        <Box ml={'auto'}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Text>{store.curChartChain?.name}</Text>
            </MenuButton>
            <MenuList>
              {store.networks.map((i, index) => {
                return (
                  <MenuItem onClick={() => store.setChartChain(index)}>
                    {' '}
                    <Avatar mr="2" src={i.logoUrl} cursor="pointer" bg="transparent" size="sm">
                      {store.curChartChainIdx == index && <AvatarBadge boxSize="1em" bg="green.500" />}
                    </Avatar>
                    {i.name}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </Box>
      </Center>

      <Flex>
        <RollNumber prefix="$" num={store.num} color="rgb(31, 31, 65)"></RollNumber>
      </Flex>

      <Flex mt="2">
        <Box fontFamily={'sans-serif'} fontSize={'18px'} color={store.color}>
          {store.growthLabel}
        </Box>
        <Box fontFamily={'sans-serif'} fontSize={'18px'} ml="2">
          {store.timeRangLabel}
        </Box>
      </Flex>

      {store.data && (
        <Flex flexDirection={'column'} width="fit-content">
          <Line
            margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
            height={500}
            width={store.chartWidth}
            data={store.data}
            enableGridX={false}
            enableGridY={false}
            enableArea={true}
            yScale={{
              type: 'linear',
              stacked: true,
              max: store.yScaleRange.max,
              min: store.yScaleRange.min
            }}
            colors={store.color}
            defs={[
              linearGradientDef('gradientA', [
                { offset: 0, color: store.color, opacity: 0.5 },
                { offset: 4, color: store.color, opacity: 0 }
              ])
            ]}
            fill={[{ match: '*', id: 'gradientA' }]}
            xScale={{ type: 'point' }}
            axisBottom={null}
            axisLeft={null}
            tooltip={BarTooltip}
            useMesh={true}
            crosshairType="x"
            pointSize={1}
            onMouseMove={(point) => {
              store.setNum(point.data.y);
            }}
            onMouseLeave={() => {
              // console.log(data.at(-1)[0].data.at(-1).y);
              // store.setNum(data.at(-1).y);
              store.initNum();
              store.setGrowthLabel(store.firstDataY);
            }}
          />
          <Box ml="auto">
            <TimeRadio />
          </Box>
        </Flex>
      )}
    </Container>
  );
});

export default Chart;
