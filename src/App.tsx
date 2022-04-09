import { useEffect, useRef, useState } from 'react'
import {Card, Avatar, Input, message, Spin} from 'antd';
import {AxiosResponse} from 'axios';
import {debounce} from 'lodash';
import {searchQq} from './config/api';
import './App.css'
import 'antd/dist/antd.css'

const {Meta} = Card;

interface QqRes {
  qq: string;
  name: string;
  qlogo: string;
}

// 优化使用effect页面渲染时会默认触发无效请求
const useUpdateEffect = (effect: Function, deps: any) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

function App() {
  const [qq, setQq] = useState('');
  const inputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setQq(e.target.value);
  }, 300);
  const [qqList, setList] = useState<QqRes>();
  const [loading, setLoading] = useState(false);

  useUpdateEffect(() => {
    setLoading(true);

    searchQq(qq)
    .then((res: AxiosResponse) => {
      if (res.status === 200) {
        const data = res.data;

        if (data.code !== 1) {
          message.error(data.msg);
        }
        else {
          const {qq, qlogo, name} = data;
          let ret: QqRes = {
            qq,
            qlogo,
            name
          };
          setList(ret);
        }
      }
      else {
        message.error('查询失败！')
      }

      setLoading(false);
    })
  }, [qq]);

  return (
    <div className="App">
      <h1>QQ号查询</h1>
      <div className="search-input">
        QQ<Input onChange={inputChange} placeholder="请输入QQ号" />
      </div>
      <Spin spinning={loading} delay={500} wrapperClassName="search-result">
        {
          qqList
          ? (<Meta
            className="search-result"
                avatar={<Avatar src={qqList.qlogo} />}
                title={qqList.name}
                description={qqList.qq}
              />)
          : null 
        }
      </Spin>
    </div>
  )
}

export default App
