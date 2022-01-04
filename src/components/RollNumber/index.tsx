import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
// import 'index.css';
import { CSSProperties, useEffect, useState } from 'react';

interface IProps {
  num: number;
  prefix?: string;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
}

export const RollNumber = observer(({ num, fontSize = 65, color = 'black', fontWeight = 600, prefix }: IProps) => {
  const transferNumberToArray = (str) => {
    if (!str) return 0;
    str = String(str);
    var newStr = '';
    var count = 0;
    if (str.indexOf('.') == -1) {
      for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + ',' + newStr;
        } else {
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      str = newStr;
      return str.split('');
    } else {
      for (var i = str.indexOf('.') - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + ',' + newStr;
        } else {
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      str = newStr + (str + '00').substr((str + '00').indexOf('.'), 3);
      return str.split('');
    }
  };

  const [numberArray, setNumberArray] = useState(['0']);

  const ScrollNumberItemStyle = (): CSSProperties => {
    return {
      width: '40px',
      height: '400px',
      color,
      fontWeight: 600,
      float: 'left',
      position: 'relative',
      transition: 'top 1s',
      textAlign: 'center'
    };
  };

  const ScrollNumberContainerStyle = (): CSSProperties => {
    return {
      width: '400px',
      height: fontSize + 'px',
      background: 'white',
      lineHeight: fontSize + 'px',
      fontFamily: 'Gilroy, sans-serif',
      fontSize: fontSize + 'px',
      overflow: 'hidden'
    };
  };

  useEffect(() => {
    setNumberArray(transferNumberToArray(num));
  }, [num]);

  return (
    <>
      {numberArray ? (
        <Box
          className="scroll-number-container"
          id="myScrollNumbers"
          style={{
            ...ScrollNumberContainerStyle()
          }}
        >
          {prefix && (
            <Box float="left" style={ScrollNumberItemStyle()}>
              {prefix}
            </Box>
          )}

          {numberArray.map((item) => {
            if (item == ',') {
              return (
                <Box
                  style={{
                    ...ScrollNumberItemStyle(),
                    width: '20px'
                  }}
                >
                  ,
                </Box>
              );
            } else if (item == '.') {
              return (
                <Box
                  style={{
                    ...ScrollNumberItemStyle(),
                    width: '20px'
                  }}
                >
                  .
                </Box>
              );
            } else {
              return (
                <Box
                  style={{
                    ...ScrollNumberItemStyle(),
                    top: '' + -fontSize * Number(item) + 'px'
                  }}
                >
                  0
                  <br />
                  1
                  <br />
                  2
                  <br />
                  3
                  <br />
                  4
                  <br />
                  5
                  <br />
                  6
                  <br />
                  7
                  <br />
                  8
                  <br />9
                </Box>
              );
            }
          })}
        </Box>
      ) : (
        <Box
          className="scroll-number-container"
          id="myScrollNumbers"
          style={{
            ...ScrollNumberContainerStyle()
          }}
        >
          <Box
            style={{
              ...ScrollNumberItemStyle(),
              width: '20px'
            }}
          >
            0
          </Box>
        </Box>
      )}
    </>
  );
});
