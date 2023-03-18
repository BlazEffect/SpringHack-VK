import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  TabbarItem,
  Tabbar,
  Epic,
  usePlatform,
  useAdaptivityConditionalRender,
  Platform,
  PanelHeaderBack,
  Panel,
  PanelHeader,
  Group, Placeholder
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import {
  Icon28ClipOutline,
  Icon28MessageOutline,
  Icon28NewsfeedOutline,
  Icon28ServicesOutline,
  Icon28UserCircleOutline, Icon56NewsfeedOutline
} from "@vkontakte/icons";

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
  const [simple, setSimple] = useState('one');
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const [activeStory, setActiveStory] = React.useState('profile');
  const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
  const isVKCOM = platform !== Platform.VKCOM;

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const go = e => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id='home' fetchedUser={fetchedUser} go={go} />
                <Persik id='persik' go={go} />
              </View>
            </SplitCol>

            <SplitCol>
              <Epic
                  activeStory={activePanel}
                  tabbar={
                      viewWidth.tabletMinus && (
                          <Tabbar className={viewWidth.tabletMinus.className}>
                            <TabbarItem
                                onClick={onStoryChange}
                                selected={activePanel === 'home'}
                                data-story="home"
                                text="Новости"
                            >
                              <Icon28NewsfeedOutline />
                            </TabbarItem>
                          </Tabbar>
                      )
                  }
              >
                <View id="home" activePanel="home">
                  <Panel id="home">
                    <PanelHeader before={<PanelHeaderBack />}>Новости</PanelHeader>
                    <Group style={{ height: '1000px' }}>
                      <Placeholder icon={<Icon56NewsfeedOutline width={56} height={56} />} />
                    </Group>
                  </Panel>
                </View>
              </Epic>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;